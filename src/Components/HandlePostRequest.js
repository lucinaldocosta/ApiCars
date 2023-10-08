const db = require("./Database");
const sendJsonResponse = require("./sendJsonResponse");

const insertData = db.prepare(
  `INSERT INTO ApiCars(brand, model, year, month, color, engPower, fuelVolume) VALUES(?, ?, ?, ?, ?, ?, ?)`,
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Info Added");
    }
  }
);

function handlePostRequest(request, response) {
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    const parsedBody = JSON.parse(body);
    insertData.run(
      parsedBody.brand,
      parsedBody.model,
      parsedBody.year,
      parsedBody.month,
      parsedBody.color,
      parsedBody.engPower,
      parsedBody.fuelVolume
    );
    sendJsonResponse(response, 200, { message: "Cars added successfully" });
  });
}

module.exports = handlePostRequest;
