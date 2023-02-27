const start = require("./utils/mainFunctions/start");
const { bot } = require("./config/bot");
const action = require("./utils/mainFunctions/action")
bot.setMyCommands([{ command: "/start", description: "Привітання" }]);

start();
action();
