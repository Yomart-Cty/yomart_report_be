const tableName = "inventory_transactions";

exports.up = function (db, callback) {
  db.addColumn(
    tableName,
    "status",
    {
      type: "string",
      length: 20,
      notNull: true,
      defaultValue: "pending",
      comment: "Trạng thái: pending, approved, rejected, cancelled",
      after: "source_document",
    },
    function (err) {
      if (err) {
        console.error(`Add column status to ${tableName}:`, err);
        return callback(err);
      }
      callback();
    }
  );
};

exports.down = function (db, callback) {
  db.removeColumn(tableName, "status", callback);
};
