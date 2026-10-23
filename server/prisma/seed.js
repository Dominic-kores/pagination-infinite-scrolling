
import "dotenv/config";
import prisma from "../src/lib/prisma.js";

// Each product has a name, price in KES,
// category, and description.
const catalogue = {
  Beverages: [
    ["Ketepa Tea", 300],
    ["Kericho Gold Tea", 450],
    ["Dormans Coffee", 750],
    ["Nescafe Coffee", 950],
    ["Milo Chocolate Drink", 520],
    ["Del Monte Juice", 280],
    ["Minute Maid Juice", 180],
    ["Dasani Water", 80],
    ["Coca-Cola Soda", 120],
    ["Fanta Orange", 120],
  ],

  Grains: [
    ["Unga Maize Flour", 180],
    ["Jogoo Maize Flour", 170],
    ["Pishori Rice", 350],
    ["Basmati Rice", 420],
    ["Ndengu Green Grams", 250],
    ["Yellow Beans", 240],
    ["Red Kidney Beans", 280],
    ["Wheat Flour", 200],
    ["Millet Flour", 260],
    ["Sorghum Flour", 220],
  ],

  Dairy: [
    ["Brookside Milk", 75],
    ["KCC Fresh Milk", 70],
    ["Tuzo Milk", 80],
    ["Ilara Yoghurt", 150],
    ["Bio Yoghurt", 180],
    ["Brookside Butter", 550],
    ["KCC Cheese", 650],
    ["Mala Fermented Milk", 130],
    ["Vanilla Ice Cream", 350],
    ["Dairy Fresh Cream", 280],
  ],

  Electronics: [
    ["Samsung Smartphone", 22000],
    ["Tecno Smartphone", 15500],
    ["Infinix Smartphone", 18000],
    ["Wireless Earbuds", 2500],
    ["Bluetooth Speaker", 3200],
    ["USB Flash Drive", 950],
    ["Power Bank", 2800],
    ["Laptop Mouse", 1200],
    ["Wireless Keyboard", 3500],
    ["Phone Charger", 850],
  ],

  Clothing: [
    ["Maasai Shuka", 1800],
    ["Cotton T-Shirt", 950],
    ["Men's Jeans", 2400],
    ["Women's Dress", 3200],
    ["Leather Belt", 1500],
    ["Running Shoes", 4500],
    ["Hooded Sweatshirt", 2800],
    ["Baseball Cap", 850],
    ["Formal Shirt", 2200],
    ["Cotton Jacket", 3900],
  ],
};

// Convert grouped products into Prisma records.
const products = Object.entries(catalogue).flatMap(
  ([category, items]) =>
    items.map(([name, price]) => ({
      name,
      price,
      category,
      description: `${name} available in Kenya.`,
    }))
);

async function main() {
  // Reset only the Product table for repeatable seeding.
  await prisma.product.deleteMany();

  // Insert all 50 records into PostgreSQL.
  const result = await prisma.product.createMany({
    data: products,
  });

  console.log(`Seeded ${result.count} products.`);
}

main()
  .catch((error) => {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
