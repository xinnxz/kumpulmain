"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface AdminThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("adminTheme") as Theme;
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("adminTheme", newTheme);
    };

    return (
        <AdminThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
            {children}
        </AdminThemeContext.Provider>
    );
}

export function useAdminTheme() {
    const context = useContext(AdminThemeContext);
    if (!context) {
        throw new Error("useAdminTheme must be used within AdminThemeProvider");
    }
    return context;
}

// Theme styles - Updated to Navy (#344D7A) and Yellow (#F5B800) brand colors
export const adminThemeStyles = {
    dark: {
        pageBg: "bg-gradient-to-br from-[#0F1419] via-[#1A2744] to-[#1F2D47]",
        cardBg: "bg-white/5 backdrop-blur-xl border-white/10",
        cardHover: "hover:bg-white/10",
        headerBg: "bg-white/5 backdrop-blur-xl border-white/10",
        textPrimary: "text-white",
        textSecondary: "text-white/70",
        textMuted: "text-white/50",
        textDimmed: "text-white/30",
        inputBg: "bg-white/5 border-white/10 text-white placeholder-white/30",
        inputFocus: "focus:border-[#F5B800]/50 focus:bg-white/10",
        buttonActive: "bg-gradient-to-r from-[#344D7A] to-[#1A2744] text-white shadow-lg shadow-[#344D7A]/30",
        buttonInactive: "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white",
        tableHeader: "bg-white/5 border-white/10",
        tableRow: "border-white/5 hover:bg-white/5",
        success: "bg-emerald-500/20 text-emerald-400",
        warning: "bg-[#F5B800]/20 text-[#F5B800]",
        error: "bg-red-500/20 text-red-400",
        info: "bg-[#344D7A]/30 text-[#7B93C4]",
        accent: "text-[#F5B800]",
        accentBg: "bg-[#F5B800]",
        primary: "text-[#7B93C4]",
        primaryBg: "bg-[#344D7A]",
    },
    light: {
        pageBg: "bg-gradient-to-br from-[#F7F8FA] via-white to-[#F0F4FF]",
        cardBg: "bg-white/80 backdrop-blur-xl border-[#E4E8ED] shadow-lg shadow-[#344D7A]/5",
        cardHover: "hover:bg-white hover:shadow-xl",
        headerBg: "bg-white/80 backdrop-blur-xl border-[#E4E8ED] shadow-sm",
        textPrimary: "text-[#1A2744]",
        textSecondary: "text-[#344D7A]",
        textMuted: "text-[#5A6A7E]",
        textDimmed: "text-[#8A95A5]",
        inputBg: "bg-white border-[#E4E8ED] text-[#1A2744] placeholder-[#8A95A5]",
        inputFocus: "focus:border-[#344D7A] focus:ring-2 focus:ring-[#344D7A]/20",
        buttonActive: "bg-gradient-to-r from-[#344D7A] to-[#1A2744] text-white shadow-lg shadow-[#344D7A]/30",
        buttonInactive: "bg-white text-[#5A6A7E] border border-[#E4E8ED] hover:bg-[#F7F8FA] hover:text-[#344D7A]",
        tableHeader: "bg-[#F7F8FA] border-[#E4E8ED]",
        tableRow: "border-[#E4E8ED] hover:bg-[#F7F8FA]",
        success: "bg-emerald-100 text-emerald-700",
        warning: "bg-[#F5B800]/10 text-[#B8860B]",
        error: "bg-red-100 text-red-700",
        info: "bg-[#344D7A]/10 text-[#344D7A]",
        accent: "text-[#F5B800]",
        accentBg: "bg-[#F5B800]",
        primary: "text-[#344D7A]",
        primaryBg: "bg-[#344D7A]",
    }
};
