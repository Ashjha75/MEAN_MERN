let Htpp = require("http");
let server= Htpp.createServer(function(req,res){
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
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write("<html><body><p>This is first Url -Home Page</p></body></html>");
        res.end();
    }
    else if(req.url=='/contact'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write("<html><body><p>This is Second Url -Contact Page</p></body></html>")
        res.end();
    }
    else if(req.url=="/service"){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(html);
        res.end();
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write("<html><body><p>This is 4th Url -Error Page</p></body></html>");
        res.end('Invalid Request');
    }
});
server.listen(8080);