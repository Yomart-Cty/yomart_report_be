const tableName = "stock_warehouse";

exports.up = function (db, callback) {
  const sql = `
    ALTER TABLE ${tableName}
    ADD COLUMN phone VARCHAR(50) NOT NULL COMMENT 'Số điện thoại' AFTER type_warehouse,
    ADD COLUMN email VARCHAR(255) NULL COMMENT 'Email' AFTER phone;
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error(`Add phone, email to ${tableName}:`, err);
      return callback(err);
    }
    callback();
  });
};

exports.down = function (db, callback) {
  const sql = `
    ALTER TABLE ${tableName}
    DROP COLUMN phone,
    DROP COLUMN email;
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error(`Remove phone, email from ${tableName}:`, err);
      return callback(err);
    }
    callback();
  });
};
