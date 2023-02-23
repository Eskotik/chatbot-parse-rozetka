const start = require("./helpers/helper2");
const { bot } = require("./config/bot");
const action = require("./helpers/helper3")
bot.setMyCommands([{ command: "/start", description: "Привітання" }]);

start();
action();
