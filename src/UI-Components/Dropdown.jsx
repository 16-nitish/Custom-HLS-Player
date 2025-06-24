import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export function DropdownMenu({ children }) {
  return (
    <Menu as="div" className="relative">
      {children}
    </Menu>
  );
}

export function DropdownMenuTrigger({ children }) {
  return <MenuButton>{children}</MenuButton>;
}

export function DropdownMenuContent({ children, className = "" }) {
  return (
    <MenuItems
      className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 focus:outline-none ${className}`}
    >
      {children}
    </MenuItems>
  );
}

export function DropdownMenuItem({ children, onClick, className = "" }) {
  return (
    <MenuItem>
      {({ focus }) => (
        <button
          className={`w-full text-left px-4 py-2 text-sm text-gray-700 ${
            focus ? "bg-gray-100" : ""
          } ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </MenuItem>
  );
}
