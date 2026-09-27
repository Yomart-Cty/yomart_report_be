import { Request, Response, NextFunction } from "express";
import { sendResponse } from "@core/utils";
import messages from "@core/config/constants";
import productService from "./product.service";
import { TopSellingQuery } from "./product.interface";

class ProductController {
  public getTopSellingProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { branch_id, from_date, to_date, limit } = req.query;

      const parsedBranchId = branch_id ? Number(branch_id) : undefined;
      const parsedLimit = limit ? Number(limit) : undefined;

      if (parsedBranchId !== undefined && isNaN(parsedBranchId)) {
        sendResponse(res, 400, messages.INVALID_PARAMS);
        return;
      }

      if (parsedLimit !== undefined && (isNaN(parsedLimit) || parsedLimit < 1)) {
        sendResponse(res, 400, messages.INVALID_PARAMS);
        return;
      }

      const query: TopSellingQuery = {
        seller_id: req.seller_id,
        branch_id: parsedBranchId,
        from_date: from_date as string | undefined,
        to_date: to_date as string | undefined,
        limit: parsedLimit,
      };

      const data = await productService.getTopSellingProducts(query, req.token);

      sendResponse(res, 200, messages.FIND_ALL_SUCCESS, { data });
    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController();
