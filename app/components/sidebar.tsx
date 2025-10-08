import { UserButton } from "@stackframe/stack";
import {
  BarChartBigIcon,
  Package,
  PackagePlus,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChartBigIcon },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: PackagePlus },
    { name: "Setting", href: "/setting", icon: SettingsIcon },
  ];

  return (
    <div className="fixed left-0 top-0 bg-gray-900 w-67 text-white min-h-screen p-6 z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChartBigIcon className="w-8 h-8" />
          <span className="text-lg font-semibold">Inventory Manager</span>{" "}
        </div>
      </div>
      <nav className="space-y-1">
        <div className="text-sm font-semibold text-gray-400 uppercase">
          Inventory
        </div>
        {navItems.map((item, key) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href
          return (
            <Link
              href={item.href}
              key={key}
              className={`flex items-center space-x-3 py-2 px-2 rounded-lg ${isActive?"bg-purple-100 text-gray-800":"hover:bg-gray-800 text-gray-400"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
            <UserButton showUserInfo/>
        </div>
      </div>
    </div>
  );
}
