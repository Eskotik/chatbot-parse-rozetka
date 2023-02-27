const start = require("./utils/start");
const { bot } = require("./config/bot");
const action = require("./utils/action")
bot.setMyCommands([{ command: "/start", description: "Привітання" }]);

start();
action();
