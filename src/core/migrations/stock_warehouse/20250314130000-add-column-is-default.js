const tableName = "stock_warehouse";

exports.up = function (db, callback) {
  const sql = `
    ALTER TABLE ${tableName}
    ADD COLUMN is_default TINYINT NOT NULL DEFAULT 0 COMMENT '0: không mặc định, 1: kho mặc định (mỗi branch có 1 kho mặc định)' AFTER is_active;
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error(`Add is_default to ${tableName}:`, err);
      return callback(err);
    }
    callback();
  });
};

exports.down = function (db, callback) {
  const sql = `
    ALTER TABLE ${tableName}
    DROP COLUMN is_default;
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error(`Remove is_default from ${tableName}:`, err);
      return callback(err);
    }
    callback();
  });
};
