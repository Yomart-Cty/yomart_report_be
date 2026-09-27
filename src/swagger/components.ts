/**
 * Các component dùng chung cho Swagger (security, parameters, common schemas)
 */
export const swaggerComponents = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Nhập token JWT (Bearer token)",
    },
  },
  parameters: {
    idParam: {
      name: "id",
      in: "path",
      required: true,
      schema: { type: "integer" },
      description: "ID",
    },
    pageParam: {
      name: "page",
      in: "query",
      schema: { type: "integer", default: 1 },
      description: "Trang",
    },
    limitParam: {
      name: "limit",
      in: "query",
      schema: { type: "integer", default: 10 },
      description: "Số lượng mỗi trang",
    },
  },
  schemas: {
    UpdatePublish: {
      type: "object",
      required: ["publish"],
      properties: {
        publish: {
          type: "integer",
          enum: [0, 1],
          description: "Trạng thái (0: Ẩn, 1: Hiển thị)",
        },
      },
    },
  },
};
