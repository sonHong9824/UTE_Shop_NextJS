"use client";
import {
  LayoutDashboard, Users, ShoppingCart, Package, Star, Gift, Bell, Settings,
  User, LogOut, ChevronRight, Menu, Search, X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { useStatsContext } from "@/contexts/StatsContext";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { stats, loading, error } = useStatsContext();

  const menuItems = [
    {
      name: "Tổng quan",
      icon: LayoutDashboard,
      path: "/",
      badge: { count: 3, color: "bg-blue-500" }
    },
    {
      name: "Người dùng",
      icon: Users,
      path: "/user"
    },
    {
      name: "Đơn hàng",
      icon: ShoppingCart,
      path: "/order",
      badge: { count: stats.pendingOrders, color: "bg-amber-500" }
    },
    {
      name: "Sản phẩm",
      icon: Package,
      path: "/product"
    },
    {
      name: "Đánh giá",
      icon: Star,
      path: "/comment",
      badge: { count: stats.pendingComments, color: "bg-rose-500" }
    },
    {
      name: "Khuyến mãi",
      icon: Gift,
      path: "/voucher",
      badge: { count: stats.activeVouchers, color: "bg-green-500" }
    },
    {
      name: "Thông báo",
      icon: Bell,
      path: "/notify",
      badge: { count: stats.notifications, color: "bg-purple-500" }
    },
    {
      name: "Cài đặt",
      icon: Settings,
      path: "/setting"
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen z-50 flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out shadow-xl",
          collapsed ? "w-20" : "w-72",
          // Mobile responsive
          "max-lg:absolute max-lg:transform max-lg:transition-transform",
          isMobileOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              {!collapsed && (
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    UTE Shop
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin Portal</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            >
              <ChevronRight
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  collapsed ? "rotate-180" : ""
                )}
              />
            </button>
          </div>
        </div>

        {/* Quick Stats - Only show when not collapsed */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Doanh thu</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">$12.5K</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-100 dark:border-green-800">
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">Voucher</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-300">
                  {loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    `${stats.activeVouchers}/${stats.totalVouchers}`
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-500/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                )}

                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg relative z-10 transition-all",
                    isActive
                      ? "bg-white/20 text-white scale-110"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 group-hover:scale-105"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </div>

                {!collapsed && (
                  <>
                    <div className="flex-1 relative z-10">
                      <span className={cn(
                        "font-medium text-sm",
                        isActive && "font-semibold"
                      )}>
                        {item.name}
                      </span>
                    </div>

                    {item.badge && item.badge.count > 0 && (
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full flex items-center justify-center text-xs font-bold text-white relative z-10 shadow-lg transition-all duration-300",
                          isActive ? "bg-white/20" : item.badge.color,
                          loading && item.name === "Khuyến mãi" && "animate-pulse"
                        )}
                      >
                        {item.badge.count}
                      </span>
                    )}
                  </>
                )}

                {collapsed && item.badge && item.badge.count > 0 && (
                  <span
                    className={cn(
                      "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg transition-all duration-300",
                      item.badge.color,
                      loading && item.name === "Khuyến mãi" && "animate-pulse"
                    )}
                  >
                    {item.badge.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          {!collapsed ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-850 border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  admin@uteshop.com
                </p>
              </div>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <LogOut className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button className="w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="w-full p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-500 dark:text-red-400" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
