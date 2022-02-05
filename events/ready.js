const Event = require('../structures/Event.js');

module.exports = new Event("ready", client=>{
    console.log("Bot is online!");
});