const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
const randomColor = require("../helpers/randomColor");

const help = new EmbedBuilder()
.setTitle('List of commands')
.setDescription('/help')
.setThumbnail('https://img-10.stickers.cloud/packs/977bc206-85d3-4882-bd71-a8ab12956a4e/webp/c8bf8419-c2e4-4810-ab71-862dfb67614e.webp')
.addFields(
    { name: '/soul', value: "Looks up a soul's profile." },
    // { name: '/skin', value: 'Displays character\'s skin (default only for now).' },
    // { name: '/list', value: 'Displays a list of characters. There will be numerous filters for you to choose'},
    { name: '/ping', value: 'Return latency.' },
    { name: '/help', value: 'Displays this message' },
    { name: '/info', value: 'Displays bot info.' }
)
.setImage('https://nie.res.netease.com/r/pic/20230105/ea6f0785-2fec-4710-8b60-897e6811a233.png')
.setTimestamp()
.setFooter({ text: 'nepnep#1358', iconURL: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/BE/nl/19/EP0031-CUSA03124_00-AV00000000000037/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000' });


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays list of commands'),
    async execute(interaction) {
        await interaction.editReply({ embeds: [help.setColor(randomColor())] });
    }
}