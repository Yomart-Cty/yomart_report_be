import { AxiosError } from "axios";
import { sellerAPI } from "@apis/axios.constant";
import Logger from "@core/utils/logger";

export interface BranchListItem {
  id: number;
  branch_name?: string;
  seller_name?: string;
}

/**
 * Gọi Seller API lấy danh sách chi nhánh theo list IDs.
 * Endpoint: POST /branch/get-list-by-ids
 * Body: { listId: number[] }
 */
export const getListBranchesByIds = async (
  ids: number[],
  token?: string
): Promise<Record<number, string>> => {
  if (!token || ids.length === 0) return {};
  // console.log("ids", ids);
  try {
    const response = await sellerAPI(token).post<{ data?: BranchListItem[] }>(
      "/branch/get-list-by-ids",
      { ids: ids }
    );
    const branches = response.data?.data ?? [];
    const map: Record<number, string> = {};

    for (const b of Array.isArray(branches) ? branches : []) {
      if (b?.id != null && b.branch_name != null) {
        map[b.id] = String(b.branch_name);
      }
    }
    return map;
  } catch (error) {
    const err = error as AxiosError;
    Logger.error("getListBranchesByIds failed", err?.response?.data);
    return {};
  }
};

