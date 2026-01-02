import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authApi = {
    login: (data: { email: string; password: string }) =>
        api.post("/auth/login", data),
    register: (data: { email: string; password: string; name: string; phone?: string }) =>
        api.post("/auth/register", data),
    getProfile: () => api.get("/auth/profile"),
};

// Venues API
export const venuesApi = {
    getAll: (params?: Record<string, string>) =>
        api.get("/venues", { params }),
    getById: (id: string) => api.get(`/venues/${id}`),
    getAvailability: (id: string, date: string) =>
        api.get(`/venues/${id}/availability`, { params: { date } }),
    getCities: () => api.get("/venues/filters/cities"),
    getTypes: () => api.get("/venues/filters/types"),
};

// Bookings API
export const bookingsApi = {
    create: (data: any) => api.post("/bookings", data),
    getMyBookings: () => api.get("/bookings/my"),
    getById: (id: string) => api.get(`/bookings/${id}`),
    cancel: (id: string) => api.post(`/bookings/${id}/cancel`),
};

// Invitations API
export const invitationsApi = {
    getPublic: (params?: Record<string, string>) =>
        api.get("/invitations/public", { params }),
    getByCode: (code: string) => api.get(`/invitations/${code}`),
    join: (code: string) => api.post(`/invitations/${code}/join`),
};

// Notifications API
export const notificationsApi = {
    getAll: () => api.get("/notifications"),
    getUnreadCount: () => api.get("/notifications/unread-count"),
    markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
    markAllAsRead: () => api.patch("/notifications/read-all"),
};

// Pengelola API - Venue Management
export const pengelolaApi = {
    // Dashboard
    getDashboard: () => api.get("/pengelola/dashboard"),

    // Venues
    getVenues: () => api.get("/pengelola/venues"),
    getVenue: (id: string) => api.get(`/pengelola/venues/${id}`),
    createVenue: (data: any) => api.post("/pengelola/venues", data),
    updateVenue: (id: string, data: any) => api.put(`/pengelola/venues/${id}`, data),
    deleteVenue: (id: string) => api.delete(`/pengelola/venues/${id}`),

    // Bookings
    getBookings: (params?: Record<string, string>) =>
        api.get("/pengelola/bookings", { params }),
    updateBookingStatus: (id: string, status: string) =>
        api.patch(`/pengelola/bookings/${id}/status`, { status }),
};

