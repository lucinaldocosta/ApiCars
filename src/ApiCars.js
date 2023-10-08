const http = require("http");
const handleGetRequest = require("./Components/HandleGetRequest");
const handlePutRequest = require("./Components/HandlePutRequest");
const handlePostRequest = require("./Components/HandlePostRequest");
const handleDeleteRequest = require("./Components/HandleDeleteRequest");

function extractApiKeyFromUrl(url) {
  try {
    const urlObj = new URL(url);
    const apiKey = urlObj.searchParams.get("apikey");
    console.log(apiKey);
    return apiKey;
  } catch (error) {
    console.erroror("Error ao analizar a url:", error);
    return null;
  }
}

function isValidApiKey(apiKey) {
  const validApiKeys = ["CHAVE_API_1", "CHAVE_API_2"];
  return validApiKeys.includes(apiKey);
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const host = req.headers.host;
  const fullUrl = req.protocol + "://" + host + req.url;
  const apiKey = extractApiKeyFromUrl(fullUrl);

  if (isValidApiKey(apiKey)) {
    if (req.method === "GET") {
      handleGetRequest(res);
    } else if (req.method === "POST") {
      handlePostRequest(req, res);
    } else if (req.method === "PUT") {
      handlePutRequest(req, res);
    } else if (req.method === "DELETE") {
      handleDeleteRequest(req, res);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  } else {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Api Key Wrong" }));
  }
});

server.listen(3000);
