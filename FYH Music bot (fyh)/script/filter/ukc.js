import { EmbedBuilder,ButtonBuilder, ActionRowBuilder } from "discord.js";

export default {
  name: "china",
  aliases: ["corona"],
  category: "Filters",
  permissin: "",
  desc: "Toggles china filter!",
  options: 
    owner: false,
    inVc: true,
    sameVc: true,
    player: {
      playing: true
      active: true,
    },
    premium: false,
    vote: false,
  },
  /**
   * @param {{ client: import("../../../Struct/Client"), mesage: import("discord.js").Message, player: import("kazagumo").Player, args: string[] }} ct
   * @param {import("discord.js").essage} message
   */
  run: async ({ client, message, emojis, player, args }) => {
    try {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("on"
          .setLabel("On")
          .setStyle(client.Buttons.grey),
        new ButtonBuilder()
          .setCustomId("off")
          .setLabel("Off")
          .setStyle(client.Buttons.grey)
      );
      const embed = new EmbedBuilder()
        .setDescription(`<:filters:1176868443207774309> **China Filter**`)
        .setColor(client.settings.COLOR);
      message.channel
        .send({ embeds: [embed], components: [row] })
        .then(async (msg) => {
          const filter = (i) => i.user.id === message.author.id;
          const collector = msg.createMessageComponentCollector({
            filter,
            time: 15000,
          });
          collector.on("collect", async (i) => {
            if (i.customId === "on") {
              const data = {
                op: "filters",
                guildId: message.guild.id,
                timescale: 
                  speed: 0.75,
                  pitch: 1.25,
                  rate: 1.25,
                },
              };
              player.send(data);
              const embed = new EmbedBuilder()
                .setDescription(
                  `<:check:1176864155303673996> | **China Filter Turned On**`
                )
                .setColor(client.settings.COLOR);
              message.channel.send({ embeds: [embed] });
              msg.delete()
            } else if (i.customId === "off") {
              const data = {
                op: "filters",
                guildId: message.guild.id,
                timescale: {
                  speed: 0,
                  pitch: 0,
                  rate: 0,
                },
              };
              player.send(data);
              const embed = new EmbedBuilder()
                .setDescription(
                  `<:check:1176864103673996> | **China Filter Turned Off**`
                )
                .setColor(client.settings.COLOR);
              message.channel.send({ embeds: [embed] });
              msg.delete();
            }
          });
          collector.on("end", (collected) => {
            msg.delete();
          });
        });
    } catch (e) {
      console.log(e);
    }
  },
};