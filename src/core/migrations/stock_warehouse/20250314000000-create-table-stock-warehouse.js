const tableName = "stock_warehouse";

exports.up = function (db, callback) {
  db.createTable(
    tableName,
    {
      id: { type: "int", notNull: true, autoIncrement: true, primaryKey: true },
      name: {
        type: "string",
        length: 255,
        notNull: true,
        comment: "Tên kho",
      },
      code: {
        type: "string",
        length: 50,
        notNull: true,
        comment: "Mã kho",
      },
      address: { type: "text", comment: "Địa chỉ kho" },
      publish: {
        type: "int",
        notNull: true,
        defaultValue: 1,
        comment: "0: ẩn, 1: hiển thị",
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
