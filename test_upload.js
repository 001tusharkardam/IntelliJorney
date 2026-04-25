const FormData = require('form-data');
const fs = require('fs');
const http = require('http');

// create two dummy text files as "images"
fs.writeFileSync('dummy1.jpg', 'dummy data 1');
fs.writeFileSync('dummy2.jpg', 'dummy data 2');

const form = new FormData();
form.append('listing[title]', 'Test Multiple');
form.append('listing[description]', 'Desc');
form.append('listing[price]', '100');
form.append('listing[country]', 'India');
form.append('listing[location]', 'Delhi');
form.append('listing[category]', 'Trending');
form.append('images', fs.createReadStream('dummy1.jpg'));
form.append('images', fs.createReadStream('dummy2.jpg'));

const request = http.request({
  method: 'post',
  host: 'localhost',
  port: 8080,
  path: '/listings',
  headers: form.getHeaders()
});

form.pipe(request);

request.on('response', function(res) {
  console.log('StatusCode:', res.statusCode);
  res.on('data', d => process.stdout.write(d));
});
