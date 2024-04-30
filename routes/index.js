const auth = require('./auth');
const navigationRoutes = require('./navigation');
const employeeRouts = require('./employee');

const constructorMethod = (app) => {
  app.use('/', auth);
  app.use('/navigation', navigationRoutes);
  app.use('/employee', employeeRouts);
};

module.exports = constructorMethod;