require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const {
  handleCreateMessage,
  handleLoveMessage,
  handleDefaultMessage,
  handleHelpMessage,
  handleChatGPTMessage,
} = require("./cmdText");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const command = message.content.split(" ")[0];

  switch (command) {
    case "help":
      handleHelpMessage(message);
      break;
    case "create":
      handleCreateMessage(message);
      break;
    case "love":
      handleLoveMessage(message);
      break;
    case "chatgpt":
      handleChatGPTMessage(message);
      break;
    default:
      handleDefaultMessage(message);
      break;
  }
});

client.on("interactionCreate", (interaction) => {
  if (message.author.bot) return;
  interaction.reply({
    content: "hi from Bot",
  });
});

client.login(process.env.DISCORD_TOKEN);
