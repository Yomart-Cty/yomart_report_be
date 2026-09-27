import path from "path";
import { createAxiosInstance } from "./axios.config";
import messages from "@core/config/constants";

const env = process.env.NODE_ENV || "development";
require("dotenv").config({ path: path.resolve(`.env_${env}`) });

const apiVersion = process.env.API_VERSION;
const authApiUrl = process.env.AUTH_API_URL;
const sellerApiUrl = process.env.SELLER_API_URL;
const productApiUrl = process.env.PRODUCT_API_URL;

if (!authApiUrl || !apiVersion) throw new Error(messages.CHECK_URL);
if (!sellerApiUrl || !apiVersion) throw new Error(messages.CHECK_URL);
if (!productApiUrl || !apiVersion) throw new Error(messages.CHECK_URL);

const authAPI = (token?: string) =>
  createAxiosInstance({
    baseURL: authApiUrl + apiVersion,
    token,
  });

const sellerAPI = (token?: string) =>
  createAxiosInstance({
    baseURL: sellerApiUrl + apiVersion,
    token,
  });

const productAPI = (token?: string) =>
  createAxiosInstance({
    baseURL: productApiUrl + apiVersion,
    token,
  });

const apiMessages = {
  ...messages,
  UNABLE_TO_CONNECT_SERVER: "Không thể kết nối đến máy chủ",
  UNKNOWN_ERROR: "Lỗi không xác định",
  BAD_REQUEST: "Yêu cầu không hợp lệ",
  TOKEN_EXPIRED_OR_INVALID: "Token hết hạn hoặc không hợp lệ",
  NOT_FOUND: "Không tìm thấy",
  SERVER_ERROR: "Lỗi máy chủ",
  UNAUTHORIZED: "Không có quyền truy cập",
  FORBIDDEN: "Quyền truy cập bị từ chối",
  CONFLICT: "Xung đột",
};

export {
  authAPI,
  sellerAPI,
  productAPI,
  apiMessages,
};
