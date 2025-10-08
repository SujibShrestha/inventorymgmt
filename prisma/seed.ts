import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const demoUserId = "c8303fe8-2c7f-4624-a6f5-784e82f83852";

  //sample
  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });
  console.log("Seed data is created successfully");
  console.log(`Created 25 products for user ID:${demoUserId}`)
}

main()
.catch((e)=>{
    console.error(e);
    process.exit()
    
}).finally(async()=>{
    await prisma.$disconnect()
})
