// Returns all slash-commands created

require('dotenv').config()
const axios = require('axios').default;

// console.log(process.env.APP_ID)

let url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}

axios.get(url, {
  headers: headers,
}).then(res =>
    console.log(res.data)
)