const tableName = "inventory_transactions";

exports.up = function (db, callback) {
  db.createTable(
    tableName,
    {
      id: { type: "int", notNull: true, autoIncrement: true, primaryKey: true },
      code: { type: "string", length: 20, notNull: true, comment: "Mã phiếu nhập kho: NK{yy}-{6 số}" },
      date: { type: "datetime", notNull: true, comment: "Ngày giờ giao dịch" },
      type: {
        type: "string",
        length: 50,
        notNull: true,
        comment: "Loại giao dịch: import, export, ...",
      },
      type_detail: {
        type: "string",
        length: 100,
        notNull: true,
        comment: "Chi tiết loại giao dịch: nhap_dau_ki, ...",
      },
      warehouse_id: { type: "int", notNull: true, comment: "ID kho" },
      partner_id: { type: "int", notNull: true, comment: "ID đối tác" },
      source_document: {
        type: "string",
        length: 255,
        notNull: true,
        comment: "Chứng từ gốc",
      },
      branch_id: { type: "int", notNull: true, comment: "ID chi nhánh" },
      note: { type: "text", comment: "Ghi chú" },
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
