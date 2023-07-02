let Htpp = require("http");
const fs = require('fs');
const Jsondata= fs.readFileSync('data.json','utf-8');

let server= Htpp.createServer(function(req,res){
  const HtmlTemplate=fs.readFileSync('index.html','utf-8');
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Node.js Server</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>This is a basic Node.js server.</p>
      <p>hello</p>
      <img src="https://d1-slp-wp.supremelifeplatform.com/wp-content/backoffice_uploads/lodgement/2276/2023/56fab9b5bd7e9557a0ccd507c13e966d773ce4bc5037458c10.png" alt="Sample Image">      </body>
  </html>
`;

    if(req.url=='/'){
        res.writeHead(200,{'Content-Type':'application/json'});
        res.write(Jsondata);
        res.end();
    }
    else if(req.url=='/contact'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(HtmlTemplate)
        res.end();
    }
    else if(req.url=="/service"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('html');
        res.end();
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write("<html><body><p>This is 4th Url -Error Page</p></body></html>");
        res.end('Invalid Request');
    }
});
server.listen(8080);