import { PrismaClient } from "@prisma/client";
import { uniqueSlug } from "../src/lib/slug";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding categories...");

  const categoryNames = ["Toyota", "Honda", "Nissan", "Hyundai", "Kia", "Mercedes", "BMW", "Ford"];

  const categories: Record<string, string> = {};
  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories[name] = category.id;
  }

  console.log("Seeding products...");

  const products = [
    {
      name: "Toyota Corolla Brake Pad",
      category: "Toyota",
      price: 45000, // pesewas -> GH₵450
      stock: 12,
      partNumber: "BP-8821",
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      year: "2017–2020",
      description: "Front brake pad set. Direct fit, no modification needed.",
    },
    {
      name: "Toyota Corolla Headlight (Right)",
      category: "Toyota",
      price: 85000,
      stock: 4,
      partNumber: "HL-3391R",
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      year: "2014–2016",
      description: "Original-fit right headlight assembly, tested and working.",
    },
    {
      name: "Toyota Corolla Air Filter",
      category: "Toyota",
      price: 6000,
      stock: 20,
      partNumber: "AF-1042",
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      year: "2010–2019",
      description: "",
    },
    {
      name: "Honda Civic Alternator",
      category: "Honda",
      price: 120000,
      stock: 0,
      partNumber: "ALT-5510",
      vehicleMake: "Honda",
      vehicleModel: "Civic",
      year: "2012–2015",
      description: "Rebuilt alternator, 6 month shop warranty.",
    },
    {
      name: "Honda CR-V Side Mirror (Left)",
      category: "Honda",
      price: 32000,
      stock: 6,
      partNumber: "MIR-2207L",
      vehicleMake: "Honda",
      vehicleModel: "CR-V",
      year: "2015–2018",
      description: "",
    },
    {
      name: "Nissan Altima Shock Absorber (Front Pair)",
      category: "Nissan",
      price: 95000,
      stock: 8,
      partNumber: "SHK-4471",
      vehicleMake: "Nissan",
      vehicleModel: "Altima",
      year: "2013–2018",
      description: "Sold as a pair for even suspension wear.",
    },
    {
      name: "Hyundai Elantra Radiator",
      category: "Hyundai",
      price: 70000,
      stock: 3,
      partNumber: "RAD-9012",
      vehicleMake: "Hyundai",
      vehicleModel: "Elantra",
      year: "2016–2020",
      description: "",
    },
    {
      name: "Kia Sportage Timing Belt Kit",
      category: "Kia",
      price: 55000,
      stock: 0,
      partNumber: "TBK-3345",
      vehicleMake: "Kia",
      vehicleModel: "Sportage",
      year: "2011–2016",
      description: "Complete kit: belt, tensioner, idler pulleys.",
    },
    {
      name: "Mercedes C-Class Brake Disc (Front Pair)",
      category: "Mercedes",
      price: 180000,
      stock: 5,
      partNumber: "BD-7723",
      vehicleMake: "Mercedes-Benz",
      vehicleModel: "C-Class",
      year: "2014–2019",
      description: "",
    },
    {
      name: "BMW 3 Series Fuel Pump",
      category: "BMW",
      price: 145000,
      stock: 2,
      partNumber: "FP-6650",
      vehicleMake: "BMW",
      vehicleModel: "3 Series",
      year: "2012–2018",
      description: "",
    },
    {
      name: "Ford Focus Clutch Kit",
      category: "Ford",
      price: 98000,
      stock: 7,
      partNumber: "CK-1198",
      vehicleMake: "Ford",
      vehicleModel: "Focus",
      year: "2011–2017",
      description: "Includes clutch plate, pressure plate, release bearing.",
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: uniqueSlug(p.name),
        categoryId: categories[p.category],
        price: p.price,
        stock: p.stock,
        partNumber: p.partNumber,
        vehicleMake: p.vehicleMake,
        vehicleModel: p.vehicleModel,
        year: p.year,
        description: p.description || null,
        image: null,
      },
    });
  }

  console.log(`Seeded ${categoryNames.length} categories and ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
