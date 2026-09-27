export interface TopSellingProductRow {
  product_id: number;
  total_quantity: number;
  total_revenue: number;
  total_orders: number;
}

export interface TopSellingProductResult extends TopSellingProductRow {
  product_name?: string;
  product_code?: string;
  thumbnail?: string;
  price?: string;
}

export interface TopSellingQuery {
  seller_id?: number;
  branch_id?: number;
  from_date?: string;
  to_date?: string;
  limit?: number;
}
