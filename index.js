const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
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

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(TOKEN)
