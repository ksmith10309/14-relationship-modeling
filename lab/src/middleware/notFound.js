const methods = ['POST', 'GET', 'DELETE', 'PUT'];

export default (req, res, next) => {
  if (!methods.includes(req.method)) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.statusMessage = 'Route Not Found';
    res.end('Route has not been registered. Please use POST, GET, DELETE, or PUT.');
  }
  else {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.statusMessage = 'Path Not Found';
    res.end('Path has not been registered. Please check path.');
  }
};
