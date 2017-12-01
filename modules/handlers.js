const fs = require('fs');
const formidable = require('formidable');



exports.upload = (request, response) => {
  console.log("Rozpoczynam obsługę żądania upload.");
  const form = new formidable.IncomingForm();
  form.parse(request, (error, fields, files) => {
      
    const uploadFileName = fields.title ? `${fields.title}.${files.upload.name.slice(-3)}` : files.upload.name
              
    fs.renameSync(files.upload.path, `${uploadFileName}`);
    fs.readFile('templates/upload.html', (err, html) => {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });

    exports.show = (request, response) => {
      fs.readFile(uploadFileName, "binary", (error, file) => {
          response.writeHead(200, {"Content-Type": "image/png"});
          response.write(file, "binary");
          response.end();
      });
    }

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