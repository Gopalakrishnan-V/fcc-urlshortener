var Url = require("../models/url.model");

module.exports.createShortUrl = function(req, res) {
  const { url } = req.body;
  const original = url;
  const urlObj = new Url({
    original: url
  });
  urlObj.save(function(err, data) {
    if (err) {
      console.log("err", err);
      return res.send({ error: "invalid URL" });
    } else {
      return res.send({
        original_url: data.original,
        short_url: data.short
      });
    }
  });
};
