const respondJSON = (response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    const text = JSON.stringify(object);
    console.log(text);
    response.write(text);
    response.end();
  };
  
  const respondXML = (response, status, message, id) => {
    response.writeHead(status, { 'Content-Type': 'text/xml' });
  
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<response>';
    xml += `<message>${message}</message>`;
    if (id) xml += `<id>${id}</id>`;
    xml += '</response>';
  
    console.log(xml);
    response.write(xml);
    response.end();
  };
  
  const sendResponse = (response, status, acceptsXML, message, id) => {
    if (acceptsXML) {
      respondXML(response, status, message, id);
    } else {
      const obj = { message };
      if (id) obj.id = id;
      respondJSON(response, status, obj);
    }
  };

  //api routes
  
  const success = (request, response, acceptsXML) => {
    sendResponse(response, 200, acceptsXML, 'This request was successful!');
  };
  
  const badRequest = (request, response, acceptsXML, query) => {
    if (!query.valid || query.valid !== 'true') {
      return sendResponse(
        response,
        400,
        acceptsXML,
        'Missing required query parameter: valid=true',
        'badRequest'
      );
    }
  
    sendResponse(response, 200, acceptsXML, 'Valid request!');
  };
  
  const unauthorized = (request, response, acceptsXML, query) => {
    if (!query.loggedIn || query.loggedIn !== 'yes') {
      return sendResponse(
        response,
        401,
        acceptsXML,
        'You must be logged in to view this content.',
        'unauthorized'
      );
    }
  
    sendResponse(response, 200, acceptsXML, 'You are logged in!');
  };
  
  const forbidden = (request, response, acceptsXML) => {
    sendResponse(response, 403, acceptsXML, 'Access denied.', 'forbidden');
  };
  
  const internal = (request, response, acceptsXML) => {
    sendResponse(response, 500, acceptsXML, 'Internal server error.', 'internal');
  };
  
  const notImplemented = (request, response, acceptsXML) => {
    sendResponse(
      response,
      501,
      acceptsXML,
      'This feature is not implemented.',
      'notImplemented'
    );
  };
  
  const notFound = (request, response, acceptsXML) => {
    sendResponse(response, 404, acceptsXML, 'Resource not found.', 'notFound');
  };
  
  module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
  };
  