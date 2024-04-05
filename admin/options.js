const { buildRouter } = require("adminjs");
const adminJsOptions = require("./resources");

const options = {
  // Add your AdminJS options here
  resources: adminJsOptions.resources,
};

const router = buildRouter(options);
module.exports = router;
