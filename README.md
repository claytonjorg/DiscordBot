# ckl-DiscordBot
Developed using the Discord API and JavaScript. Primary function is to recognize when a user joins a voice channel and place them in a waiting queue system. Other minior functions include: a welcome message upon a user joining the Discord community, pinging, temporarily adding a role to a user for a specific amount of time, and muting users.

### General Information
The following API's and libraries were used:
- https://discord.js.org/ -> Used to function with the Discord client. (Version: 12)
- https://nodejs.org/en/ -> Used to compile JavaScript. (Version: 14.15.0)

### Commands
- !about -> Displays a embed about message.
- !help -> Displays a embed help message.
- !website/web -> Displays a link to your website.
- !ping -> Sends a ping and calculates the ms response time.
- !servers -> Displays a embed servers message.
- !eula -> Creates the EULA for users to agree to.
- !mute -> Mutes a user from the text channels.
- !role -> Temporarily assigns a role to a user. (time key: 5s = 5 seconds, 5m = 5 minutes, 5hr = 5 hours)
- !queue -> Displays a embed message with a list of users connected to a specific voice channel and the time they joined.
