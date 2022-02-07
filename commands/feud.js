const Command = require("../structures/Command.js");

const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: "feud",
    description: "Begins Family Feud session",
    async run(message, args, client){

            let teamA = [];
            let teamB = [];
            
            const initialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('FAMILY FEUD')
        .setURL('https://discord.js.org/')
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()})
        .setDescription(`A game of family feud has been started by ${message.author.username}`)
        .setThumbnail('https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFamily_Feud&psig=AOvVaw2sbotj8qxlHhwkEJO_ogLi&ust=1644235122122000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDvuKyD6_UCFQAAAAAdAAAAABAD')
        .addFields(
            { name: 'How to join', value: 'Add a reaction to join a team. Maximum of 5 people per team.\nOnce ready, the game initiator should send **start** ' },
            { name: '\u200B', value: '\u200B' },
            { name: 'TEAM A', value: 'guy1,\n guy2, guy3, guy4', inline: true },
            { name: 'TEAM B', value: 'guy1, guy2, guy3', inline: true },
        )
        .setTimestamp()
        
        
        //Send reactions to Join Teams
        message.channel.send({ embeds: [initialEmbed] }).then(embedMessage => {
            embedMessage.react("🅰️");
            embedMessage.react("🅱️");
        });


        //Collector to initialize the game

        function getTeamMembers(){

        }
        const filter = msg => {
            if(msg.author.id === message.author.id && msg.content.toLowerCase() === 'start'){

                msg.reply(`${message.author.username} has started the game`);
                console.log(initialEmbed.reactions);
                return true;
            }
            else{
                if( msg.content.toLowerCase() === 'start'){
                    msg.reply(`Only ${message.author.username} can start the game`);
                }
                return false;
            }

        }

        const collector = message.channel.createMessageCollector({filter});

        collector.on('collect', msg => {
            console.log(`Collected ${msg.content}`);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });




    }


});