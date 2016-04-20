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
  question: ['who, what, when, where, how, will'],
  greeting: ['hello', 'hey', 'hi', 'yo', 'hiya', 'oi']
}

const RESPONSE = {
  welcome: 'Hello there! I\'m BrexitBot :robot_face: - get my attention by typing `@brexitbot` followed by your question or comment about :flag-gb: in the :flag-eu:',
  greeting: ['Hello there!', 'Yo!', 'Bonjour!', 'Hola!'],
  more: 'Want to find out more about an EU topic?',
  topics: 'What do you want to hear about? Petrol, groceries, transport, jobs or beer?'
}

bot.startRTM( (err, bot, payload) => {

  if (err) throw new Error('Could not connect to Slack')

})

controller.on('channel_joined', (bot, message) => {

  bot.reply(message, RESPONSE.welcome)

})

controller.hears(PATTERN.greeting, INTERACTION.direct, (bot, message) => {

  giveOptions = (response, convo) => {

    convo.ask(RESPONSE.topics, (response, convo) => {
      hearChoice(response, convo)
      convo.next()
    })

  }

  hearChoice = (response, convo) => {

    convo.say('Alrighty, let me see what I can do')
    convo.next()

  }

  bot.startConversation(message, (err, convo) => {

    // TODO - choose random greeting using ramda
    convo.say(RESPONSE.greeting[0])

    // START
    convo.ask(RESPONSE.more, [
      {
        pattern: bot.utterances.yes,
        callback: (response, convo) => {
          convo.say('Awesome')
          giveOptions(response, convo)
          convo.next()

        }
      },
      {
        pattern: bot.utterances.no,
        callback: (response, convo) => {
          convo.say('Maybe see you later then!')
          convo.next()
        }
      },
      {
        default: true,
        callback: (response, convo) => {
          convo.repeat()
          convo.next()
        }
      }
    ])

    // END
    convo.on('end', (convo) => {

      if (convo.status == 'completed') {

        var topic = convo.extractResponse(RESPONSE.topics)

        // TODO -> api(topic)

      }

    })

  })

})

// TODO - NLP middleware -> https://github.com/howdyai/botkit#receive-middleware | https://github.com/howdyai/botkit#hear-middleware

// TODO - tracking middleware -> https://github.com/howdyai/botkit#send-middleware

controller.hears('(.*)', INTERACTION.direct, (bot, message) => {

  bot.reply(message, 'direct interaction')

})
