import axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:6969";

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Lấy token từ localStorage (chỉ khi chạy trên client)
const getToken = () => {
    if (typeof window === "undefined") return null; // tránh lỗi SSR

    let token = localStorage.getItem("access_token");

    if (!token) {
        try {
            const state = JSON.parse(localStorage.getItem("persist:root") || "{}");
            if (state.auth) {
                const authState = JSON.parse(state.auth);
                token = authState.token;
            }
        } catch (error) {
            console.warn("Error parsing Redux state:", error);
        }
    }

    return token;
};

// Request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        //   const token = getToken();
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbUBnbWFpbC5jb20iLCJzdWIiOiI2OGFiM2QzZTRiODZmNjVmN2YyNjM1NTYiLCJpYXQiOjE3NjE2NDU3MTcsImV4cCI6MTc2MTczMjExN30.uw2ejcl0jW7892PctWKPk6ZgZTpMvLPyztuu8B09VhM"
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
    (response) => response.data.data,
    (error) => Promise.reject(error)
);

export default axiosClient;
