export const swaggerPaths = {
  "/products/top-selling": {
    get: {
      tags: ["Products"],
      summary: "Lấy danh sách sản phẩm bán chạy nhất",
      description:
        "Trả về danh sách sản phẩm có tổng số lượng xuất kho cao nhất trong khoảng thời gian chỉ định.",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "branch_id",
          in: "query",
          required: false,
          schema: { type: "integer" },
          description: "Lọc theo ID chi nhánh",
        },
        {
          name: "from_date",
          in: "query",
          required: false,
          schema: { type: "string", format: "date", example: "2025-01-01" },
          description: "Ngày bắt đầu (YYYY-MM-DD)",
        },
        {
          name: "to_date",
          in: "query",
          required: false,
          schema: { type: "string", format: "date", example: "2025-12-31" },
          description: "Ngày kết thúc (YYYY-MM-DD)",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: { type: "integer", default: 10, minimum: 1, maximum: 100 },
          description: "Số lượng sản phẩm trả về (mặc định 10, tối đa 100)",
        },
      ],
      responses: {
        200: {
          description: "Thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  statusCode: { type: "integer", example: 200 },
                  message: { type: "string", example: "Tìm thấy dữ liệu" },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/TopSellingProduct" },
                  },
                },
              },
            },
          },
        },
        401: { description: "Chưa xác thực" },
        500: { description: "Lỗi server" },
      },
    },
  },
};

export const swaggerSchemas = {
  TopSellingProduct: {
    type: "object",
    properties: {
      product_id: { type: "integer", example: 1 },
      product_name: { type: "string", example: "Cà phê sữa đá" },
      total_quantity: { type: "number", example: 250.5 },
      total_revenue: { type: "number", example: 1250000 },
      total_orders: { type: "integer", example: 30 },
      product_code: { type: "string", example: "SP001", nullable: true },
      product_name_api: { type: "string", example: "Cà phê sữa đá (API)", nullable: true },
      thumbnail: { type: "string", example: "https://...", nullable: true },
      price: { type: "string", example: "25000", nullable: true },
    },
  },
};
