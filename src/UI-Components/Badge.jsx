export function Badge({
  children,
  variant = "default",
  className = "",
  onClick,
}) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
  };

  const classes = `${baseStyles} ${variants[variant]} ${
    onClick ? "cursor-pointer" : ""
  } ${className}`;

  return (
    <span className={classes} onClick={onClick}>
      {children}
    </span>
  );
}
