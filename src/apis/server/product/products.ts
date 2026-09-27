import { AxiosError } from "axios";
import { productAPI } from "@apis/axios.constant";
import Logger from "@core/utils/logger";
import { ProductItem } from "./product.types";

/**
 * Gọi Product API lấy danh sách sản phẩm theo list IDs.
 * Endpoint: POST /products/by-ids
 * Body: { ids: number[] }
 */
export const getProductsByIds = async (
  ids: number[],
  token?: string
): Promise<Record<number, ProductItem>> => {
  if (!token || ids.length === 0) return {};

  try {
    const response = await productAPI(token).post<any>(
      "/products/by-ids",
      { ids }
    );
    const raw = response.data;

    // Trường hợp thực tế: response là object dạng:
    // { '0': ProductItem, '1': ProductItem, ..., statusCode, message }
    const values = raw && typeof raw === "object" ? Object.values(raw) as unknown[] : [];
    const products = values.filter(
      (v): v is ProductItem =>
        v != null &&
        typeof v === "object" &&
        "id" in (v as any) &&
        ("code" in (v as any) || "name" in (v as any))
    );

    const map: Record<number, ProductItem> = {};

    for (const p of Array.isArray(products) ? products : []) {
      if (p?.id != null) {
        map[p.id] = p;
      }
    }

    return map;
  } catch (error) {
    const err = error as AxiosError;
    Logger.error("getProductsByIds failed", err?.response?.data);
    return {};
  }
};

/**
 * Tìm kiếm product IDs theo mã hoặc tên sản phẩm.
 * Endpoint: GET /products?key=xxx&limit=200
 */
export const getProductIdsByKey = async (
  key: string,
  token?: string,
  seller_id?: number
): Promise<number[]> => {
  if (!token || !key.trim()) return [];

  try {
    const params: Record<string, unknown> = { key: key.trim(), limit: 200 };
    if (seller_id != null) params.seller_id = seller_id;

    const response = await productAPI(token).get<any>("/products", { params });
    const raw = response.data;

    const items: unknown[] =
      Array.isArray(raw?.data) ? raw.data :
      Array.isArray(raw) ? raw : [];

    return items
      .filter((v): v is ProductItem => v != null && typeof v === "object" && "id" in (v as any))
      .map((v) => (v as ProductItem).id);
  } catch (error) {
    const err = error as import("axios").AxiosError;
    Logger.error("getProductIdsByKey failed", err?.response?.data);
    return [];
  }
};

export type ProductCheckError = "not_found" | "wrong_seller";

/**
 * Kiểm tra batch: trả về Map<product_id, lý do lỗi>.
 * - "not_found"    : product_id không tồn tại
 * - "wrong_seller" : tồn tại nhưng không thuộc seller_id này
 * Chỉ cần 1 HTTP request cho toàn bộ danh sách.
 */
export const getInvalidProductIds = async (
  ids: number[],
  token?: string,
  sellerId?: number
): Promise<Map<number, ProductCheckError>> => {
  const result = new Map<number, ProductCheckError>();
  if (ids.length === 0) return result;

  const uniqueIds = [...new Set(ids)];
  const productMap = await getProductsByIds(uniqueIds, token);

  for (const id of uniqueIds) {
    const product = productMap[id];
    if (!product) {
      result.set(id, "not_found");
    } else if (sellerId != null && product.seller_id != null && product.seller_id !== sellerId) {
      result.set(id, "wrong_seller");
    }
  }

  return result;
};

