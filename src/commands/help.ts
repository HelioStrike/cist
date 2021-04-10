import * as Discord from 'discord.js';
import { bot_name, bot_description } from '../config';

module.exports = {
	name: 'help',
	description: 'Cist Help.',
	execute(discord_client, message, clients, args) {

        const embed = new Discord.MessageEmbed()
        .setTitle(`${bot_name} help`)
        .setDescription(`${bot_description}`)
        .addFields(
            { 
                name: 'help', 
                value: '`!help` - Lists out all commands.' 
            },
            { 
                name: 'list', 
                value: `
                \`!list c/contests\` - Prints a short list of ongoing and upcoming contests.
                \`!list c/contests <search_query>\` - Prints a short list of ongoing and upcoming contests matching the search query.
                \`!list r/resources\` - Prints a short list of contest websites.
                \`!list r/resources <search_query>\` - Prints a short list of contest websites matching the search query.
                `
            }
        );

        message.channel.send(embed);
	},
};
