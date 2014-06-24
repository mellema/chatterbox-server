/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
var result = {results: []};
module.exports = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  //console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode;

  console.log("**** check request thing: ", request);

  if (request.method === "GET"){
    //console.log("@@@@ url:", request.url);
    if (request.url === "/classes/room1" || request.url === "/classes/messages"){
      statusCode = 200;
    } else {
      statusCode = 404;
      /*if (response.header.statusCode === 200){
        response.header.statusCode = 404;
      }*/
    }


  } else if (request.method === "POST"){
    //console.log('@@@@@@@@@@@@@@@@@response post data', request._postData)
    //console.log('json ', request.json)
    if(request._postData){
      result.results.push(request._postData);
    }
    //request.body.results = result.results;
    statusCode = 201;
  }



  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers["Content-Type"] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);
  //result.statuscode = statusCode;
  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  /*console.log("**** check request thing ", request);

  console.log("**** check result thing: ", result);
  console.log("**** check statusCode thing: ", statusCode);
*/
  //console.log("**** check returned result: ", response);
  console.log("********************************************");
  console.log("check response thing" + response);
  response.end(JSON.stringify(result));

};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
