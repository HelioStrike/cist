const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
import { prefix, token } from './config';
import { CListClient } from './clients/clist-client';

// Use files as commands
const discord_client = new Discord.Client();
discord_client.commands = new Discord.Collection();

const clients = {
	clist_client: new CListClient(),
};

const commandFiles: string[] = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	discord_client.commands.set(command.name, command);
}

discord_client.once('ready', () => {
	console.log('Ready!');
});

discord_client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args: string[] = message.content.slice(prefix.length).trim().split(/ +/).map(arg => arg.toLowerCase());
	const command: string = args.shift();

	if (!discord_client.commands.has(command)) return;

	try {
		discord_client.commands.get(command).execute(discord_client, message, clients, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
    }
});

discord_client.login(token);
