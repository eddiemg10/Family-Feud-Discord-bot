const Discord = require("discord.js");

const config = require("./config.json");

const Client = require("./structures/Client.js");

const client = new Client();

const commands = new Discord.Collection;

const fs = require('fs');
fs.readdirSync("./commands")
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
    const command = require(`./commands/${file}`);
    console.log(`Command ${command.name} loaded`);
    client.commands.set(command.name, command);
    });

client.on('ready', () => {
    console.log("Bot is online!");
});

client.on('messageCreate', message =>{

    if(!message.content.startsWith(config.prefix)){
        return;
    }

    const args = message.content.substring(config.prefix.length).split(/ +/);

    const command = client.commands.find(cmd => cmd.name == args[0]);

    if(!command){
        return message.reply(`**${args[0]}** is not a valid command!`);
    }

    command.run(message, args, client);
});


client.login(config.token);