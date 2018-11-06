export default (err, req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.end('ID was not found.');
};
