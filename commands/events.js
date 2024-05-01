const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const listaEventos = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('events')
    .setDescription('Registra, lista e remove eventos')
    .addSubcommand(subcommand =>
      subcommand
        .setName('register')
        .setDescription('Registra um novo evento')
        .addStringOption(option =>
          option.setName('local')
            .setDescription('Local do evento')
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('data')
            .setDescription('Data do evento')
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('link')
            .setDescription('link do evento (opcional)')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('Lista todos os eventos registrados')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove um evento da lista')
        .addIntegerOption(option =>
          option.setName('indice')
            .setDescription('Índice do evento a ser removido')
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    try {
      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
        case 'register':
          const local = interaction.options.getString('local');
          const data = interaction.options.getString('data');
          const link = interaction.options.getString('link');

          // Armazena o evento na lista
          listaEventos.push({ local, data, link });

          await interaction.reply({
            content: `Evento registrado com sucesso!\nLocal: ${local}\nData: ${data}\nLink: ${link}`,
            ephemeral: true // Define a resposta como efêmera
          });
          break;

        case 'list':
          if (listaEventos.length === 0) {
            await interaction.reply('Não há eventos registrados');
          } else {
            let mensagem = "Essa é sua lista de eventos:\n";

            listaEventos.forEach((evento, index) => {
              mensagem += `${index + 1}. Local: ${evento.local}, Data: ${evento.data}, Link: ${evento.link}\n`;
            });

            const eventsEmbed = new EmbedBuilder()
              .setTitle('📅 Eventos Registrados 📅')
              .setColor(0x4682B4)
              .setDescription(mensagem);

            await interaction.reply({ embeds: [eventsEmbed] });
          }
          break;

        case 'remove':
          const indice = interaction.options.getInteger('indice');
          if (indice < 1 || indice > listaEventos.length) {
            await interaction.reply('Índice inválido');
          } else {
            const eventoRemovido = listaEventos.splice(indice - 1, 1)[0];
            await interaction.reply({
              content: `Evento removido com sucesso!\nLocal: ${eventoRemovido.local}\nData: ${eventoRemovido.data}\nLink: ${eventoRemovido.link}`,
              ephemeral: true // Define a resposta como efêmera
            });
          }
          break;

        default:
          await interaction.reply('Subcomando inválido');
      }
    } catch (error) {
      console.error('Erro ao responder à interação:', error);
    }
  }
};
