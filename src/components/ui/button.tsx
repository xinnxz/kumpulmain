import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "accent" | "secondary" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-[#344D7A] text-white hover:bg-[#283C5F] focus-visible:ring-[#344D7A] shadow-lg shadow-[#344D7A]/20 hover:shadow-xl hover:shadow-[#344D7A]/30",
            accent: "bg-[#F5B800] text-[#1A2744] hover:bg-[#D9A300] focus-visible:ring-[#F5B800] shadow-lg shadow-[#F5B800]/30 hover:shadow-xl hover:shadow-[#F5B800]/40 font-bold",
            secondary: "bg-[#F7F8FA] text-[#344D7A] hover:bg-[#E4E8ED] border border-[#E4E8ED]",
            outline: "border-2 border-[#344D7A] bg-transparent hover:bg-[#344D7A] hover:text-white text-[#344D7A]",
            ghost: "hover:bg-[#F7F8FA] text-[#5A6A7E]",
        };

        const sizes = {
            default: "h-12 px-6 py-2 text-sm",
            sm: "h-10 px-4 text-sm",
            lg: "h-14 px-8 text-base",
            icon: "h-11 w-11",
        };

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
