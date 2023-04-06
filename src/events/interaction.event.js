const { Client, GatewayIntentBits, Collection, Events } = require('discord.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.cooldowns = new Collection()

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }
    const { cooldowns } = client;
    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection())
    }
    const now = Date.now()
    const timestamps = cooldowns.get(command.data.name)
    const defaultCooldownDuration = 3
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
      if (now < expirationTime) {
        return interaction.reply({ content: `Eita, calma aí! Espera três segundinhos daí tenta o \`${command.data.name}\` de novo.`, ephemeral: true });
      }
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(`There was an error executing: ${interaction.commandName}`)
      console.error(error)
    }
  }
}
