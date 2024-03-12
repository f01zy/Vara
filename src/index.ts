import { Client, GatewayIntentBits } from "discord.js"
import { config } from "dotenv"
import { deployCommands } from "./setup/commands"
import { deployEvents } from "./setup/event"
import { setupDatabase } from "./setup/database"
config()

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildVoiceStates
]

const client = new Client({ intents })

const text = `
██╗░░░██╗░█████╗░██████╗░░█████╗░
██║░░░██║██╔══██╗██╔══██╗██╔══██╗░
╚██╗░██╔╝███████║██████╔╝███████║░
░╚████╔╝░██╔══██║██╔══██╗██╔══██║░
░░╚██╔╝░░██║░░██║██║░░██║██║░░██║░
░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░
`

console.log(text)

setupDatabase()
deployCommands()
deployEvents(client)
client.login(process.env.TOKEN)