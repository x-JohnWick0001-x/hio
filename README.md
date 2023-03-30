<p align="center">
  <img src="https://keepler.io/wp-content/uploads/2022/10/keepler-blockchain-cloud-convergence.jpg" alt="IP Grabber">
  <br>
  <em>Inspiration from <a href="https://github.com/baum1810/ipgrabber">ipgrabber</a> by <a href="https://github.com/baum1810">baum1810</a></em></br>Made with ❤️ by <a href="https://github.com/x-JohnWick0001-x">John Wick</a>.<br>
  <a href="https://discord.com/users/817837528660705362">Add me on Discord</a> - JohnWick#0001. Happy tracking!
</p>

<h1 align="center">📨 IP Logger with Discord Webhook</h1>

<h3 align="center"><b><strong>Tired of 429?:</strong></b></h3>
<p align="justify">
  This IP logger uses Discord webhooks to send data to a specified Discord channel. Instead of using a persistent webhook, the application creates a new webhook, sends the data, and then deletes it for each request. This approach is adopted to bypass Discord's rate limiting, which restricts the number of requests a client can make within a certain period. Rate limiting prevents spamming or overloading Discord's API. Thanks to our create-send-delete process, you can enjoy smooth and uninterrupted IP logging without worrying about hitting rate limits! 🚀
</p>
  
<h2 align="center">💬 Frequently Asked Questions (FAQs)</h2>

<details> 
<summary>Click to expand</summary>
 
**Q: Can I customize the appearance and information displayed on the page?**

A: Yes, you can customize the appearance of the page by modifying the `htmlContent` variable in the `app.js` file. Feel free to change the text, styles, or layout to fit your preferences. Moreover, you can change the information captured and sent by the webhook by modifying the `embed` object in the `app.js` file.

**Q: How can I ensure the privacy and security of my captured data?**
 
A: To ensure the privacy and security of your captured data, make sure to protect your environment variables, such as Discord bot token, channel ID, and IPinfo.io API token, by storing them securely. Additionally, you can implement user authentication to restrict access to the logged data, ensuring that only authorized users can view the information.

**Q: Can I use this IP Logger in conjunction with other services, such as databases or analytics tools?**

A: Yes, you can extend the functionality of this IP Logger to work with other services like databases or analytics tools. For example, you can store the logged data in a database like MongoDB or PostgreSQL for long-term storage and analysis, or integrate with an analytics service for real-time data visualization.

**Q: What browsers and devices does this IP Logger support?**

A: The IP Logger should work across most modern browsers and devices, including mobile phones. However, user agent detection might be less accurate or unsupported for some outdated browsers or non-standard devices.

**Q: Can I track multiple endpoints with this IP Logger?**

A: Yes, you can track multiple endpoints by creating additional routes and modifying the Express application accordingly. You can also customize the data captured and the webhook messages for each endpoint to suit your needs.

</details>

<h2 align="center">Table of Contents</h2>

