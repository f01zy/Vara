import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js"

const selects = [
  {
    label: "Economy",
    description: "Economy commands on your server by type: balance, work, roulette, etc."
  },
  {
    label: "Moderation",
    description: "The moderation commands on your server allow you to manage the server more efficiently"
  },
  {
    label: "Voice rooms",
    description: "Private voice channels where you can relax with friends without fear that someone will come to you"
  },
  {
    label: "Rating",
    description: "The rating system on the server"
  }
]

export const settingsSelect: ActionRowBuilder<StringSelectMenuBuilder> = new ActionRowBuilder<StringSelectMenuBuilder>()
  .addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("settings")
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder("Select the item you need")
      .addOptions(selects.map(el => {
        return {
          label: el.label,
          description: el.description,
          value: el.label
        }
      }))
  )