require('module-alias/register');
require('dotenv').config();
import App from "./app"
import 'reflect-metadata';
import ProductRoute from "@modules/product/product.route";

const routes = [
  new ProductRoute(),
];

const app = new App(routes);

app.listen();