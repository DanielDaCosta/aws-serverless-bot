// Delete a specific slash-command

require('dotenv').config()
const axios = require('axios').default;

COMMAND_ID = "995446601831157850" // Write the Command ID to delete

let url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands/${COMMAND_ID}`

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}

axios.delete(url, {
  headers: headers,
}).then(res =>
    console.log(res)
).catch(err => 
    console.log(`Command ${COMMAND_ID} does not exist`)
)