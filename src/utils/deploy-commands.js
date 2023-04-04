const { REST, Routes } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')

require('dotenv').config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

const botCommands = []

const commandsPath = path.join(__dirname, '../commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const botCommand = require(`../commands/${file}`)
  botCommands.push(botCommand.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log(
      `Deploying a list containing ${botCommands.length} SlashCommands...`
    )
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: botCommands }
    )
    console.log(
      `The current SlashCommands list now contains ${data.length} commands.`
    )
  } catch (error) {
    console.error(error)
  }
})()
