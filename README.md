### DiscordBot
A discord bot that fetches Diablo 3 profile data from Blizzard's API, searches for a game with GiantBomb's API, and returns the average score for a game from Metacritic.
The bot takes a command posts a response to the channel

I used this awesome guide to build the bot 
https://discordjs.guide/

I also used this guide for Blizzards API 
https://develop.battle.net/documentation/guides/getting-started

To use this bot, you need to set up a bot here:
https://discordapp.com/

Here's the link to the guide for setting up a bot: 
https://discordjs.guide/preparations/setting-up-a-bot-application.html 

After setting up the bot you need to add it to your server 
Here's the link to the guide for adding a bot to your server: 
https://discordjs.guide/preparations/adding-your-bot-to-servers.html

You need to provide your own api keys. 

Here's the link to GiantBomb's API  
https://www.giantbomb.com/api/

Here's the link to Blizzard'a API 
https://develop.battle.net/

After everything is set up, download the bot, cd into the directory and run 
npm index.js

Once you see 'Ready!' in the console you are all set.

### Commands 

!search <game> 

# Searches for a game and posts the returned data to the channel. Returns info on the game including a link to the game

!search the witcher 3 wild hunt 


!reviews <platform> <game> 

# Retuns the average score from Metacritic

!reviews ps4 resident evil 7 


!diablo <Battletag> 

# Returns the last character played in Diablo 3, including the portrait and info such as Paragon level and elites killed

!diablo username-113354
