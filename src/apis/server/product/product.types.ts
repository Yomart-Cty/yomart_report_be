export interface ProductItem {
  id: number;
  code?: string;
  name?: string;
  seller_id?: number;
  max_inventory?: number;
  min_inventory?: number;
  price?: string;
  price_wholesale?: string;
  price_sale?: string;
  price_import?: string;
  thumbnail?: string;
  [key: string]: unknown;
}

