import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { GuildModel } from "../../models/Guild";
import { UserModel } from "../../models/User";
import Canvas from "canvas";

export const database = "rating"

export const data = new SlashCommandBuilder()
  .setName("rank")
  .setDescription("Your rank on the server")

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply();

  const state = (await GuildModel.findOne({ guild_id: interaction.guild?.id }))!

  if (!state || !state.rating) return await interaction.reply({ content: "Commands of this category are disabled on your server, to enable them, enter the \`/settings\` command and select the category you need", ephemeral: true })

  const user = (await UserModel.findOne({ discord_id: interaction.user.id, guild: interaction.guild?.id }))!

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#222222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = '30px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(interaction.user.tag, canvas.width / 2.5, canvas.height / 2.7);
  ctx.fillText(`Уровень ${user.level}`, canvas.width / 2.5, canvas.height / 1.9);
  ctx.fillText(`${user.rating} / ${user.level * 100}`, canvas.width / 1.23, canvas.height / 1.9);

  let progressBarX = canvas.width / 2.5;
  let progressBarY = canvas.height / 1.6;
  let progressBarWidth = 390;
  let progressBarHeight = 40;
  ctx.strokeStyle = '#ffffff';
  ctx.strokeRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight);

  let progress = user.rating / (user.level * 100);
  let fillColor = '#ffffff';
  ctx.fillStyle = fillColor;
  ctx.fillRect(progressBarX, progressBarY, progress * progressBarWidth, progressBarHeight);

  const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ extension: "png" }));

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatar, 25, 25, 200, 200);

  await interaction.editReply({ files: [{ attachment: canvas.toBuffer(), name: "card.png" }] })
}