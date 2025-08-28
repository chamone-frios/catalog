export enum ProductMetric {
  UNIT = 0,
  KG = 1,
  G = 2,
  L = 3,
}

export enum ProductLabel {
  DAIRY = 0,
  MEATS = 1,
  HAMBURGERS = 2,
  PROCESSED = 3,
}

export type Product = {
  id: string;
  name: string;
  img: string;
  description: string;
  maker: string;
  metric: ProductMetric;
  label: ProductLabel;
  stock: number;
  price: number;
};

export type GetProductsResponse = {
  products: Product[];
};

export type GetProductResponse = {
  product: Product;
};
