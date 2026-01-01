import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, type, id, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label htmlFor={id} className="text-sm font-medium text-slate-300">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={id}
                    className={cn(
                        "flex h-12 w-full rounded-xl border bg-slate-900/50 px-4 py-2 text-sm text-white placeholder:text-slate-500",
                        "border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                        "transition-all duration-200 outline-none",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-sm text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
