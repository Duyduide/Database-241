const auth = require('./authRoute');
const { error_handler, not_found} = require('../middleware/error_handler')

const initRoutes = (app) => {
    app.use('/api/v1/auth', auth);

    app.use(not_found);
    app.use(error_handler);
}

module.exports = initRoutes;