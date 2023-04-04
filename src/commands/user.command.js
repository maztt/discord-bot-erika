const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user.'),
  async execute(interaction) {
    await interaction.reply(
      `I'm ${interaction.user.username} and I've been here since ${interaction.member.joinedAt}.`
    )
  }
}
