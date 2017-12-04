const fs = require('fs');
const formidable = require('formidable');
const url = require('url');

exports.upload = (request, response) => {
  console.log("Rozpoczynam obsługę żądania upload.");
  const form = new formidable.IncomingForm();
  form.parse(request, (error, fields, files) => {
      
    const uploadFileName = fields.title ? `${fields.title}.${files.upload.name.slice(-3)}` : files.upload.name
              
    fs.renameSync(files.upload.path, `${uploadFileName}`);
    fs.readFile(files.upload.path, (err, html) => {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write('<head><link rel="stylesheet" type="text/css" href="style.css"></head>');
        response.write('<h1>Received file</h1>');
        response.write(`<img src="show?name=${uploadFileName}">`);

        response.end();
    });
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

exports.style = (request, response) => {
  fs.readFile('style.css', (err, css) => {
    response.writeHead(200, {"Content-Type": "text/css"});
    response.write(css);
    response.end();
  });
}

exports.error = (request, response) => {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
}

