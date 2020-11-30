const TelegramBot = require('node-telegram-bot-api')
const Chat = require('./app/models/Chat')

const token = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(token, { polling: false })

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id

  const [exists] = await Chat.find()

  if (exists) {
    await Chat.findByIdAndUpdate(exists._id, { chatId })
  } else {
    await Chat.create({ chatId })
  }

  bot.sendMessage(chatId, 'Cadastrado no sistema!')
})

module.exports = bot
