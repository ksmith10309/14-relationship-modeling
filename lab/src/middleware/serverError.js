export default (err, req, res, next) => {
  console.error(err);
  let error = { error:err };
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.end(JSON.stringify(error));
};
