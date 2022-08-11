const Discord = require("discord.js");

// const config = require("./config.json");

const Client = require("./structures/Client.js");

const client = new Client();

//Use this for production
client.start(process.env.token);

//use this for development
// client.start(config.token);
