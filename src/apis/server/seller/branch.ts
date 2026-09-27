import { AxiosError } from "axios";
import { sellerAPI } from "@apis/axios.constant";
import Logger from "@core/utils/logger";

export interface CheckBranchExistsParams {
  seller_id?: number;
}

/**
 * Gọi Seller API để kiểm tra branch_id có tồn tại không.
 * Endpoint: GET /branch/check-exists/:id?seller_id=...
 */
export const checkBranchExists = async (
  branchId: number,
  token?: string,
  params?: CheckBranchExistsParams
): Promise<boolean> => {
  try {
    const response = await sellerAPI(token).get<{ data?: { id: number } }>(
      `/branch/check-exists/${branchId}`,
      { params }
    );
    return !!(response.data?.data?.id);
  } catch (error) {
    const err = error as AxiosError;
    const status = err?.response?.status;
    if (status === 404) return false;
    Logger.error("checkBranchExists failed", err?.response?.data);
    return false;
  }
};
export const checkBranchExistsBySeller = async (
  sellerId: number,
  branchId: number,
  token?: string,
  params?: CheckBranchExistsParams
): Promise<boolean> => {
  try {
    const response = await sellerAPI(token).get<{ statusCode: number; exists: boolean; data?: { id: number } }>(
      `/branch/check-exists-by-seller/${branchId}/${sellerId}`,
      { params }
    );
    return !!(response.data?.exists && response.data?.data?.id);
  } catch (error) {
    const err = error as AxiosError;
    const status = err?.response?.status;
    if (status === 404) return false;
    Logger.error("checkBranchExistsBySeller failed", err?.response?.data);
    return false;
  }
};
