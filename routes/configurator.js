const express = require('express');
const { COOKIE_ADDONS, COOKIE_BASES } = require('../data/cookies-data');
const { getAddonsdFromReq } = require('../utils/get-addons-from-req');
const { showErrorPage } = require('../utils/show-error-page');

const configuratorRouter = express.Router();

configuratorRouter
  .get('/select-base/:baseName', (req, res) => {
    const { baseName } = req.params;

    if (!COOKIE_BASES[baseName]) {
      return showErrorPage(res, `There is no base ${baseName}.`);
    }

    res.cookie('cookieBase', baseName).render('configurator/base-selected', {
      baseName,
    });
  })
  .get('/add-addon/:addonName', (req, res) => {
    const { addonName } = req.params;

    if (!COOKIE_ADDONS[addonName]) {
      return showErrorPage(res, `There is no aaddon ${addonName}.`);
    }

    const addons = getAddonsdFromReq(req);

    if (addons.includes(addonName)) {
      return showErrorPage(
        res,
        `${addonName} is alredy on youre cookie. You cannot add it twice.`
      );
    }

    addons.push(addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', {
        addonName,
      });
  })
  .get('/delete-addon/:addonName', (req, res) => {
    const { addonName } = req.params;

    const oldAddons = getAddonsdFromReq(req);

    if (!oldAddons.includes(addonName)) {
      return showErrorPage(
        res,
        `Canot delete somthing isn't added to the cookie ${addonName} do not exist`
      );
    }

    const addons = oldAddons.filter((addon) => addon !== addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/deleted', {
        addonName,
      });
  });
module.exports = {
  configuratorRouter,
};
