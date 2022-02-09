const Command = require("../structures/Command.js");

const { MessageEmbed } = require('discord.js');

const questions = require("../question_database/6answers.json");

module.exports = new Command({
    name: "test",
    description: "Begins Family Feud session",
    async run(message, args, client){

    let players = [];
    let allow = true;
    
    players.push(message.author);
    players[(players.length-1)].score = 0;


    var quiz = [];

    for(let i = 0; i< questions.length; i++){
        quiz.push({question: questions[i].Question, 
                   answers: [ {answer: questions[i].Answer1, points: questions[i].P1},
                              {answer: questions[i].Answer2, points: questions[i].P2},
                              {answer: questions[i].Answer3, points: questions[i].P3},
                              {answer: questions[i].Answer4, points: questions[i].P4},
                              {answer: questions[i].Answer5, points: questions[i].P5},
                              {answer: questions[i].Answer6, points: questions[i].P6},
        
                            ],
                   correct: 0,
                  }
        );

    }


   
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
                    players.push(msg.author);
                    players[(players.length-1)].score = 0;
                    msg.reply(`<@${msg.author.id}> has joined the game`);
                    return false;
                }
                

            }

        }

        const collector = message.channel.createMessageCollector({filter});

        collector.on('collect', msg => {
            console.log(`Collected ${msg.content}`);
            if (msg.content === 'start'){
                startGame();
                if(allow){
                    startGame();
                }
                
                

            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });

        async function startGame(){
            

                let q = quiz[0];
                message.channel.send(`Question: ${q.question}`);
                let guessed = [];

             

                            message.channel.send(`<@${players[0].id}> turn`);

                            const filter = msg => msg.author.id === players[0].id;

                            const collector = message.channel.createMessageCollector({filter, max: 1, time: 120000, errors: ['time']});

                            

                            collector.on('collect', msg => {
                                console.log(`Collected ${msg.content}`);
                                let guess = msg.content.toLowerCase();
                                
                                const found = quiz[0].answers.some( el => el.answer.toLowerCase().includes(guess))
                                
                                const ans = quiz[0].answers;
                                for(let k = 0; k < ans.length; k++){
                                    if(ans[k].answer.toLowerCase().includes(guess) && !guessed.includes(k)){
                                        players[0].score += ans[k].points;
                                        quiz[0].correct += 1;
                                        guessed.push(k);

                                        msg.react('✅');
                                        msg.reply(`Points: ${players[0].score}`);
                                    }                      
                                    msg.react('❌');
                                    // msg.reply(`Points: ${players[j].score}`);
                                    answered = true;
                                    allowed = true;

                                }
                            });

                            collector.on('end', collected => {
                                console.log(`Collected ${collected.size} items`);
                                // while(collected.size < 1);

                            });

                            console.log("One turn ended");

    
                allow = false;
    

            
        }


        async function test(){ 

            let filter = m => m.author.id === message.author.id
       
                    message.channel.send(`Are you sure to delete all data? \`YES\` / \`NO\``).then(() => {
                     message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                        errors: ['time']
                        })
                .then(message => {
                message = message.first()
                console.log(message);
                if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
                    message.channel.send(`Deleted`)
                } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
                    message.channel.send(`Terminated`)
                } else {
                    message.channel.send(`Terminated: Invalid Response`)
                }
                })
                .catch(collected => {
                    message.channel.send('Timeout');
                });
                })


        }


    }


});