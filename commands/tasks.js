const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const listaTarefas = [];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tasks')
    .setDescription('Lista de tarefas')
    .addSubcommand(subcommand => 
      subcommand
        .setName('add')
        .setDescription('Adiciona uma nova tarefa à lista')
        .addStringOption(option => 
          option.setName('tarefa')
          .setDescription('Tarefa a ser adicionada')
          .setRequired(true)
        )
    )

    .addSubcommand(subcommand => 
      subcommand
        .setName('remove')
        .setDescription('Remove uma tarefa da lista')
        .addIntegerOption(option => 
          option.setName('índice')
          .setDescription('Índice da tarefa a ser removida')
          .setRequired(true)
        )
    )

    .addSubcommand(subcommand => 
      subcommand
        .setName('listar')
        .setDescription('lista todas as tarefas')
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch(subcommand){
      case 'add':
        const tarefa = interaction.options.getString('tarefa');
        listaTarefas.push(tarefa)
        await interaction.reply(`Tarefa ${tarefa} adicionada com sucesso`)
        break;

      case 'remove':
        const indice = interaction.options.getInteger('índice')
        if(indice < 1 || indice > listaTarefas.length){
          await interaction.reply('Índice inválido')
        } else{
          const tarefaRemovida = listaTarefas.splice(indice - 1, 1)[0]
          await interaction.reply(`Tarefa ${tarefaRemovida} removida com sucesso`)
        }
        break;

       case 'listar':        
        if(listaTarefas.length === 0){
          await interaction.reply('Não há tarefas')
        } else{
          let mensagem = "Essa é sua lista de tarefas: \n"
          listaTarefas.forEach((tarefa, index) => {
            mensagem += `${index + 1}. ${tarefa}\n`;
          });

          const tasksEmbed = new EmbedBuilder()
            .setTitle('📝 Lista de Tarefas 📝')
            .setColor(0x4682B4)
            .setDescription(mensagem)
            .setImage('https://cdn.discordapp.com/attachments/1234836593341370399/1235282141756260455/image.png?ex=6633cda5&is=66327c25&hm=92c6e38f6f774ee9fc0ffe025e557b7e9db858c43ed8cd601df1ee5620e7a5cc&')

          await interaction.reply({ embeds: [tasksEmbed] });
        }
        break
      default:
        await interaction.reply('Subcomando inválido')
    }
  }
  
};