export default (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 400;
  res.statusMessage = 'Bad Request';
  res.end('No ID was provided.');
};
