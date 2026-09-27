import { Router } from "express";
import { IRoute } from "@core/interfaces";
import AuthMiddleware from "@core/middleware/auth.middleware";
import productController from "./product.controller";

class ProductRoute implements IRoute {
  public path = "/products";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      this.path + "/top-selling",
      AuthMiddleware.authorization(),
      productController.getTopSellingProducts
    );
  }
}

export default ProductRoute;
