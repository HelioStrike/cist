# cist

Discord bot for competitive programming contests.

## Commands

- `!help` - Lists out all commands.
- `!list c/contests` - Prints a short list of ongoing and upcoming contests.
- `!list c/contests <search_query>` - Prints a short list of ongoing and upcoming contests matching the search query.
- `!list r/resources` - Prints a short list of contest websites.
- `!list r/resources <search_query>` - Prints a short list of contest websites matching the search query.

## Setting up

- [Create a discord application](https://discordjs.guide/preparations/setting-up-a-bot-application.html) and then [add it to your server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html).
- Paste the bot's token in `config.json`.
- Paste your [clist.by](https://clist.by/) username and [API key](https://clist.by/api/v1/doc/) in `config.json`.
- Run `npm install` to install dependencies and then `node index.js` to run the application.
