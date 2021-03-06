const fs = require('fs');
const formidable = require('formidable');
const url = require('url');

exports.upload = (request, response) => {
  console.log("Rozpoczynam obsługę żądania upload.");
  const form = new formidable.IncomingForm();
  form.parse(request, (error, fields, files) => {

    const uploadFileName = fields.title ? `${fields.title}.${files.upload.name.slice(-3)}` : files.upload.name

    fs.renameSync(files.upload.path, `${uploadFileName}`);

    fs.readFile('templates/upload.html', (err, html) => {
      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
      });
      response.write(html);
      response.write(`<img src="/show?name=${uploadFileName}">`);
      response.end();
    });
  });
}

exports.show = (request, response) => {
  var parsedUrl = url.parse(request.url, true);

  fs.readFile(parsedUrl.query["name"], "binary", (error, file) => {
    response.writeHead(200, {
      "Content-Type": "image/png"
    });
    response.write(file, "binary");
    response.end();
  });
}

exports.welcome = (request, response) => {
  console.log("Rozpoczynam obsługę żądania welcome.");
  fs.readFile('templates/start.html', (err, html) => {
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    response.write(html);
    response.end();
  });
}

exports.style = (request, response) => {
  fs.readFile('style.css', (err, css) => {
    response.writeHead(200, {
      "Content-Type": "text/css"
    });
    response.write(css);
    response.end();
  });
}

exports.error = (request, response) => {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
}