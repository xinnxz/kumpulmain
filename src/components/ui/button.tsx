import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            default: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40",
            secondary: "bg-slate-800 text-white hover:bg-slate-700",
            outline: "border-2 border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200",
            ghost: "hover:bg-slate-800 text-slate-200",
            destructive: "bg-red-600 text-white hover:bg-red-700",
        };

        const sizes = {
            default: "h-11 px-6 py-2 text-sm",
            sm: "h-9 px-4 text-sm",
            lg: "h-14 px-8 text-base",
            icon: "h-10 w-10",
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
