exports.upload = (request, response) => {
  console.log("Rozpoczynam obsługę żądania upload.");
  response.write("Rozpoczynam upload!");
  response.end();
}

exports.welcome = (request, response) => {
  console.log("Rozpoczynam obsługę żądania welcome.");
  response.write("Witaj na stronie startowej!");
  response.end();
}

exports.error = (request, response) => {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
}