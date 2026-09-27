const tableName = "stock_quant";

exports.up = function (db, callback) {
  db.createTable(
    tableName,
    {
      id: { type: "int", notNull: true, autoIncrement: true, primaryKey: true },
      product_id: {
        type: "int",
        notNull: true,
        comment: "ID sản phẩm",
      },
      warehouse_id: {
        type: "int",
        notNull: true,
        comment: "ID kho",
      },
      branch_id: {
        type: "int",
        notNull: true,
        comment: "ID chi nhánh",
      },
      quantity: {
        type: "decimal",
        precision: 15,
        scale: 4,
        notNull: true,
        defaultValue: 0,
        comment: "Số lượng tồn kho",
      },
      cost_price: {
        type: "decimal",
        precision: 15,
        scale: 4,
        notNull: true,
        comment: "Giá vốn",
      },
      create_id: { type: "int", comment: "ID người tạo" },
      created_at: { type: "timestamp", defaultValue: "CURRENT_TIMESTAMP" },
      updated_at: { type: "timestamp", defaultValue: "CURRENT_TIMESTAMP" },
    },
    function (err) {
      if (err) {
        console.error(`Create ${tableName} table:`, err);
        return callback(err);
      }
      callback();
    }
  );
};

exports.down = function (db, callback) {
  db.dropTable(tableName, callback);
};