- [🚀 Deployment](#-deployment)
- [🔒 Environment Variables](#-environment-variables)
- [⚙️ Customization](#️-customization)
- [🛠️ Debugging and Logging](#️-debugging-and-logging)
- [💡 Ideas for Extending the Project](#-ideas-for-extending-the-project)
</br>

<h2 align="center">🚀 Deployment</h2>

1. Click the `Deploy` button below to get started. All the work has been done for you! However, if you want to avoid an unnecessary headache, continue reading into the next instructions!

2. During the deployment setup process, you'll need to add the required environment variables as explained in the [Environment Variables](#-environment-variables) section.
**Note**: See Enviornmental Variables in the next section for clarity!

3. After adding the environment variables, click "Deploy" to deploy your project.
<p align="center">
  <a href="https://vercel.com/import/project?template=https://github.com/JohnWick000101/ipgrabber_js">
    <img src="https://vercel.com/button" alt="Deploy with Vercel">
    </p>
<hr style="border: 1px solid #ccc; margin: 1em 0;">
 <p align="center">
  <details>
<summary>Click to see pictures and clear instructions if you don't know what you are doing!</summary>
<p class="minor-space"> 1. Add a name for a repo if you didn't go the easy route and clone it first!</p>
<p class="minor-space"> 2. Go to settings of failed deploy from dashboard.</p>
<p class="minor-space"> 3. Add the environmental variables - [channel_id, bot_token, ip_token]</p>
<p class="minor-space"> 4. Redeploy the application from the failed deployment screen.</p>
 </p>  
   <p align="center">
  <div style="display: flex; justify-content: center; align-items: center; gap: 1em; flex-wrap: wrap;">
     <p align="center">
  <span style="display: inline-block; text-align: center;">
    <a href="https://i.imgur.com/kdVRU1x.png" target="_blank"><img src="https://i.imgur.com/kdVRU1x.png" alt="Step 1" style="width: 150px;"></a>
  </span>
  <span style="display: inline-block; text-align: center;">
    <a href="https://i.imgur.com/jTN9C7n.png" target="_blank"><img src="https://i.imgur.com/jTN9C7n.png" alt="Step 2" style="width: 150px;"></a>
  </span>
  <span style="display: inline-block; text-align: center;">
    <a href="https://i.imgur.com/IOd6xrO.png" target="_blank"><img src="https://i.imgur.com/IOd6xrO.png" alt="Step 3" style="width: 150px;"></a>
  </span>
  <span style="display: inline-block; text-align: center;">
    <a href="https://i.imgur.com/ZSwQ1af.png" target="_blank"><img src="https://i.imgur.com/ZSwQ1af.png" alt="Step 4" style="width: 150px;"></a>
  </span>
  </p>
    </p>
</div>
  </details>
<h2 align="center">🔒 Environment Variables</h2>

<p align="justify">
Before deploying the application, you need to provide some environment variables. To do this, follow these steps during the deployment setup process shown in the GIF above:
</p>

1. Scroll down to the "Environment Variables" section.
2. Add the following variables:

- `channel_id`: Your Discord channel ID where the webhook should send messages.
- `bot_token`: Your Discord bot token for creating and managing webhooks.
- `ip_token`: Your IPinfo.io API token for fetching IP address information.
- `redirect_url`: The URL where users will be redirected at log completion.

<p align="justify">
By storing these variables in the Vercel dashboard, you prevent exposing sensitive information and make it easier to manage the variables across different environments (e.g., development, staging, and production).
</p>

<p align="justify">
When you update the values of the environment variables in the Vercel dashboard, they will automatically be applied to your application without the need to modify your code.
</p>

<p align="justify">
Read more about <a href="https://vercel.com/docs/environment-variables">Vercel's Environment Variables</a> for best practices and usage.
</p>
</br>
<h2 align="center">⚙️ Customization</h2>
<p align="center">
You can customize various aspects of your IP Logger to create a unique and personalized experience. 
  Here are some ideas:
</p>
<details>
<summary>Click to expand</summary>
  </br>
<p class="minor-space"> • Custom Bot Avatar

You can set a custom avatar for the bot in webhook messages by modifying the `app.js` file. Look for the `const embed = new MessageBuilder()` block and add the `.setAvatar()` method with the URL of your image. Here's an example:
```javascript
const embed = new MessageBuilder()
  ...
  .setTimestamp()
  .setAvatar('https://example.com/your-image.png'); // set to custom image url 
```
  
<p class="minor-space"> • <strong> Page Appearance</strong>: Modify the htmlContent variable in the app.js file to change the text, styles, or layout. You can use custom CSS or JavaScript to create unique animations or effects, adjust colors and fonts, or change the overall layout to fit your preferences.</p>
<p class="minor-space"> • <strong> Webhook Embed</strong>: Customize the data sent by the webhook by modifying the embed object in the app.js file. You can add, remove, or modify fields to change the information displayed, adjust the styling of the embed or create different visuals by using different colors, images, or icons.</p>
<p class="minor-space"> • <strong> Dynamic Content</strong>: Add dynamic content to your IP Logger by using JavaScript to generate random greetings, images, or messages, or by pulling content from external sources like APIs, databases, or other services. This can provide a more engaging experience for visitors and make your IP Logger stand out.</p>
<p class="minor-space"> • <strong> Responsive Design</strong>: Ensure that your IP Logger looks great on all devices by implementing a responsive design. You can use CSS media queries, flexbox, or CSS grid to create layouts that adapt to various screen sizes and orientations.</p>
<p class="minor-space"> • <strong> Additional User Data</strong>: You can extend the data captured by the IP Logger by adding support for more request headers, utilizing JavaScript to collect additional client-side data, or integrating with external APIs to gather more detailed information. This could include data such as browser language, screen resolution, or device type.</p>

  <p align="center">
 <strong>Testing, testing:</strong> Thoroughly test your customizations across different browsers and devices. This is the tedious part everyone loves but it is the only way to ensure that your IP Logger remains accessible and functional for everyone so you don't miss your VIP target (:
  </p>
    </details>
</br>
<h2 align="center">🛠️ Debugging and Logging</h2>

  <p align="justify">
  When adding new features or customizing the application, you might encounter issues or errors. To help with troubleshooting and debugging, you can enable logging in your Vercel application.
  </p>
  &nbsp;&nbsp;1. In your Vercel project dashboard, go to the <strong>Settings</strong> tab.
  <br>
  &nbsp;&nbsp;2. Navigate to the <strong>Environment Variables</strong> section.
  <br>
  &nbsp;&nbsp;3. Add a new environment variable with the key <code>LOG_LEVEL</code> and a value of <code>debug</code>. This will enable detailed logging in your application.
  <br><br>
  <p align="justify">
  After setting the <code>LOG_LEVEL</code> environment variable, redeploy your application for the changes to take effect.
  </p>
  <p align="justify">
    To view the logs, go to the <strong>Deployments</strong> tab in your project's Vercel dashboard, click on the desired deployment, and then click on the <strong>Functions</strong> tab. Here, you can select a function to view its logs.
  </p>
  <p align="justify">
  When you're finished debugging, you can remove or change the <code>LOG_LEVEL</code> environment variable to a lower verbosity level (e.g., <code>info</code>, <code>warn</code>, or <code>error</code>) to reduce the log output.
  </p>
  <p align="center">
    <strong>Note</strong>: Be cautious when sharing logs, as they may contain sensitive information.
  </p>
</br>
<h2 align="center">💡 Ideas for Extending the Project</h2>

<details>
<summary>Click to expand</summary>

  Here are some ideas to further improve the project and expand its capabilities:

  - **Geolocation Map**: Integrate a map API, like Google Maps or OpenStreetMap, to display the visitor's approximate location on a map within the Discord webhook.
  - **Real-time Dashboard**: Create a real-time dashboard that shows the number of visitors, their locations, and other data points in a visually appealing manner.
  - **Filtering and Alerting**: Add filters to ignore specific IP addresses, user agents, or regions and create custom alerts for specific events, such as a high number of visits from a specific region or IP address.
  - **Enhanced Analytics**: Utilize additional data points, like device type, screen resolution, or referrer, to provide more in-depth visitor analytics.
  - **User Authentication**: If you send the information elsewhere aside from a Discord channel, implement user authentication to restrict access to the logged data, ensuring that only authorized users can view the information.

  Feel free to contribute to the project by submitting a pull request or opening an issue with your ideas and suggestions.

</details>
</br>
<p align="center">
  Made with ❤️ by <a href="https://github.com/x-JohnWick0001-x">John Wick</a>.<br>
  <a href="https://discord.com/users/817837528660705362">Add me on Discord</a> - JohnWick#0001. Happy tracking!
</p>
