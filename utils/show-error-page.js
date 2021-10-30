function showErrorPage(res, descryption) {
  return res.render('error', { descryption });
}

module.exports = {
  showErrorPage,
};
