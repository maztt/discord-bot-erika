const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('canais')
    .setDescription(
      'Sentiu dúvida sobre como funcionam nossos canais do Discord?'
    ),
  async execute(interaction) {
    await interaction.reply(
      `
      Então se liga só no nome de cada um dos canais e os seus significados:

      :satellite:  | ** CANAIS DE AVISOS **:

        #comunicados — Fique por dentro dos últimos avisos envolvendo todo o SouJunior e suas ações!
        #dúvidas-servidor — Ficou em dúvida daquela coisa pontual e que eu não soube te responder? Traz aqui!
        #sugestões-servidor — Surgiu aquela ideia bacana pra gente trazer pra cá? Solta o verbo!
        #denúncias — Percebeu algum comportamento impróprio? Reporte para a nossa equipe!

      *-*
        
      :tools:  | ** CANAIS DE PROJETOS **

        - Todos os canais com :hammer_and_wrench: representam os canais dos projetos!
    
      *-*

      :loud_sound:  | ** CANAIS DE VOZ  **

        - Você pode sempre acessar esses canais, somente tome cuidado com o microfone!
        - Lab | Palco 01 ao 05 — canais destinados aos eventos e workshops que rolam na comunidade.
        - Lab | Voz     01 ao 05 — canais destinados às reuniões dos projetos em andamento.

      *-*

      :handshake:  | ** LINKS ÚTEIS **:

        #link-de-convite — Que tal convidar aquela pessoa que precisa se envolver com o Lab?
        #wiki — Que tal aquele super manualzão sobre tudo o que envolve a marca do SouJunior?

      *-*

      :speech_balloon:  | ** INTERAÇÃO E DÚVIDAS **

        *(chat)*     #global — Este é o nosso grande espaço de convivência!
        *(chat)*     #apresente-se — Sinta-se convidado para se apresentar pra comunidade e contar um pouco sobre você!
        *(fórum)*  #mentoria — Na busca por uma mentoria em tecnologias e metodologias de desenvolvimento?
        *(fórum)*  #stackoverflow — Na dúvida com relação à alguma coisa, seja esta carreira ou tecnologia?

      `
    )
  }
}
