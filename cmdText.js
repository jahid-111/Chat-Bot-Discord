const axios = require("axios");
require("dotenv").config();
const cohere = require("cohere-ai");
// cohere.init(process.env.COHERE_API_KEY);

function handleCreateMessage(message) {
  const url = message.content.split("create")[1].trim();
  return message.reply({
    content: `Generate Short Id For ➡️ ${url}`,
  });
}

function handleHelpMessage(message) {
  return message.reply({
    content:
      "🤔 Help: Use 'create <url>' to generate a short URL, 'love <name>' to express love, or 'chatgpt <question>' to ask ChatGPT.",
  });
}

function handleLoveMessage(message) {
  const url = message.content.split("love")[1].trim();
  return message.reply({
    content: `I ${url} You 🥹`,
  });
}

function handleDefaultMessage(message) {
  return message.reply({
    content: "hi from Bot Jahid , How  Can i Assist toady?",
  });
}

async function handleChatGPTMessage(message) {
  const question = message.content.split("chatgpt")[1]?.trim();

  if (!question) {
    return message.reply({ content: "Please provide a question for Cohere!" });
  }

  try {
    console.log("Sending request to Cohere with question:", question);

    // Make a POST request to the Cohere API
    const response = await axios.post(
      "https://api.cohere.ai/generate",
      {
        model: "command-xlarge-nightly", // Choose the model you want to use
        prompt: question, // The user's question
        max_tokens: 50, // Adjust for response length
        temperature: 0.7, // Adjust for randomness in response
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`, // Bearer token for authorization
          "Content-Type": "application/json", // Set content type to JSON
        },
      }
    );

    // Access the generated response from the API
    const cohereResponse = response.data.generations;
    message.reply({ content: cohereResponse });
    const generatedText = response.data.data.text;
    const valueAfterEquals = generatedText.split("=").pop().trim();
    console.log("🔴🔴🔴🔴", valueAfterEquals); // Log the full response for debugging
  } catch (error) {
    console.error("Error communicating with Cohere API:", error);
    message.reply({ content: "Sorry, I couldn't process your request." });
  }
}

// how to interacct cchatgpt
module.exports = {
  handleCreateMessage,
  handleLoveMessage,
  handleDefaultMessage,
  handleHelpMessage,
  handleChatGPTMessage,
};
