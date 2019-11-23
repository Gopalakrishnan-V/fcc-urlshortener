var dns = require("dns");
var urlModule = require("url");

var Url = require("../models/url.model");

module.exports.createShortUrl = function(req, res) {
  const { url } = req.body;
  const domain = urlModule.parse(url).hostname;

  dns.resolve4(domain || "", function(err, addressess) {
    if (err) {
      return res.send({ error: "invalid URL" });
    } else {
      const urlObj = new Url({
        original: url
      });
      urlObj.save(function(err, data) {
        if (err) {
          return res.send({ error: "invalid URL" });
        } else {
          return res.send({
            original_url: data.original,
            short_url: data.short
          });
        }
      });
    }
  });
};

module.exports.redirect = function(req, res) {
  let { short } = req.params;
  if (isNaN(short)) {
    return res.send({ error: "No short url found for given input" });
  } else {
    short = parseInt(short);
  }

  Url.findOne({ short }, function(err, data) {
    if (err) {
      return res.send({ error: "No short url found for given input" });
    } else {
      const { original } = data;
      return res.redirect(original);
    }
  });
};
