export default (res, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.end(JSON.stringify(data));
};
