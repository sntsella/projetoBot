const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env;

const fs = require("fs");
const path = require("path");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// importando todos os arquivos .js dentro da pasta commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`O comando em ${filePath} está com 'data' ou 'execute' ausente`);
  }
}

// Comando de inicialização do bot
client.once(Events.ClientReady, readyClient => {
  console.log(`Pronto! Login realizado como ${readyClient.user.tag}`);
  // Status de atividade do bot
  client.user.setActivity("📚 Bora estudar?");
});

// Login no discord com o token do bot
client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction =>{
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName)
  if(!command){
    console.error(`Comando ausente`)
    return
  }

  try{
    await command.execute(interaction)
  }catch(error){
    console.error(error)
    await interaction.reply('Erro ao executar o comando')
  }
})