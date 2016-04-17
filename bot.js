var Botkit = require('botkit')
var fetch = require('node-fetch')

if (!process.env.token) {
  console.log('Error: Specify token in environment')
  process.exit(1)
}

const controller = Botkit.slackbot({
  debug: false
})

const bot = controller.spawn({
  token: process.env.token
})

const INTERACTION = {
  direct: ['direct_message', 'direct_mention', 'mention'],
  indirect: ['ambient']
}

const PATTERN = {
  question: ['who, what, when, where, how, will']
}

const RESPONSES = {
  welcome: 'Hello there! I\'m BrexitBot :robot_face: - get my attention by typing `@brexitbot` followed by your question or comment about :flag-gb: in the :flag-eu:'
}

bot.startRTM( (err, bot, payload) => {

  if (err) throw new Error('Could not connect to Slack')

})

controller.on('channel_joined', (bot, message) => {

  bot.reply(message, RESPONSES.welcome)

})

// TODO - NLP middleware -> https://github.com/howdyai/botkit#receive-middleware | https://github.com/howdyai/botkit#hear-middleware

// TODO - tracking middleware -> https://github.com/howdyai/botkit#send-middleware

controller.hears('(.*)', INTERACTION.direct, (bot, message) => {

  bot.reply(message, 'direct interaction')

})

// TODO - conversation interface to guide users who dont have a specific question to ask but just want facts about topics -> https://github.com/howdyai/botkit#start-a-conversation
// eg. 1) what do you want to know more about? 2) more about this or another topic etc etc
