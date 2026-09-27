const tableName = "stock_warehouse";

exports.up = function (db, callback) {
  const sql = `
    ALTER TABLE ${tableName}
    ADD COLUMN seller_id INT NOT NULL COMMENT 'ID seller' AFTER address,
    ADD COLUMN branch_id INT NOT NULL COMMENT 'ID chi nhánh' AFTER seller_id,
    ADD COLUMN city_id INT NOT NULL COMMENT 'ID thành phố' AFTER branch_id,
    ADD COLUMN ward_id INT NOT NULL COMMENT 'ID phường/xã' AFTER city_id,
    ADD COLUMN type_warehouse VARCHAR(50) NOT NULL COMMENT 'Loại kho' AFTER ward_id;
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error(`Add columns to ${tableName}:`, err);
      return callback(err);
    }
    callback();
  });
};

exports.down = function (db, callback) {
  const sql = `
    ALTER TABLE ${tableName}
    DROP COLUMN seller_id,
    DROP COLUMN branch_id,
    DROP COLUMN city_id,
    DROP COLUMN ward_id,
    DROP COLUMN type_warehouse;
  `;

  db.runSql(sql, function (err) {
    if (err) {
      console.error(`Remove columns from ${tableName}:`, err);
      return callback(err);
    }
    callback();
  });
};
