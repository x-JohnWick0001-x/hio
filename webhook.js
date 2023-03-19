const { Webhook, MessageBuilder } = require("discord-webhook-node");
const fetch = require("isomorphic-fetch");

const botToken = process.env.bot_token;

async function sendWebhook(channelID, embed) {
  const createUrl = `https://discord.com/api/v10/channels/${channelID}/webhooks`;
  try {
    const createResponse = await fetch(createUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bot ${botToken}` },
      body: JSON.stringify({ name: "Logger Webhook" }),
    });
    const createData = await createResponse.json();
    const webhookUrl = `https://discord.com/api/v10/webhooks/${createData.id}/${createData.token}`;
    await new Webhook(webhookUrl).send(embed);
    await fetch(`https://discord.com/api/v10/webhooks/${createData.id}/${createData.token}`, {
      method: "DELETE",
      headers: { Authorization: `Bot ${botToken}` },
    });
  } catch (error) {
    console.error(`Error sending webhook: ${error}`);
    throw error;
  }
}

module.exports = { sendWebhook };
