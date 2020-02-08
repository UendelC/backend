const { Router } = require("express");
const routes = Router();
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

routes.get("/", (req, res) => {
  res.send("UP AND RUNNING");
});
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.get("/search", SearchController.index);
routes.post("/delete/:id", DevController.destroy);

module.exports = routes;
