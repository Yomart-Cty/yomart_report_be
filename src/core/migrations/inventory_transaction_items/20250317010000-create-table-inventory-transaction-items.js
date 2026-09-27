const tableName = "inventory_transaction_items";

exports.up = function (db, callback) {
  db.createTable(
    tableName,
    {
      id: { type: "int", notNull: true, autoIncrement: true, primaryKey: true },
      transaction_id: { type: "int", notNull: true, comment: "ID phiếu nhập kho" },
      product_id: { type: "int", notNull: true, comment: "ID sản phẩm" },
      product_name: { type: "string", length: 255, notNull: true, comment: "Tên sản phẩm" },
      quantity: { type: "decimal", precision: 15, scale: 4, notNull: true, comment: "Số lượng" },
      price: { type: "decimal", precision: 15, scale: 4, notNull: true, comment: "Đơn giá" },
      unit: { type: "string", length: 100, notNull: true, comment: "Đơn vị tính" },
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
