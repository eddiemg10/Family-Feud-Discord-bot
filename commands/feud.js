const Command = require("../structures/Command.js");

const { MessageEmbed } = require('discord.js');

module.exports = new Command({
    name: "feud",
    description: "Begins Family Feud session",
    async run(message, args, client){

    let players = [];
    
    let quiz = [
        {
            question: "Name A Color You See A Lot Of In Mobster Movies",
            answers: [{answer: "black", points: 41}, {answer: "red", points: 19}, {answer: "green", points: 16}, {answer: "blue", points: 9}, {answer: "grey", points: 8}, {answer: "white", points: 6}],
            correct: 0,
        }
    ]



    players.push(message.author);

            
            const initialEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('FAMILY FEUD')
        .setURL('https://discord.js.org/')
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()})
        .setDescription(`A game of family feud has been started by ${message.author.username}\n\n`)
        .setThumbnail('https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFamily_Feud&psig=AOvVaw2sbotj8qxlHhwkEJO_ogLi&ust=1644235122122000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDvuKyD6_UCFQAAAAAdAAAAABAD')
        .addFields(
            { name: 'How to join', value: 'Send **join** to join the game.\nOnce ready, the game initiator should send **start** ' },
            { name: '\u200B', value: '\u200B' },
            
        )
        .setTimestamp()
        
        
        //Send reactions to Join Teams
        message.channel.send({ embeds: [initialEmbed] }).then(embedMessage => {
            // embedMessage.react("🅰️");
            // embedMessage.react("🅱️");
        });


        //Collector to initialize the game

        const filter = msg => {

            if(msg.content.toLowerCase() === 'start'){
                if(msg.author.id === message.author.id){
                    msg.reply(`<@${message.author.id}> has started the game`);

                    // collector.stop();
                    // startGame();
                    // collector.stop();

                    return true;
                }
                else{
                    msg.reply(`Only <@${message.author.id}> can start the game`);
                    return false;

                }
            }

            if(msg.content.toLowerCase() === 'join'){

                if(players.includes(msg.author)){
                    msg.reply(`You are already playing`);
                    return true;
                }
                else{
                    msg.reply(`<@${message.author.id}> has joined the game`);
                    return false;
                }
                

            }

        }

        const collector = message.channel.createMessageCollector({filter});

        collector.on('collect', msg => {
            console.log(`Collected ${msg.content}`);
            if (msg.content === 'start'){
                startGame();
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });

        function startGame(){
            
            for(let i = 0; i < quiz.length; i++){

                let q = quiz[i];
                message.channel.send(`Question: ${q.question}`);


                // while(q.correct < 6){

                    for(let j = 0; j < players.length; j++){
                        message.channel.send(`<@${players[j].id}> turn`);

                        const filter = msg => msg.author.id === players[j].id;

                        const collector = message.channel.createMessageCollector({filter, max: 1, time: 5000, errors: ['time']});

                        collector.on('collect', msg => {
                            console.log(`Collected ${msg.content}`);
                            if(msg.content === 'red'){
                                message.channel.send("CORRECT");
                                msg.react('✅');
                            }
                            else{
                                msg.react('❌');
                            }
                        });

                        collector.on('end', collected => {
                            console.log(`Collected ${collected.size} items`);
                        });
                    }
                // }
            }

            
        }



    }


});