const Discord = require('discord.js');
const { clist_base, list_objects } = require('../config.json');
const utils = require('../utils.js');

module.exports = {
	name: 'list',
	description: 'List coding competitions/contest websites!',
	execute(message, clients, args) {
        let num_args = args.length;
        let clist_client = clients['clist_client'];

        //Invalid syntax check
        if (num_args == 0 || list_objects.indexOf(args[0]) === -1) {
			return message.channel.send('');
		}

        if (args[0] === "contests" || args[0] === "c") {
            //Return contests

            //Get and filter contests
            let contests = clist_client.getContests();
            if(num_args > 1) {
                contests = contests.filter(contest => {
                    for(let i = 1; i < num_args; i++) {
                        if(contest.event.toLowerCase().includes(args[i]) 
                        || contest.href.toLowerCase().includes(args[i])) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            contests = utils.limitObjects(contests);

            message.channel.send(`Found ${contests.length} contests.`);
            contests.forEach(contest => {
                const embed = new Discord.MessageEmbed()
                                .setTitle(contest.event)
                                .setURL(contest.href)
                                .setImage(clist_base + contest.resource.icon)
                                .addFields(
                                    { name: 'Start', value: contest.start, inline: true },
                                    { name: 'End', value: contest.end, inline: true }
                                );
                message.channel.send(embed);
            });

        } else if (args[0] === "resources" || args[0] === "r") {
            //Return resources

            //Get and filter resources
            let resources = clist_client.getResources();
            if(num_args > 1) {
                resources = resources.filter(resource => {
                    for(let i = 1; i < num_args; i++) {
                        if(resource.name.toLowerCase().includes(args[i])) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            resources = utils.limitObjects(resources);

            message.channel.send(`Found ${resources.length} resources.`);
            resources.forEach(resource => {
                const embed = new Discord.MessageEmbed()
                                .setTitle(resource.name)
                                .setURL('https://' + resource.name)
                                .setImage(clist_base + resource.icon);
                message.channel.send(embed);
            });

        }
	},
};