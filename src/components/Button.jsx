"use client";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
  secondary:
    "bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 shadow-sm",
  danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm",
  ghost: "bg-transparent hover:bg-blue-50 text-blue-600",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg
        font-medium
        transition-all
        duration-200
        flex
        items-center
        justify-center
        gap-2
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        hover:transform
        hover:scale-[1.02]
        active:scale-[0.98]
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
