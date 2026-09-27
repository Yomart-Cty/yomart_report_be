const tableName = "stock_warehouse";

exports.up = function (db, callback) {
  const sql = `
    ALTER TABLE ${tableName}
    CHANGE COLUMN publish is_active INT NOT NULL DEFAULT 1 COMMENT '0: ẩn, 1: hiển thị';
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error(`Rename publish to is_active in ${tableName}:`, err);
      return callback(err);
    }
    callback();
  });
};

exports.down = function (db, callback) {
  const sql = `
    ALTER TABLE ${tableName}
    CHANGE COLUMN is_active publish INT NOT NULL DEFAULT 1 COMMENT '0: ẩn, 1: hiển thị';
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error(`Revert is_active to publish in ${tableName}:`, err);
      return callback(err);
    }
    callback();
  });
};
