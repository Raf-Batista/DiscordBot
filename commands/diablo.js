const Promise = require("bluebird");
const rp = require("request-promise");
const Discord = require('discord.js');

module.exports = {
	name: 'diablo',
    description: 'Get data about diablo 3 character from Blizzard API',
    cooldown: 5,
   execute(message, args) {
    if(!args.length) {
      message.channel.send('You didnt enter a Profile. Profile names are case sensitive. Here is an example:  !diablo Username-11122')
    } else {
      const profile = args[0]
    
      const credentials = {
        client: {
          id: process.env.BLIZZARD_ID,
          secret: process.env.BLIZZARD_SECRET
        },
        auth: {
          tokenHost: "https://us.battle.net"
        }
      };
      const oauth2 = require("simple-oauth2").create(credentials);
      let token = null;
      
      const getToken = () => {
        if (token === null || token.expired()) {
          return oauth2.clientCredentials
            .getToken()
            .then(oauth2.accessToken.create)
            .then(t => {
              token = t;
              return t.token.access_token;
            });
        } else {
          return Promise.resolve(token.token.access_token);
        }
      };
          return getToken()
            .then(token => {
              return rp.get({
                uri: `https://us.api.blizzard.com/d3/profile/${profile}/?locale=en_US`,
                json: true,
                qs: {
                  locale: "en_US"
                },
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept: 'application/json'
                }
              });
            })
            .then(data => {
               const lastHero = data["heroes"].find(hero => hero["id"] === data["lastHeroPlayed"] )
               let gender;
               let portrait;
               if(lastHero["gender"]){
                  gender = 'female'
               } else {
                  gender = 'male'
               }
               if(lastHero["classSlug"] === 'crusader'){
                  portrait = `x1_${lastHero["classSlug"]}_${gender}`
               } else if(lastHero["classSlug"] === 'necro'){
                  portrait = `p6_${lastHero["classSlug"]}_${gender}`
               } else {
                portrait = `${lastHero["classSlug"].replace('-', '')}_${gender}`
               }  
                embed = new Discord.RichEmbed()
                .setTitle(lastHero["name"])
                .setColor(0x00AE86)
                .setImage(`http://media.blizzard.com/d3/icons/portraits/64/${portrait}.png`)
                .addField('Paragon: ', lastHero["paragonLevel"])
                .addField('Class: ', lastHero["class"])
                .addField('Level: ', lastHero["level"])
                .addField('Elite Kills: ', lastHero["kills"]["elites"])
                .setTimestamp()
                .addBlankField(true)                
                message.channel.send({embed});
            })
            .catch(() => {
                message.channel.send('There was an error. Make sure you enter your profile exactly as it appears in the blizzard app')
            })
    }
  }
}