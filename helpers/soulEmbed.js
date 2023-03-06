const { EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
const randomColor = require("./randomColor");

// TODO: add emojis

let description, descriptions, json, skill, skills, skillsEmbed, fields = '', count;

async function soulEmbed(name) {
    name = name.toLowerCase().trim();

    const response = await fetch(`https://www.prydwen.gg/page-data/eversoul/characters/${name.replace(/ /g, "-")}/page-data.json`);
    
    // Send suggestion if can't find the character
    if (response.status != 200) return false;

    // JSONify
    json = await response.json();
    json = json.result.data.currentUnit.nodes[0];


    // * Create skills embed
    skillsEmbed = new EmbedBuilder()
        .setTitle(`[${TYPES[json.type] ?? json.type}] [${CLASSES[json.class] ?? json.class}] ${json.name}`)
        .setDescription(`[Check out our detailed ratings and reviews](https://www.prydwen.gg/eversoul/characters/${name.trim().replace(/ /g, "-").toLowerCase()})`)
        .setThumbnail(`https://prydwen.gg${json.smallImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src}`)
        .setColor(randomColor())
        .setTimestamp()
        .setFooter({ text: 'nepnep#1358', iconURL: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/BE/nl/19/EP0031-CUSA03124_00-AV00000000000037/image?w=320&h=320&bg_color=000000&opacity=100&_version=00_09_000' })
        .addFields(
            // Field 3 (Ratings)               
            { name: 'RATINGS', value: `**PVE (Early/Mid/Late)**: ${RATINGS[json.ratings.pve_early] ?? '?'}/${RATINGS[json.ratings.pve_mid] ?? '?'}/${RATINGS[json.ratings.pve_late] ?? '?'}` },
        );

    skills = json.skills;

    if (!skills) {
        skillsEmbed.addFields({ name: 'The skills are not available for this character yet', value: 'We will add them as soon as it is possible!' });
        return skillsEmbed;
    }

    count = 0;
    for (skill of skills) {
        descriptions = JSON.parse(skill.description.raw).content[0].content;

        fields += `${SKILLS[skill.category]}**${skill.type}: ${skill.name}**\n`;
        for (description of descriptions) {
            if (description.marks[0]) {
                if (description.marks[0].type === 'bold') fields += '**';
            }

            fields += description.value;

            if (description.marks[0]) {
                if (description.marks[0].type === 'bold') fields += '**';
            }
        }
 
        if (!count) skillsEmbed.addFields({ name: 'SKILLS (LVL 1)', value: fields});
        else skillsEmbed.addFields({ name: '\u200b', value: fields});
        
        count++;
        fields = '';
    }

    return skillsEmbed;
}

module.exports = soulEmbed;

const RATINGS = {
    "1": "?",
    "4": "<:F_:1037311733833928704>",
    "5": "<:D_:1024285330217640038>",
    "6": "<:C_:1024285328246313041>",
    "7": "<:B_:1024285326270808094>",
    "8": "<:A_:1024285324345622529>",
    "9": "<:S_:1024285317643108383>",
    "10": "<:SS:1024285320268746762>",
    "11": "<:SSS:1024285322433015858>",
};

const CLASSES = {
    "Caster": "<:class_caster:1061679521239154758> Caster",
    "Defender": "<:class_defender:1061679523344687104> Defender",
    "Ranger": "<:class_ranger:1061679526347812885> Ranger",
    "Striker": "<:class_striker:1061679528063275098> Striker",
    "Supporter": "<:class_supporter:1061679531339030618> Supporter",
    "Warrior": "<:class_warrior:1061679534413463552> Warrior",
}

const TYPES = {
    "Angel": "<:type_angel:1061679557779914833> Angel",
    "Beast": "<:type_beast:1061679559461842965> Beast",
    "Demon": "<:type_demon:1061679562796322936> Demon",
    "Fairy": "<:type_fairy:1061679564549533706> Fairy",
    "Human": "<:type_human:1061679567187738626> Human",
    "Undead": "<:type_undead:1061679642026709123> Undead",
}

const SKILLS = {
    "Assassin": "<:assassin:1061679570434129961> ",
    "Buff": "<:buff:1061679573726662656> ",
    "Buff - Mass": "<:buff_mass:1061679517673992202> ",
    "Control": "<:control:1061679536237981836> ",
    "Curse": "<:curse:1061679539530502296> ",
    "Debuff": "<:debuff:1061679543238262794> ",
    "Debuff - Mass": "<:debuff_mass:1061679545041834074> ",
    "Defense": "<:defense:1061679548057538580> ",
    "Damage - AOE": "<:dps_aoe:1061679549856878673> ",
    "Damage - Single": "<:dps_single:1061679552419606559> ",
    "Healing": "<:healing:1061679554634194985> ",
}