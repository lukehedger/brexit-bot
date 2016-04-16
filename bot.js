var Botkit = require('botkit')
var fetch = require('node-fetch')

if (!process.env.token) {
  console.log('Error: Specify token in environment')
  process.exit(1)
}

const config = {

}

const controller = Botkit.slackbot({
  debug: false
})

const bot = controller.spawn({
  token: process.env.token
})

bot.startRTM( (err, bot, payload) => {

  if (err) throw new Error('Could not connect to Slack')

})

controller.hears('brexit', ['direct_message','direct_mention','mention'], (bot, message) => {

  bot.reply(message, 'Brexit you say?')

})
