const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const { HomeRouter } = require('./routes/home');
const { ConfiguratorRouter } = require('./routes/configurator');
const { orderRouter } = require('./routes/order');
const { handlebarsHelpers } = require('./utils/handlenars-helpers');

class CookieMakerApp {
  constructor() {
    this._configureApp();
    this._setRoutes();
    this._run();
  }

  _configureApp() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(cookieParser());

    this.app.engine(
      '.hbs',
      hbs({
        extname: '.hbs',
        helpers: handlebarsHelpers,
      })
    );
    this.app.set('view engine', '.hbs');
  }

  _setRoutes() {
    this.app.use('/', new HomeRouter().router);
    this.app.use('/configurator', new ConfiguratorRouter().router);
    this.app.use('/order', orderRouter);
  }

  _run() {
    this.app.listen(3000, 'localhost', () => {
      console.log(`Server is started on http//localhost:3000`);
    });
  }
  showErrorPage(res, descryption) {
    return res.render('error', { descryption });
  }

  getAddonsdFromReq(req) {
    const { cookieAddons } = req.cookies;
    return cookieAddons ? JSON.parse(cookieAddons) : [];
  }
}

new CookieMakerApp();
