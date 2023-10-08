const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("cars.db", (err) => {
  if (err) {
    console.erroror(err);
  } else {
    console.log("DB Created");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS 'ApiCars'(
        'id' INTEGER PRIMARY KEY AUTOINCREMENT,
        'brand' TEXT,
        'model' TEXT,
        'year' INTEGER,
        'month' INTEGER,
        'color' TEXT,
        'engPower' INTEGER,
        'fuelVolume' INTEGER
    )`,
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Table Created");
    }
  }
);

module.exports = db;
