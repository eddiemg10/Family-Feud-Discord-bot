const Discord = require("discord.js");

// const config = require("./config.json");

const Client = require("./structures/Client.js");

const client = new Client();

client.start(process.env.token);
