import { app } from '../app.js';

import server from './supergoose.js';
import { startDB, stopDB } from './supergoose.js';

import Candy from '../models/candy.js';
import Maker from '../models/maker.js';

beforeAll(startDB);
afterAll(stopDB);

describe('Candymaker 200 Tests', () => {
  let mars, twix, snickers, hershey, reeses, kitkat, york;
  beforeEach(async() => {
    mars = await Maker.create({name:'Mars', location:'Chicago, IL'});
    twix = await Candy.create({name:'Twix', manufacturer:mars._id});
    snickers = await Candy.create({name:'Snickers', manufacturer:mars._id});

    hershey = await Maker.create({name:'Hershey', location:'Hershey, PA'});
    reeses = await Candy.create({name:'Reese\'s', manufacturer:hershey._id});
    kitkat = await Candy.create({name:'Kit Kat', manufacturer:hershey._id});
    york = await Candy.create({name:'York', manufacturer:hershey._id});
  });
  afterEach(async() => {
    await Candy.deleteMany({});
    await Maker.deleteMany({});
  });

  it(`GET: should return manufacturer of candy selected`, (done) => {
    server(app)
      .get('/api/candy/' + snickers._id + '/maker')
      .then(response => {
        expect(response.res.statusCode).toBe(200);
        expect(response.body._id).toBe(mars._id.toString());
        expect(response.body.name).toBe('Mars');
        expect(response.body.location).toBe('Chicago, IL');
        done();
      });
  });
  it(`GET: should return list of candy manufactured by manufacturer selected`, (done) => {
    server(app)
      .get('/api/maker/' + hershey._id + '/candy')
      .then(response => {
        expect(response.res.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
        expect(response.body[0].name).toBe(reeses.name);
        expect(response.body[1].name).toBe(kitkat.name);
        expect(response.body[2].name).toBe(york.name);
        done();
      });
  });
  it(`GET: test 200 for candy, returns a resource with a valid body`, (done) => {
    server(app)
      .get('/api/candy/' + twix._id)
      .then(response => {
        expect(response.res.statusCode).toBe(200);
        expect(response.body._id).toBe(twix._id.toString());
        expect(response.body.name).toBe('Twix');
        expect(response.body.manufacturer).toBe(mars._id.toString());
        done();
      });
  });
  it(`GET: test 200 for maker, returns a resource with a valid body`, (done) => {
    server(app)
      .get('/api/maker/' + hershey._id)
      .then(response => {
        expect(response.res.statusCode).toBe(200);
        expect(response.body._id).toBe(hershey._id.toString());
        expect(response.body.name).toBe('Hershey');
        expect(response.body.location).toBe('Hershey, PA');
        done();
      });
  });
  it('PUT: test 200 for candy, returns a resource with a valid body', (done) => {
    server(app)
      .put('/api/candy/' + reeses._id)
      .send({name:'Reese\'s Peanut Butter Cups'})
      .then(response => {
        expect(response.res.statusCode).toBe(200);
        expect(response.body._id).toBe(reeses._id.toString());
        expect(response.body.name).toBe('Reese\'s Peanut Butter Cups');
        expect(response.body.manufacturer).toBe(hershey._id.toString());
        done();
      });
  });
  it('PUT: test 200 for maker, returns a resource with a valid body', (done) => {
    server(app)
      .put('/api/maker/' + mars._id)
      .send({name:'Mars Wrigley Confectionery'})
      .then(response => {
        expect(response.res.statusCode).toBe(200);
        expect(response.body._id).toBe(mars._id.toString());
        expect(response.body.name).toBe('Mars Wrigley Confectionery');
        expect(response.body.location).toBe('Chicago, IL');
        done();
      });
  });
  it(`POST: test 200 for candy, returns a resource with a valid body`, (done) => {
    server(app)
      .post('/api/candy')
      .send({name:'Milky Way', manufacturer:hershey._id})
      .then(response => {
        expect(response.res.statusCode).toBe(200);
        expect(response.body.name).toBe('Milky Way');
        expect(response.body.manufacturer).toBe(hershey._id.toString());
        done();
      });
  });
  it(`POST: test 200 for maker, returns a resource with a valid body`, (done) => {
    server(app)
      .post('/api/maker')
      .send({name:'Ferrero', location:'Alba, Italy'})
      .then(response => {
        expect(response.res.statusCode).toBe(200);
        expect(response.body.name).toBe('Ferrero');
        expect(response.body.location).toBe('Alba, Italy');
        done();
      });
  });
});

describe('Candymaker 404 and 400 Tests', () => {
  it(`API: returns a status code of 404 for routes that have not been registered for candy`, (done) => {
    server(app)
      .patch('/api/candy')
      .then(response => {
        expect(response.res.statusCode).toBe(404);
        expect(response.res.statusMessage).toBe('Route Not Found');
        done();
      });
  });
  it(`API: returns a status code of 404 for routes that have not been registered for maker`, (done) => {
    server(app)
      .patch('/api/maker')
      .then(response => {
        expect(response.res.statusCode).toBe(404);
        expect(response.res.statusMessage).toBe('Route Not Found');
        done();
      });
  });
  it(`GET: test 404 for candy, respond with 'not found' for valid requests made with an id that was not found`, (done) => {
    server(app)
      .get('/api/candy/123')
      .then(response => {
        expect(response.res.statusCode).toBe(404);
        expect(response.res.statusMessage).toBe('Not Found');
        done();
      });
  });
  it(`GET: test 404 for maker, respond with 'not found' for valid requests made with an id that was not found`, (done) => {
    server(app)
      .get('/api/maker/123')
      .then(response => {
        expect(response.res.statusCode).toBe(404);
        expect(response.res.statusMessage).toBe('Not Found');
        done();
      });
  });
  it(`GET: test 400 for candy, responds with 'bad request' if no id was provided`, (done) => {
    server(app)
      .get('/api/candy')
      .then(response => {
        expect(response.res.statusCode).toBe(400);
        expect(response.res.statusMessage).toBe('Bad Request');
        done();
      });
  });
  it(`GET: test 400 for maker, responds with 'bad request' if no id was provided`, (done) => {
    server(app)
      .get('/api/maker')
      .then(response => {
        expect(response.res.statusCode).toBe(400);
        expect(response.res.statusMessage).toBe('Bad Request');
        done();
      });
  });
  it(`PUT: test 404 for candy, responds with 'not found' for valid requests made with an id that was not found`, (done) => {
    server(app)
      .put('/api/candy/123')
      .send({name:'Whatchamacallit'})
      .then(response => {
        expect(response.res.statusCode).toBe(404);
        expect(response.res.statusMessage).toBe('Not Found');
        done();
      });
  });
  it(`PUT: test 404 for maker, responds with 'not found' for valid requests made with an id that was not found`, (done) => {
    server(app)
      .put('/api/maker/123')
      .send({name:'Cadbury'})
      .then(response => {
        expect(response.res.statusCode).toBe(404);
        expect(response.res.statusMessage).toBe('Not Found');
        done();
      });
  });
  it(`PUT: test 400 for candy, responds with 'bad request' if no request body was provided`, (done) => {
    server(app)
      .put('/api/candy')
      .send()
      .then(response => {
        expect(response.res.statusCode).toBe(400);
        expect(response.res.statusMessage).toBe('Bad Request');
        done();
      });
  });
  it(`PUT: test 400 for maker, responds with 'bad request' if no request body was provided`, (done) => {
    server(app)
      .put('/api/maker')
      .send()
      .then(response => {
        expect(response.res.statusCode).toBe(400);
        expect(response.res.statusMessage).toBe('Bad Request');
        done();
      });
  });
  it(`POST: test 400 for candy, responds with 'bad request' if no request body was provided`, (done) => {
    server(app)
      .post('/api/candy')
      .send()
      .then(response => {
        expect(response.res.statusCode).toBe(400);
        expect(response.res.statusMessage).toBe('Bad Request');
        done();
      });
  });
  it(`POST: test 400 for maker, responds with 'bad request' if no request body was provided`, (done) => {
    server(app)
      .post('/api/maker')
      .send()
      .then(response => {
        expect(response.res.statusCode).toBe(400);
        expect(response.res.statusMessage).toBe('Bad Request');
        done();
      });
  });
});
