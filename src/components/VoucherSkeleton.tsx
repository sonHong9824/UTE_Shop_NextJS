export const VoucherCardSkeleton = () => (
    <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-xl animate-pulse">
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 rounded-lg"></div>
                    <div className="w-20 h-6 bg-white/20 rounded-full"></div>
                </div>
                <div className="w-6 h-6 bg-white/20 rounded"></div>
            </div>

            {/* Code */}
            <div className="space-y-2">
                <div className="w-32 h-8 bg-white/30 rounded"></div>
                <div className="w-24 h-4 bg-white/20 rounded"></div>
            </div>

            {/* Value Box */}
            <div className="bg-white/20 rounded-lg p-3 space-y-2">
                <div className="flex justify-between">
                    <div className="w-16 h-4 bg-white/20 rounded"></div>
                    <div className="w-12 h-4 bg-white/30 rounded"></div>
                </div>
                <div className="flex justify-between">
                    <div className="w-20 h-4 bg-white/20 rounded"></div>
                    <div className="w-16 h-4 bg-white/30 rounded"></div>
                </div>
            </div>

            {/* Usage Bar */}
            <div className="space-y-2">
                <div className="flex justify-between">
                    <div className="w-16 h-4 bg-white/20 rounded"></div>
                    <div className="w-12 h-4 bg-white/20 rounded"></div>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full">
                    <div className="w-1/3 h-2 bg-white/30 rounded-full"></div>
                </div>
            </div>

            {/* Date */}
            <div className="flex justify-between">
                <div className="w-20 h-4 bg-white/20 rounded"></div>
                <div className="w-4 h-4 bg-white/20 rounded"></div>
                <div className="w-20 h-4 bg-white/20 rounded"></div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <div className="flex-1 h-10 bg-white/20 rounded-lg"></div>
                <div className="flex-1 h-10 bg-white/20 rounded-lg"></div>
                <div className="w-12 h-10 bg-white/20 rounded-lg"></div>
            </div>
        </div>
    </div>
);

export const VoucherListSkeleton = ({ count = 6 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
            <VoucherCardSkeleton key={index} />
        ))}
    </div>
);

export const StatCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm animate-pulse">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="space-y-2">
                <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
        </div>
    </div>
);

export const StatsListSkeleton = ({ count = 4 }: { count?: number }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, index) => (
            <StatCardSkeleton key={index} />
        ))}
    </div>
);