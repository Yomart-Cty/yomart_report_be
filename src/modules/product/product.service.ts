import database from "@core/config/database";
import { databaseName } from "@core/utils/database_name";
import { getProductsByIds } from "@apis/server/product/products";
import {
  TopSellingProductRow,
  TopSellingProductResult,
  TopSellingQuery,
} from "./product.interface";

const COMPLETED_STATUS = 5;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export class ProductService {
  async getTopSellingProducts(
    query: TopSellingQuery,
    token?: string
  ): Promise<TopSellingProductResult[]> {
    const limit = Math.min(query.limit ?? DEFAULT_LIMIT, MAX_LIMIT);

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (query.seller_id != null) {
      conditions.push("o.seller_id = ?");
      params.push(query.seller_id);
    }

    if (query.branch_id != null) {
      conditions.push("o.branch_id = ?");
      params.push(query.branch_id);
    }

    if (query.from_date) {
      conditions.push("o.created_at >= ?");
      params.push(query.from_date);
    }

    if (query.to_date) {
      conditions.push("o.created_at <= ?");
      params.push(`${query.to_date} 23:59:59`);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    params.push(limit);

    const sql = `
      SELECT
        od.product_id,
        SUM(od.quantity)             AS total_quantity,
        SUM(od.quantity * od.price)  AS total_revenue,
        COUNT(DISTINCT o.id)         AS total_orders
      FROM ${databaseName.order_detail} od
      INNER JOIN ${databaseName.order} o ON od.order_id = o.id
      INNER JOIN (
        SELECT osh.order_id
        FROM ${databaseName.order_status_history} osh
        INNER JOIN (
          SELECT order_id, MAX(id) AS max_id
          FROM ${databaseName.order_status_history}
          GROUP BY order_id
        ) latest ON latest.max_id = osh.id
        WHERE osh.status = ${COMPLETED_STATUS}
      ) completed ON completed.order_id = o.id
      ${whereClause}
      GROUP BY od.product_id
      ORDER BY total_quantity DESC
      LIMIT ?
    `;

    const rows = await database.executeQuery<TopSellingProductRow[]>(sql, params);

    if (!rows || rows.length === 0) return [];

    const productIds = rows.map((r) => r.product_id);
    const productMap = await getProductsByIds(productIds, token);

    return rows.map((row) => {
      const detail = productMap[row.product_id];
      return {
        ...row,
        total_quantity: Number(row.total_quantity),
        total_revenue: Number(row.total_revenue),
        total_orders: Number(row.total_orders),
        product_name: detail?.name,
        product_code: detail?.code,
        thumbnail: detail?.thumbnail,
        price: detail?.price,
      };
    });
  }
}

export default new ProductService();
