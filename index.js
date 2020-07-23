const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const CListClient = require('./clients/clist-client.js');

//Use files as commands
const client = new Discord.Client();
client.commands = new Discord.Collection();

const clients = {
    clist_client: new CListClient()
};

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/).map(arg => arg.toLowerCase());
	const command = args.shift();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, clients, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }    
});

client.login(token);
