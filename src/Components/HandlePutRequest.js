const db = require("./Database");
const sendJsonResponse = require("./sendJsonResponse");

const modifyData = db.prepare(
  `UPDATE ApiCars SET brand = ?, model = ?, year = ?, month = ?, color = ?, engPower = ?, fuelVolume = ? WHERE id = ?`,
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Info Modified");
    }
  }
);

function handlePutRequest(request, response) {
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    const parsedBody = JSON.parse(body);
    modifyData.run(
      parsedBody.brand,
      parsedBody.model,
      parsedBody.year,
      parsedBody.month,
      parsedBody.color,
      parsedBody.engPower,
      parsedBody.fuelVolume,
      parsedBody.id
    );
    sendJsonResponse(response, 200, { message: "Cars modified successfully" });
  });
}

module.exports = handlePutRequest;
