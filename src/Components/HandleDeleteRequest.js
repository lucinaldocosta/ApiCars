const db = require("./Database");
const sendJsonResponse = require("./sendJsonResponse");

const deleteData = db.prepare(`DELETE FROM ApiCars WHERE id = ?`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Info Deleted");
  }
});

function handleDeleteRequest(request, response) {
  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    const parsedBody = JSON.parse(body);
    deleteData.run(parsedBody.id);
  });
  sendJsonResponse(response, 200, { message: "Cars deleted successfully" });
}

module.exports = handleDeleteRequest;
