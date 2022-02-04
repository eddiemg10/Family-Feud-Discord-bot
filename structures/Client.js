const Discord = require("discord.js");

const intents = new Discord.Intents(32767);

const Command = require("./Command.js")

class Client extends Discord.Client{

    constructor(options){
        super({intents});

        /**
         * @type{Discord.Collection<string, Commands>}
         */
        this.commands = new Discord.Collection();
    }
}

module.exports = Client;