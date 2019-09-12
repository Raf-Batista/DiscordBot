require('es6-promise').polyfill();
require('isomorphic-fetch');
const cheerio = require('cheerio');

module.exports = {
	name: 'reviews',
    description: 'Shows the average meta critic score for a game',
    cooldown: 5,
	execute(message, args) {
        let argument;
        let platform;
        if(!!args[0]) {argument = args.shift()}
        switch(argument){
            case 'ps4':
                platform = 'playstation-4'
                break;
            case 'xbox': 
                platform = 'xbox-one'
                break;
            case 'switch': 
                platform = 'switch' 
                break;
            case 'pc': 
                platform = 'pc'
                break;
            default: 
                platform = ''    
        }
        let slugGame = args.join('-')
        let game = args.join('  ')
        if(!platform){
            message.channel.send("Please specify a platform. you can use 'ps4', 'xbox', 'switch' or 'pc' ")
        } else if(!game) {
            message.channel.send("Please specify a game such as The Witcher 3 Wild Hunt")
        } else {
            const URL = `https://www.metacritic.com/game/${platform}/${slugGame.toLowerCase()}`
            fetch(URL) 
            .then(response => response.text()) 
            .then(html => {
                const $ = cheerio.load(html);
                const score = $('div.metascore_w span').text();
                if(score) {
                    message.channel.send(`The average meta critic score for ${game} is: ${score}`)
                } else {
                    message.channel.send("Could not find a score for that game. Try entering the full name of the game. \n For example: 'The Witcher 3' will not work, but 'The Witcher 3 Wild Hunt will")
                }
           
            })
            .catch(error => {
                console.log(error);
            })
        }

	},
};

