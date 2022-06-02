const TelegramApi = require("node-telegram-bot-api")
const {gameOptions, againOptions} = require("./options.js")

const token ="5366739730:AAGzudv2GYpwZQjI7O3lVQvAomT_-JVETFY"

const bot = new TelegramApi(token, {polling: true})

const chats = {}


bot.setMyCommands([
    {command:"/start", description:"Начальное приветствие"},
    {command:"/info", description:"Информация о пользователе"},
    {command:"/game", description:"Игра Угадай цифру"}
])

const startGame = async(chatId) => {
    await bot.sendMessage(chatId, "Я загадал число от 0 до 9, попробуй угадать!")
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, "Угадывай!", gameOptions)
}

const start= () => {

    bot.on("message", async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === "/start"){
            await bot.sendSticker(chatId, "https://cdn.tlgrm.app/stickers/7e8/aa6/7e8aa67b-ad91-4d61-8f62-301bde115989/256/1.webp")
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Arealtem`)
        }
        if(text === "/info"){
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
        }
        if(text === "/game"){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй еще раз")
    })
    bot.on("callback_query", async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id;
        if(data === "/again"){
            return startGame(chatId)
        }
        if(data === chats[chatId]){
            return await bot.sendMessage(chatId, `Поздравляю, ты угадал! Цифра: ${chats[chatId]}`, againOptions)
        }else{
            return await bot.sendMessage(chatId, `К сожалению, ты не угадал, попробуй еще раз! Бот загадал ${chats[chatId]}`,againOptions)
        }
        
    })
}

start()