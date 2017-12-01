const fs = require('fs');
const formidable = require('formidable');

exports.upload = (request, response) => {
  console.log("Rozpoczynam obsługę żądania upload.");
  const form = new formidable.IncomingForm();
  form.parse(request, (error, fields, files) => {
      fs.renameSync(files.upload.path, "test.png");
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("received image:<br/>");
      response.write("<img src='/show' />");
      response.end();
  });
}

exports.welcome = (request, response) => {
  console.log("Rozpoczynam obsługę żądania welcome.");
  fs.readFile('templates/start.html', (err, html) => {
      response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      response.write(html);
      response.end();
  });
}

exports.error = (request, response) => {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
}