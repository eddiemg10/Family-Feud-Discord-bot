const Discord = require("discord.js");

const intents = new Discord.Intents(32767);

const Command = require("./Command.js");

const Event = require("./Event.js");

// const config = require("../config.json");

const fs = require("fs");

class Client extends Discord.Client {
  constructor() {
    super({ intents });

    /**
     * @type{Discord.Collection<string, Commands>}
     */
    this.commands = new Discord.Collection();
    // this.prefix = config.prefix;
    this.prefix = process.env.prefix;
  }

  start(token) {
    fs.readdirSync("./commands")
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        const command = require(`../commands/${file}`);
        console.log(`Command ${command.name} loaded`);
        this.commands.set(command.name, command);
      });

    fs.readdirSync("./events")
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        const event = require(`../events/${file}`);
        console.log(`Event ${event.event} loaded`);
        this.on(event.event, event.run.bind(null, this));
      });

    this.login(token);
  }
}

module.exports = Client;
