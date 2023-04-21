const { Events } = require('discord.js')

module.exports = {
  name: Events.GuildMemberAdd,
  once: true,
  async execute(newGuildMember) {
    try {
      const dmChannel = await newGuildMember.createDM()
      await dmChannel.send(`
        Que bom te ter aqui, ${newGuildMember.user.username}! 
        Antes de mais nada, caso queira fazer um breve onboarding pelo SouJunior, basta me enviar **/onboarding**  reagir no    :roller_coaster:    abaixo!
      `)
    } catch (err) {
      console.error(
        `An error occurred while trying to send a direct message to ${newGuildMember.user.tag}:`,
        err
      )
    }
  }
}
