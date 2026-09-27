export interface IPagination {
  page: number;
  limit: number;
  filters?: any;
}

import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            pagination? : IPagination,
            email?: string,
            id?: number,
            role_id?: number,
            role_ids?: number[],
            seller_id?: number,
            token?: string,
            file?: any,
        }
    }
}