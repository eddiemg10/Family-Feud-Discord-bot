const Event = require("../structures/Event.js");

module.exports = new Event("messageCreate", (client, message) => {
  if (!message.content.startsWith(client.prefix)) {
    return;
  }

  if (message.content === "alexa play despacito") {
    return message.reply(
      `L + ratio + you're black + the hood watched pokimane now`
    );
  }

  const args = message.content.substring(client.prefix.length).split(/ +/);

  const command = client.commands.find((cmd) => cmd.name == args[0]);

  if (!command) {
    return message.reply(`**${args[0]}** is not a valid command!`);
  }

  command.run(message, args, client);
});
