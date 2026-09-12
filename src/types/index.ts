export type ProductWithCategory = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category: { id: string; name: string };
  price: number;
  stock: number;
  image: string | null;
  partNumber: string | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  year: string | null;
  description: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CategoryOption = {
  id: string;
  name: string;
};
