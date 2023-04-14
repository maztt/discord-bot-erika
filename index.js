const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages
  ]
})
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'src/commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.error(
      `The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

const eventsPath = path.join(__dirname, 'src/events')
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

client.login(TOKEN)
