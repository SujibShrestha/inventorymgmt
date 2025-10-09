import { prisma } from "@/lib/prisma";
import Sidebar from "../../components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { TrendingUpIcon } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const userId = user.id;

  const totalProducts = await prisma.product.count({ where: { userId } });
  const lowStock = await prisma.product.count({
    where: {
      userId,
      lowStockAt: { not: null },
      quantity: { lte: 5 },
    },
  });
  //recent product
  const recent = await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const allProduct = await prisma.product.findMany({
    where: { userId },
    select: { price: true, quantity: true, createdAt: true },
  });
  //total value of product
  const totalValue = Math.floor(
    allProduct.reduce(
      (sum, product) => sum + Number(product.price) * Number(product.quantity),
      0
    )
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/dashboard" />
      <main className="ml-64 p-8">
        {/* header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome Back! Here is an overview of your inventory.
              </p>
            </div>
          </div>
        </div>

        {/* key metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Key Metrics
            </h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 ">
                  {totalProducts}
                </div>
                <div className="text-sm text-gray-600">Total Product</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">
                    +{totalProducts}
                  </span>{" "}
                  <TrendingUpIcon className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>{" "}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 ">
                  {totalValue}
                </div>
                <div className="text-sm text-gray-600">Total value</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">+{totalValue}</span>{" "}
                  <TrendingUpIcon className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>{" "}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 ">
                  {lowStock}
                </div>
                <div className="text-sm text-gray-600">Low Stock</div>
                <div className="flex items-center justify-center mt-1">
                  <span className="text-xs text-green-600">+{lowStock}</span>{" "}
                  <TrendingUpIcon className="w-3 h-3 text-green-600 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* StockLevel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Stock Level
              </h2>
            </div>
            <div className="space-y-3 ">
              {recent.map((product, key) => {
                const stockLevel =
                  product.quantity === 0
                    ? 0
                    : product.quantity <= (product.lowStockAt || 5)
                    ? 1
                    : 2;

                const bgColors = [
                  "bg-red-600",
                  "bg-yellow-600",
                  "bg-green-600",
                ];
                const textColors = [
                  "text-red-600",
                  "text-yellow-600",
                  "text-green-600",
                ];

                return (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}/>
                      <span className="text-sm font-medium text-gray-900 ">{product.name}</span>
                    </div>
                    <div className={`text-sm font-medium ${textColors[stockLevel]}`}>{product.quantity} units</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
