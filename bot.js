//Create by Js0n or Jason Smith
//DecaBot - Multi-Purpose Discord Bot

const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

const prefix = config.prefix;

let strikes = {};
    function getStrikes(userid) {
      if(!strikes[userid]) strikes[userid] = [];
      return strikes[userid];
    }

bot.login(config.token);

bot.on('ready', () => {
  console.log('DecaBot is online!');
  bot.user.setGame('Version: ' + config.version + '!');
});

bot.on('guildMemberAdd', member => {
  const channel = bot.channels.get('281644821494497280');

  member = member.displayName;

  const embed = new Discord.RichEmbed();
    embed.setTitle('Welcome to the server ' + member + '!');
    embed.setColor('#95ff8f');
    embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
    channel.sendEmbed(embed, ``, {}).catch(console.error);
});

bot.on('message', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  var command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  command = command.toLowerCase();

  var args = message.content.split(" ").slice(1);

  var { channel } = message;

    if (command === 'ping') {
      const embed = new Discord.RichEmbed();
        embed.setTitle('Pong!');
        embed.setColor('#95ff8f');
        embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
        channel.sendEmbed(embed, ``, {}).catch(console.error);
    }

    if (command === 'say') {
      if (args === '') {
        const embed = new Discord.RichEmbed();
          embed.setTitle('Please define what you want the bot to say!');
          embed.setDescription('Proper format: **!say [message]**');
          embed.setColor('#fffd62');
          embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
          channel.sendEmbed(embed, ``, {}).catch(console.error);
      }

      else {
        message.delete().catch(console.error);
        message.channel.sendMessage(args.join(' ')).catch(console.error);
      }
    }

    if (command === 'del') {
      var delNum = args[0];
      var isNum = /^\d+$/.test(delNum);

      if (!message.channel.permissionsFor('261383807490457604').hasPermission('MANAGE_MESSAGES')) {
        const embed = new Discord.RichEmbed();
          embed.setTitle('Bot does not have sufficient permissions!');
          embed.setDescription('Please make sure the bot has the permission: **MANAGE_MESSAGES**');
          embed.setColor('#ff8484');
          embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
          channel.sendEmbed(embed, ``, {}).catch(console.error);
      }

      else {
        if (delNum === '') {
          const embed = new Discord.RichEmbed();
            embed.setTitle('Please enter the amount of messages you want to delete.');
            embed.setDescription('Proper format: **!del [number of messages to delete]**');
            embed.setColor('#fffd62');
            embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
            channel.sendEmbed(embed, ``, {}).catch(console.error);
        }

        else if (delNum === 1) {
          message.delete().catch(console.error);
        }

        else if (delNum > 100) {
          const embed = new Discord.RichEmbed();
            embed.setTitle('Please enter an amount no more than 100!');
            embed.setDescription('Proper format: **!del [number of messages to delete]**');
            embed.setColor('#fffd62');
            embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
            channel.sendEmbed(embed, ``, {}).catch(console.error);
        }

        else if (isNum === false) {
          const embed = new Discord.RichEmbed();
            embed.setTitle('Please make sure the amount you entered is a number!');
            embed.setDescription('Proper format: **!del [number of messages to delete]**');
            embed.setColor('#fffd62');
            embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
            channel.sendEmbed(embed, ``, {}).catch(console.error);
        }

        else {
            message.channel.fetchMessages({limit: delNum}).then(messages => {
              if (messages.size < 2) {
                const embed = new Discord.RichEmbed();
                  embed.setTitle('There are no messages to delete!');
                  embed.setColor('#fffd62');
                  embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
                  channel.sendEmbed(embed, ``, {});
              }

              else {
                message.channel.bulkDelete(messages).catch(console.error);
                console.log('ALERT: ' + message.author.username + ' has deleted ' + delNum + ' messages!');
              }
            });
          }
        }
      }


      if (command === 'invite') {
        if (!message.channel.permissionsFor('261383807490457604').hasPermission('CREATE_INSTANT_INVITE')) {
          const embed = new Discord.RichEmbed();
            embed.setTitle('Bot does not have sufficient permissions!');
            embed.setDescription('Please make sure the bot has the permission: **CREATE_INSTANT_INVITE** \n We recommend giving the bot the permission: **ADMINISTRATOR**');
            embed.setColor('#ff8484');
            embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
            channel.sendEmbed(embed, ``, {});
        }

        else {
          message.channel.createInvite({maxAge: 1200}).then(invite => {
            const embed = new Discord.RichEmbed();
              embed.setTitle('Here is your invite link!');
              embed.setDescription(invite.toString());
              embed.setColor('#95ff8f');
              embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
              channel.sendEmbed(embed, ``, {}).catch(console.error);
            }).catch(console.error);
        }
    }

    if (command === 'info') {
      const embed = new Discord.RichEmbed();
        embed.setTitle('DecaBot Information:');
        embed.addField('Author:', 'Js0n', true);
        embed.addField('Version:', config.version, true);
        embed.addField('Current Number Of Servers:', bot.guilds.size, true);
        embed.setColor('#95ff8f');
        embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
        channel.sendEmbed(embed, ``, {}).catch(console.error);
    }

    if (command === 'help') {
      const embed = new Discord.RichEmbed();
        embed.setTitle('Command Help');
        embed.setURL('https://discord.gg/Wcaaar8');
        embed.addField('!Ping', 'Returns: \'Pong\' - Used to test the bot\'s functionality.');
        embed.addField('!Say [args]', 'Returns: Bot sends a message with \'[args]\' - Used to manually send messages from the bot.');
        embed.addField('!Del [args]', 'Returns: N/A - Used to delete messages.');
        embed.addField('!Invite', 'Returns: Invite link to server that will be deleted after 20 minutes. - Used to easily invite other users to your server.');
        embed.addField('!Info', 'Returns: Bot Author, Current Version, Current Number Of Servers - Used to view information about the bot.');
        embed.addField('!Help', 'Returns: The information you are currently viewing - Used to assist users if they\'re unsure about the bot\'s usage.');
        embed.addField('Support Server', 'Join our support server here: https://discord.gg/Wcaaar8');
        embed.setColor('#6cfff8');
        embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
        message.author.sendEmbed(embed, ``, {}).catch(console.error);
        //channel.sendEmbed(embed, ``, {}).catch(console.error); //USE THIS TO ADD THE EMBED TO THE COMMAND HELP CHANNEL IN THE BOT'S DISCORD!
    }

    if (command === 'strike') {
      var user = args[0];
      user = user.substring(2).slice(0, -1);
      var reason = args.slice(1);
      reason = reason.join(' ').toString();

      getStrikes(user).push({reason, striker: message.author});

      //console.log(JSON.stringify(strikes, null, 4));
    }

    if (command === 'strikes') {
      var count = 1;
      var user = args[0];
      user = user.substring(2).slice(0, -1);

      const embed = new Discord.RichEmbed();
        getStrikes(user).forEach(s => embed.addField(`Strike #${count++}: ${s.reason}`, `by: ${s.striker}`, true));
        embed.setColor('#ff8484');
        embed.setFooter('DecaBot', 'https://cdn.discordapp.com/app-icons/261383807490457604/3a76503158284cb7877e158aa75c73ef.jpg');
        channel.sendEmbed(embed, ``, {}).catch(console.error);

      //message.channel.sendMessage(getStrikes(user).map(s => `<@${user}> was striked for: ${s.reason} by: ${s.striker}`).join('\n'));
    }
});
