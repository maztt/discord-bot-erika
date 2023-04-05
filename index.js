const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
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
    console.error(`The command at ${filePath} is missing a required "data" or "execute" property.`)
  }
}

client.login(TOKEN)
