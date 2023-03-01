# Chatbot-parse-rozetka
This is a Telegram bot that notifies about a change in the price of a certain product on the Rozetka platform

# Installation

## Windows
* [`Download Node JS`](https://nodejs.org/en/download/)
* [`Download Git`](https://git-scm.com/download/win)


## Cloning this repo
```cmd
> git clone https://github.com/Eskotik/chatbot-parse-rozetka.git
> cd chatbot-parse-rozetka
```

## Install the package
```cmd
> npm i
```

## Edit config file
Edit the required value in `,env`. You can get bot token `Api_Token` at [`@BotFather`](http://t.me/BotFather). In the `pass` field you need to enter the password from the database server, in the `port` field enter the port of your database, and in the `database` field the name of the database
```json
{
    "Api_Token": "secret"
    "pass": "your_password"
    "port": "your_port"
    "database": "database_name"
}
```

## Run the bot
```cmd
> npm run dev
```

