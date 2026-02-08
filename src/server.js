const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const apiHandler = require('./apiResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { pathname, query } = parsedUrl;


  //looked at w3school 

  //return XML
  const acceptsXML =
    request.headers.accept &&
    (request.headers.accept.includes('text/xml') ||
     request.headers.accept.includes('application/xml'));

  switch (pathname) {
    case '/':
    case '/client.html':
      htmlHandler.getClient(request, response);
      break;

    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;

    case '/success':
      apiHandler.success(request, response, acceptsXML);
      break;

    case '/badRequest':
      apiHandler.badRequest(request, response, acceptsXML, query);
      break;

    case '/unauthorized':
      apiHandler.unauthorized(request, response, acceptsXML, query);
      break;

    case '/forbidden':
      apiHandler.forbidden(request, response, acceptsXML);
      break;

    case '/internal':
      apiHandler.internal(request, response, acceptsXML);
      break;

    case '/notImplemented':
      apiHandler.notImplemented(request, response, acceptsXML);
      break;

    default:
      apiHandler.notFound(request, response, acceptsXML);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`listening on 127.0.0.1:${port}`);
});
