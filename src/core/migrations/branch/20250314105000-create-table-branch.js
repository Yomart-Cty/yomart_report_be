const tableName = "branch";

exports.up = function (db, callback) {
  db.createTable(
    tableName,
    {
      id: { type: "int", notNull: true, autoIncrement: true, primaryKey: true },
      name: { type: "string", length: 255, notNull: true, comment: "Tên chi nhánh" },
      code: { type: "string", length: 50, notNull: true, comment: "Mã chi nhánh" },
      seller_id: { type: "int", notNull: true, comment: "ID seller" },
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
