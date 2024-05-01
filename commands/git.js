// Comando para listar os comandos mais utilizados no git e suas funcionalidades

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

// embed que mostra comandos do git
const gitEmbed = new EmbedBuilder()
	.setColor(0x4682B4)
	.setTitle(' 💻 Comandos do Git 💻')
	.setDescription(' - Comandos mais utilizados do git e suas funcionalidades')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
    { name: '$ git init [nome-do-projeto]', value: 'Cria um novo repositório local com um nome especificado', inline: true },
		{ name: '$ git clone', value: 'Clona um repositório do Github', inline: true },
		{ name: '$ git stash', value: 'Armazena temporariamente todos os arquivos monitorados modificados', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '$ git status', value: 'Verifica os status atual do repositório Git. Mostra informações sobre os arquivos que foram modificados e adicionados.', inline: true },
		{ name: '$ git add .', value: 'Adiciona todas as alterações realizadas', inline: true },
		{ name: '$ git commit -m "[mensagem]"', value: 'Confirma as alterações do $ git add ., seguido de uma mensagem', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '$ git branch', value: 'Lista todos os branches locais no repositório atual', inline: true },
		{ name: '$ git branch [nome-branch]', value: 'Cria uma nova branch', inline: true },
		{ name: '$ git switch -c [nome-branch]', value: 'Muda para a branch especificada e atualiza o diretório de trabalho', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '$ git merge [nome-branch]', value: 'Combina o histórico da branch especificada a branch atual', inline: true },
		{ name: '$ git push [alias] [branch]', value: 'Envia todos os commits do branch local para o GitHub', inline: true },
		{ name: '$ git pull', value: 'Baixa o histórico e incorpora as mudanças', inline: true },
	)
	.setImage('https://cdn.discordapp.com/attachments/1234836593341370399/1235282769026879609/image.png?ex=6633ce3a&is=66327cba&hm=29544fcf567878d2776f619a88d970c108ab40714fdf97c8d11a2f6ed120cd4d&')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("git")
    .setDescription("Relembrar os comandos do Git"),

  async execute(interaction){
    await interaction.reply( {embeds: [gitEmbed] } )
  }
}
