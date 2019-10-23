require('es6-promise').polyfill();
require('isomorphic-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'search',
    description: 'Search for information on a game. Example: !search Resident Evil 4',
    cooldown: 5,
	execute(message, args) {
        if(!args.length) {
            message.channel.send('You didnt enter a game. Here is an example:  !search Resident Evil 4')
        } else {
            const URL = `http://www.giantbomb.com/api/search?api_key=${process.env.GIANTBOMBKEY}&format=json&query=${args.join('-')}&field_list=name,deck,site_detail_url,image&limit=1`
            let embed;
            fetch(URL) 
            .then(response => response.json()) 
            .then(data => {
                for(let i = 0; i < data.results.length; i++){
                    
                     embed = new Discord.RichEmbed()
                        .setTitle(data.results[i]["name"])
                        .setColor(0x00AE86)
                        .setDescription(data.results[i]["deck"])
                        .setImage(data.results[i]["image"]["medium_url"])
                        .setThumbnail(data.results[i]["image"]["icon_url"])
                        .setTimestamp()
                        .setURL(data.results[i]["site_detail_url"])
                        .addBlankField(true)                
                        message.channel.send({embed});
                }
    
            })
            .catch(error => {
                console.log(error)
            })
        }
  
	},
};
