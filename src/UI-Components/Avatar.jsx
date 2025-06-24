export function Avatar({ children, className = "" }) {
  return (
    <div
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt = "", className = "" }) {
  return (
    <img
      className={`aspect-square h-full w-full object-cover ${className}`}
      src={src || "/placeholder.svg"}
      alt={alt}
    />
  );
}

export function AvatarFallback({ children, className = "" }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 text-sm font-medium ${className}`}
    >
      {children}
    </div>
  );
}
