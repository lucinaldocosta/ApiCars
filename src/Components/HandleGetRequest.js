const db = require("./Database");
const sendJsonResponse = require("./sendJsonResponse");

const search = (callback) => {
  db.all(`SELECT * FROM ApiCars`, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      callback(rows);
    }
  });
};

function handleGetRequest(response) {
  search((result) => {
    response.write(JSON.stringify(result));
    response.end();
  });
}

module.exports = handleGetRequest;
