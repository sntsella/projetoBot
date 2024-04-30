const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("news")
    .setDescription("Mostra as últimas notícias tecnológicas"),

  async execute(interaction) {
    try {
      const apiKey = "902a4ca2791a4e039af41271a49e6ed5"; //chave de API do NewsAPI

      // Faz uma solicitação à API de notícias para obter as últimas notícias tecnológicas
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${apiKey}`);

      // Processa os dados da resposta para obter os títulos e URLs das notícias
      const articles = response.data.articles;

      // Limita o número de notícias a serem exibidas por mensagem
      const maxNewsPerMessage = 3;
      let newsMessage = '';

      // Constrói uma lista de notícias limitada
      for (let i = 0; i < Math.min(maxNewsPerMessage, articles.length); i++) {
        newsMessage += `- [${articles[i].title}](${articles[i].url})\n`;
      }

      // Envia a lista de notícias como uma única mensagem
      await interaction.reply(`Últimas ${maxNewsPerMessage} notícias tecnológicas:\n${newsMessage}`);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      await interaction.reply("Desculpe, não foi possível buscar as notícias neste momento.");
    }
  }
};
