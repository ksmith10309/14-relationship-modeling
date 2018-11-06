import express from 'express';
const router = new express.Router();

// Import models
import Candy from '../models/candy.js';
import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);

// Import middleware
import sendJSON from '../middleware/sendJSON.js';
import idNotProvided from '../middleware/idNotProvided.js';
import idNotFound from '../middleware/idNotFound.js';
import serverError from '../middleware/serverError.js';

// **GET ROUTE TO RETURN MANUFACTURER OF THE CANDY SELECTED**
router.get('/api/candy/:id/maker', (req, res, next) => {
  Candy.findById(req.params.id).populate('manufacturer')
    .then(data => sendJSON(res, data.manufacturer))
    .catch(err => idNotFound(err, req, res, next));
});

// **GET ROUTE TO RETURN LIST OF CANDY MANUFACTURED BY THE MANUFACTURER SELECTED**
router.get('/api/maker/:id/candy', (req, res, next) => {
  Candy.find({manufacturer:req.params.id})
    .then(data => sendJSON(res, data))
    .catch(err => idNotFound(err, req, res, next));
});

// **GET ROUTE FOR BOTH CANDY AND MANUFACTURER**
router.get('/api/:model/:id', (req, res, next) => {
  req.model.findById(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(err => idNotFound(err, req, res, next));
});

router.get('/api/:model', idNotProvided);

// **DELETE ROUTE FOR BOTH CANDY AND MANUFACTURER**
router.delete('/api/:model/:id', (req, res, next) => {
  req.model.findByIdAndDelete(req.params.id)
    .then(() => {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 204;
      res.statusMessage = 'No Content';
      res.end();
    })
    .catch(err => idNotFound(err, req, res, next));
});

router.delete('/api/:model', idNotProvided);

// **POST ROUTE FOR BOTH CANDY AND MANUFACTURER**
router.post('/api/:model', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.end('No request body was provided. Please provide a request body.');
    return;
  }
  req.model.create(req.body)
    .then(data => sendJSON(res, data))
    .catch(err => serverError(err, req, res, next));
});

// **PUT ROUTE FOR BOTH CANDY AND MANUFACTURER**
router.put('/api/:model/:id', (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.end('No request body was provided. Please provide a request body.');
    return;
  }
  req.model.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(data => sendJSON(res, data))
    .catch(err => idNotFound(err, req, res, next));
});

router.put('/api/:model', idNotProvided);

export default router;
