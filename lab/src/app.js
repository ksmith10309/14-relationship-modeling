import express from 'express';
import cors from 'cors';

import router from './api/api.js';
import notFound from './middleware/notFound.js';
import invalidBody from './middleware/invalidBody.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(notFound);

app.use(invalidBody);

module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  },
};
