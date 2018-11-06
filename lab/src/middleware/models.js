import requireAll from 'require-directory';
const models = requireAll(module, '../models', {recursive:false});

export default (req, res, next) => {
  try {
    let model = req && req.params && req.params.model;
    if (model && models[model] && models[model].default) {
      req.model = models[model].default;
      next();
    }
    else throw 'Model not found'; 
  }
  catch(error) {
    throw error;
  }
};
