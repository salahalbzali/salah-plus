const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end('<h1 style="color:green;text-align:center;margin-top:100px;">✅ المخدم يعمل!</h1>');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('الخادم يعمل: http://127.0.0.1:3000');
});