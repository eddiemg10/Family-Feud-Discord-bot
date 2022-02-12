const Command = require("../structures/Command.js");

const { MessageEmbed } = require("discord.js");

const questions = require("../question_database/6answers.json");

module.exports = new Command({
  name: "feud",
  description: "Begins Family Feud session",
  async run(message, args, client) {
    let players = [];
    let round = 1;
    let running = false;
    players.push(message.author);
    players[players.length - 1].score = 0;

    var quiz = [];

    for (let i = 0; i < questions.length; i++) {
      quiz.push({
        question: questions[i].Question,
        answers: [
          { answer: questions[i].Answer1, points: questions[i].P1 },
          { answer: questions[i].Answer2, points: questions[i].P2 },
          { answer: questions[i].Answer3, points: questions[i].P3 },
          { answer: questions[i].Answer4, points: questions[i].P4 },
          { answer: questions[i].Answer5, points: questions[i].P5 },
          { answer: questions[i].Answer6, points: questions[i].P6 },
        ],
        correct: 0,
      });
    }

    const initialEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("FAMILY FEUD")
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(
        `A game of family feud has been started by ${message.author.username}\n\n`
      )
      .setThumbnail(
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFamily_Feud&psig=AOvVaw2sbotj8qxlHhwkEJO_ogLi&ust=1644235122122000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDvuKyD6_UCFQAAAAAdAAAAABAD"
      )
      .addFields(
        {
          name: "How to join",
          value:
            "Send **join** to join the game.\nOnce ready, the game initiator should send **start** ",
        },
        { name: "\u200B", value: "\u200B" }
      )
      .setTimestamp();

    //Send reactions to Join Teams
    message.channel.send({ embeds: [initialEmbed] }).then((embedMessage) => {
      // embedMessage.react("🅰️");
      // embedMessage.react("🅱️");
    });

    //Collector to initialize the game

    const filter = (msg) => {
      if (msg.content.toLowerCase() === "start") {
        if (msg.author.id === message.author.id) {
          msg.reply(`<@${message.author.id}> has started the game`);

          return true;
        } else {
          msg.reply(`Only <@${message.author.id}> can start the game`);
          return false;
        }
      }

      if (msg.content.toLowerCase() === "join") {
        if (players.includes(msg.author)) {
          msg.reply(`You are already playing`);
          return true;
        } else {
          players.push(msg.author);
          players[players.length - 1].score = 0;
          msg.reply(`<@${msg.author.id}> has joined the game`);
          return false;
        }
      }
    };

    const collector = message.channel.createMessageCollector({ filter });

    collector.on("collect", (msg) => {
      console.log(`Collected ${msg.content}`);
      if (msg.content.toLowerCase() === "start") {
        startGame();
      }
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });

    async function startGame() {
      for (let i = 0; i < 1; i++) {
        let rand = Math.floor(Math.random() * 1064);
        // while (quiz[rand].question === undefined) {
        //   rand++;
        // }
        let q = quiz[rand];
        let guessed = [];

        if (guessed.length < 5) {
          let max = players.length * 2;
          runGame(0, q, guessed, 0, max);
          // startGame();
        } else {
          endRound(q);
          // startGame();
        }
      }
    }

    function sendQuestion(quest, guessed) {
      let emojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

      let q =
        " ```fix\n" +
        "Round " +
        round +
        "\n\nQUESTION: " +
        quest.question +
        "\n\n";
      for (let i = 0; i < quest.answers.length; i++) {
        if (guessed.includes(i)) {
          q += i + 1 + ". " + quest.answers[i].answer + " ";

          let digits = quest.answers[i].points.toString().split("");
          let emojiScore = digits.map(Number);
          for (let j = 0; j < emojiScore.length; j++) {
            q += emojis[emojiScore[j]];
          }
          q += "\n";
        } else {
          q += i + 1 + ". ⬜⬜⬜⬜⬜ \n";
        }
      }
      q += "\n ```";

      message.channel.send(q);
    }
    function runGame(player, q, guessed, turns, maxturns) {
      sendQuestion(q, guessed);
      message.channel.send(`<@${players[player].id}> turn`);

      const filter = (msg) => msg.author.id === players[player].id;

      const collector = message.channel.createMessageCollector({
        filter,
        max: 1,
        time: 120000,
        errors: ["time"],
      });

      collector.on("collect", (msg) => {
        console.log(`Collected ${msg.content}`);
        let guess = msg.content.toLowerCase();

        const ans = q.answers;
        for (let k = 0; k < ans.length; k++) {
          if (
            ans[k].answer.toLowerCase().includes(guess) &&
            !guessed.includes(k)
          ) {
            players[player].score += ans[k].points;
            q.correct += 1;
            guessed.push(k);
            turns++;

            msg.react("✅");
            msg.reply(`Points: ${players[player].score}`);
            return collector.stop();
          }
          if (k === ans.length - 1) {
            msg.react("❌");
            msg.reply(`Points: ${players[player].score}`);
            turns++;
            return collector.stop();
          }
        }
      });

      collector.on("end", (collected) => {
        console.log(`Collected ${collected.size} items`);
        if (turns < maxturns && guessed.length <= 6) {
          player++;
          if (player === players.length) {
            player = 0;
          }
          runGame(player, q, guessed, turns, maxturns);
        } else {
          endRound(q);
        }
      });
    }

    function endRound(q) {
      round++;
      collector.stop();
      // let answers = "\n> ** 1.  Toys `23`**\n\n > ** 2.  Men** \n\n > ** 3.  Wow**";
      // let results = ` 1. <@${players[0].id}> \n\n 2.  <@${players[0].id}>\n\n 3.  <@${players[0].id}>`;

      let answers = "";
      let results = "";
      for (let i = 0; i < q.answers.length; i++) {
        answers +=
          "> ** " +
          (i + 1) +
          ".  " +
          q.answers[i].answer +
          " `" +
          q.answers[i].points +
          "`**\n\n";
      }

      for (let j = 0; j < players.length; j++) {
        results += `${j + 1}. <@${players[j].id}> \`${players[j].score}\` \n\n`;
      }

      const initialEmbed = new MessageEmbed()
        .setColor("#B71BCF")
        .setTitle("ROUND ENDED")
        .setDescription(`**QUESTION**\n ${q.question}`)
        .setThumbnail(
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFamily_Feud&psig=AOvVaw2sbotj8qxlHhwkEJO_ogLi&ust=1644235122122000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDvuKyD6_UCFQAAAAAdAAAAABAD"
        )
        .addFields(
          {
            name: "SURVEY ANSWERS",
            value: answers,
          },
          { name: "\u200B", value: "\u200B" },
          {
            name: "LEADERBOARD",
            value: results,
          }
          // { name: "\u200B", value: "\u200B" }
        )
        .setTimestamp();

      const filter = (msg) => {
        if (msg.author.id === message.author.id) {
          return true;
        } else {
          if (msg.content.toLowerCase() === "continue") {
            msg.reply(`Only <@${message.author.id}> can continue the game`);
          }
          return false;
        }
      };

      message.channel.send({ embeds: [initialEmbed] });

      const finalCollector = message.channel.createMessageCollector({
        filter,
        max: 1,
        time: 240000,
        errors: ["time"],
      });

      finalCollector.on("collect", (msg) => {
        collector.stop();
      });

      finalCollector.on("end", (collected) => {
        if (collected.first().content.toLowerCase() === "continue") {
          collected
            .first()
            .reply(`<@${message.author.id}> has started a new round`);
          startGame();
        } else {
          reset();
        }
      });
    }

    function reset() {
      for (let i = 0; i < players.length; i++) {
        players[i].score = 0;
      }
      round = 1;
    }
  },
});
