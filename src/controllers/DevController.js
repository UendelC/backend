const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

//index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    let dev = await Dev.findOne({ github_username });
    console.log(dev);
    if (!dev) {
      console.log("nao existe");
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = apiResponse.data;
      const techArray = parseStringAsArray(techs);
      console.log(name, avatar_url, bio, github_username, techArray);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techArray,
        location
      });
      return response.json(dev);
    }
  },

  async destroy(request, response) {
    Dev.deleteOne({ id: request.body.id });
  }
};
