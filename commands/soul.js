const { SlashCommandBuilder } = require("discord.js");
const soulEmbed = require("../helpers/soulEmbed");
const bestMatch = require('../helpers/bestMatch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('soul')
        .setDescription('Displays the information of a nikke')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('name of the character')
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        let soul = await soulEmbed(name);
        if (soul) {
            await interaction.editReply({ embeds: [soul] });
            return;
        } else {
            let match = bestMatch(name, 'character');
            if (match) {
                soul = await soulEmbed(match);
                await interaction.editReply({ embeds: [soul] });
                return;
            } else {
                await interaction.editReply({ content: "Couldn't find the character!", ephemeral: true });
                return;
            }
        }
    }
}