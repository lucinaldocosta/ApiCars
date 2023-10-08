const apiKey = "CHAVE_API_1";
const apiUrl = `http://localhost:3000?apikey=${apiKey}`;

// fetch(apiUrl)
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const data = {
  brand: "Ferrari",
  model: "La5",
  year: 2022,
  month: 9,
  color: "red",
  engPower: 1,
  fuelVolume: 1,
};

fetch(apiUrl, {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.text())
  .then((data) => console.log(data));

// fetch(apiUrl, {
//     method: "DELETE",
//     body: JSON.stringify({id: 5}),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.text())
//     .then((data) => console.log(data));