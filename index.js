const Discord=require("discord.js");
const client = new Discord.Client({partials:['MESSAGE','CHANNEL','REACTION']});
const prefix=process.env.prefix;
require('dotenv').config();
function between(min, max) {return Math.floor(Math.random() * (max - min) + min)}
function newStatus() {
var id=between(0,4);
if(id===0){client.user.setActivity(`${prefix}poll | ${client.users.cache.size} poll makers`, { type: 'WATCHING' });}
if(id===1){client.user.setActivity(`${prefix}trivia | ${client.guilds.cache.size} servers`, { type: 'WATCHING' });}
if(id===2){client.user.setActivity(`${prefix}fact | ${client.users.cache.size} fact makers in ${client.channels.cache.size} channels`, { type: 'WATCHING' });}
if(id===3){client.user.setActivity(`${prefix}ping - Changes the ping settings`, { type: 'WATCHING' });}
if(id===4){client.user.setActivity(`${prefix}invite - Invite the bot!`, { type: 'LISTENING' });}
if(id===4){client.user.setActivity(`${prefix}vote - Create a vote with likes or dislikes!`, { type: 'PLAYING' });}
}
client.once("ready",()=>{
console.log("Ready!");
newStatus();
setInterval(newStatus,10000);
});

client.on("message",async message=>{
if(message.author.bot===false&&message.content.startsWith(prefix)===true){
const command=message.content.substring(prefix.length,message.content.length);

if(command.toLowerCase().startsWith("poll")===true){
const string=command.substring(5,command.length);
const args=string.split(",");
if(args.length<5){
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Poll**")
.setDescription(`**${message.author.tag}**, please enter the main question 4 options divided by the comma sign (,).\r\nExample: _${prefix}poll Would you rather, Eat fruits, Eat vegetables, Eat fast-food, or Drink smoothie_`);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
const member = message.guild.members.cache.get(message.author.id);
if (member.roles.cache.some(role=>role.name==='Poll maker')) {
let role=message.guild.roles.cache.find(x=>x.name==="Poll ping");
if(!role){var ping="";}else{var ping=`||${role}||`;}
var embed=new Discord.MessageEmbed()
.setColor("#006aff")
.setTitle("**Poll**")
.setDescription(`**This poll was made by: ${message.author.tag}**\r\n_It's a poll!_\r\n_You should choose and react your answer!_\r\n__**${args[0]}**__`)
.addFields(
{name:`:one: | ${args[1]}`,value:"\u200B"},
{name:`:two: | ${args[2]}`,value:"\u200B"},
{name:`:three: | ${args[3]}`,value:"\u200B"},
{name:`:four: | ${args[4]}`,value:"\u200B"},
);
const channel=message.guild.channels.cache.find(channel=>channel.name==="polls")
if(!channel){
message.channel.bulkDelete(1);
message.channel.send(ping,[embed])
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}else{
message.channel.bulkDelete(1);
message.channel.send(`||${message.author}||\r\n:white_check_mark: | Successfully sent a new poll in **${channel}**\r\n:grey_question: | Question: **${args[0]}**\r\n:person_pouting: | Author: **${message.author.tag}**`);
channel.send(ping,[embed])
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}}else{
let roleName="Poll maker";
let role=message.guild.roles.cache.find(x=>x.name===roleName);
if (!role) {
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Poll**")
.setDescription(`**${message.author.tag}**, the server should have a role called\r\n`+"`Poll maker`"+`\r\nElse, nobody can post polls.`);
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Poll**")
.setDescription("**"+message.author.tag+"**, you don't have permissions to send polls.\r\nYou can only send polls if you have the `Poll maker` role.");
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}}}}

if(command.toLowerCase().startsWith("trivia")===true){
const string=command.substring(7,command.length);
const args=string.split(",");
if(args.length<6){
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Trivia**")
.setDescription(`**${message.author.tag}**, please enter the main question 4 options divided by the comma sign (,) and an answer for the question.\r\nExample: _${prefix}trivia Who is the creator of the bot?,TheRobloxCommunist#4530,Wumpus#0001,KimPlayz4LK#3433,Someone else,3_`);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
const member = message.guild.members.cache.get(message.author.id);
if (member.roles.cache.some(role=>role.name==='Trivia maker')) {
let role=message.guild.roles.cache.find(x=>x.name==="Trivia ping");
if(!role){var ping="";}else{var ping=`||${role}||`;}
var embed=new Discord.MessageEmbed()
.setColor("#006aff")
.setTitle("**Trivia**")
.setDescription(`**This trivia was made by: ${message.author.tag}**\r\n_It's a trivia!_\r\n_You should choose the right answer and react!_\r\n__**${args[0]}**__\r\n*Answer: ||${args[5]}||*`)
.addFields(
{name:`:one: | ${args[1]}`,value:"\u200B"},
{name:`:two: | ${args[2]}`,value:"\u200B"},
{name:`:three: | ${args[3]}`,value:"\u200B"},
{name:`:four: | ${args[4]}`,value:"\u200B"},
);
const channel=message.guild.channels.cache.find(channel=>channel.name==="trivias")
if(!channel){
message.channel.bulkDelete(1);
message.channel.send(ping,[embed])
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}else{
message.channel.bulkDelete(1);
message.channel.send(`||${message.author}||\r\n:white_check_mark: | Successfully sent a new trivia quiz in **${channel}**\r\n:grey_question: | Question: **${args[0]}**\r\n:person_pouting: | Author: **${message.author.tag}**`);
channel.send(ping,[embed])
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}}else{
let roleName="Trivia maker";
let role=message.guild.roles.cache.find(x=>x.name===roleName);
if (!role) {
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Trivia**")
.setDescription(`**${message.author.tag}**, the server should have a role called\r\n`+"`Trivia maker`"+`\r\nElse, nobody can post new trivia quizzes.`);
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Trivia**")
.setDescription("**"+message.author.tag+"**, you don't have permissions to send new trivias.\r\nYou can only send trivias if you have the `Trivia maker` role.");
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}}}}

if(command.toLowerCase().startsWith("fact")===true){
var fact = command.substring(5,command.length);
var args = command.split(" ");
if(fact===""){
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Fact**")
.setDescription(`**${message.author.tag}**, please enter a fact to share!\r\nThe fact could be anything, something that gives information, or knowledge about something.\r\nIt can be **anything**!!!`);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
const member = message.guild.members.cache.get(message.author.id);
if (member.roles.cache.some(role=>role.name==='Fact maker')) {
let role=message.guild.roles.cache.find(x=>x.name==="Fact ping");
if(!role){var ping="";}else{var ping=`||${role}||`;}
var embed=new Discord.MessageEmbed()
.setColor("#006aff")
.setTitle("**Fact**")
.setDescription(`**${message.author}** have posted a fact!`)
.addFields({name:`:bulb: | Fact`,value:`**__${fact}__**`},)
const channel=message.guild.channels.cache.find(channel=>channel.name==="facts")
if(!channel){
message.channel.bulkDelete(1);
message.channel.send(ping,[embed]).then(function(message){message.react("✅");message.react("👍");message.react("👎");}).catch(function(){});
}else{
message.channel.bulkDelete(1);
message.channel.send(`||${message.author}||\r\n:white_check_mark: | Successfully sent a new fact in **${channel}**\r\n:person_pouting: | Author: **${message.author.tag}**`);
channel.send(ping,[embed]).then(function(message){message.react("✅");message.react("👍");message.react("👎");}).catch(function(){});
}}else{
let roleName="Fact maker";
let role=message.guild.roles.cache.find(x=>x.name===roleName);
if (!role) {
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Fact**")
.setDescription(`**${message.author.tag}**, the server should have a role called\r\n`+"`Fact maker`"+`\r\nElse, nobody can post facts.`);
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Fact**")
.setDescription("**"+message.author.tag+"**, you don't have permissions to send new facts.\r\nYou can only send polls if you have the `Fact maker` role.");
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}}}}

if(command.toLowerCase().startsWith("inv")===true){
var embed=new Discord.MessageEmbed()
.setColor("#006aff")
.setTitle(":envelope: | **Invite**")
.setDescription(`**${message.author.tag}**, here's an invite link to invite this bot: **[Invite link](https://discord.com/oauth2/authorize?client_id=750306840876941343&permissions=8&scope=bot)**`);
message.channel.bulkDelete(1);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}

if (command.startsWith("vote")===true) {
const args=command.split(" ");
message.channel.bulkDelete(1,true);
if (!args[1]) {
const embed = new Discord.MessageEmbed()
.setColor(`#bb0000`)
.setTitle(`:x: | Error`)
.addFields(
{name:`Syntax error`,value:`Incorrect command syntax.`},
{name:`Example`,value:`${prefix}vote Something to vote about`}
);
message.channel.send(`||${message.author}||`,[embed]);
} else {
const q = command.substring(5,command.length).trim();
if (q.length>256) {
const embed = new Discord.MessageEmbed()
.setColor(`#bb0000`)
.setTitle(`:x: | Error`)
.addFields(
{name:`Length error`,value:`Your voting subject should be 256 characters long, including spaces and all other characters.\r\nYou cannot do more than 256 characters.`}
);
message.channel.send(`||${message.author}||`,[embed]);
} else {
const embed = new Discord.MessageEmbed()
.setColor(`#0088dd`)
.setTitle(q)
.setFooter(`Posted by ${message.author.tag} | 0 votes`);
let role=message.guild.roles.cache.find(x=>x.name==="Vote ping");
if(!role){var ping="";}else{var ping=`||${role}||`;}
const channel=message.guild.channels.cache.find(channel=>channel.name==="votes")
if(!channel){message.channel.send(ping,[embed]).then(function(message){message.react("👍");message.react("👎");});}else
{channel.send(ping,[embed]).then(function(message){message.react("👍");message.react("👎");});}
}}
}

if(command.toLowerCase().startsWith("ping")===true){
const args = command.toLowerCase().split(" ");
var cmds=['po','tr','fa','vo'];
if(args[1]==null){message.reply("please specify which ping setting would you like to toggle:\r\n- polls\r\n- trivias\r\n- facts\r\n- votes");}else{
if(args[1].length<2){message.reply("please specify which ping setting would you like to toggle:\r\n- polls\r\n- trivias\r\n- facts\r\n- votes");}else{
if(cmds.includes(args[1].substring(0,2))===false){
message.reply("please specify which ping setting would you like to toggle:\r\n- polls\r\n- trivias\r\n- facts\r\n - votes");
}else{
if (args[1].startsWith("po")===true) {
let role=message.guild.roles.cache.find(x=>x.name==="Poll ping");
if(role){
const member = message.guild.members.cache.get(message.author.id);
if(member.roles.cache.some(x=>x.name==="Poll ping")){member.roles.remove(role);message.reply("**you will not** receive pings of new polls. | :x:");}
else{member.roles.add(role);message.reply("**you will** receive pings of new polls. | :white_check_mark:");}
}else{message.reply("the server should have the role named `Poll ping` to receive pings about new polls. | :x:");}
}
if (args[1].startsWith("tr")===true) {
let role=message.guild.roles.cache.find(x=>x.name==="Trivia ping");
if(role){
const member = message.guild.members.cache.get(message.author.id);
if(member.roles.cache.some(x=>x.name==="Trivia ping")){member.roles.remove(role);message.reply("**you will not** receive pings of new trivia quizzes. | :x:");}
else{member.roles.add(role);message.reply("**you will** receive pings of new trivia quizzes. | :white_check_mark:");}
}else{message.reply("the server should have the role named `Trivia ping` to receive pings about new trivia quizzes. | :x:");}
}
if (args[1].startsWith("fa")===true) {
let role=message.guild.roles.cache.find(x=>x.name==="Fact ping");
if(role){
const member = message.guild.members.cache.get(message.author.id);
if(member.roles.cache.some(x=>x.name==="Fact ping")){member.roles.remove(role);message.reply("**you will not** receive pings of new facts. | :x:");}
else{member.roles.add(role);message.reply("**you will** receive pings of new facts. | :white_check_mark:");}
}else{message.reply("the server should have the role named `Fact ping` to receive pings about new facts. | :x:");}
}
if (args[1].startsWith("vo")===true) {
let role=message.guild.roles.cache.find(x=>x.name==="Vote ping");
if(role){
const member = message.guild.members.cache.get(message.author.id);
if(member.roles.cache.some(x=>x.name==="Vote ping")){member.roles.remove(role);message.reply("**you will not** receive pings of new votes. | :x:");}
else{member.roles.add(role);message.reply("**you will** receive pings of new votes. | :white_check_mark:");}
}else{message.reply("the server should have the role named `Vote ping` to receive pings about new votes. | :x:");}
}}}}}

}});

client.on('messageReactionAdd', async (reaction, user) => {
if (reaction.partial) {try {await reaction.fetch();} catch (error) {console.log('Something went wrong when fetching the message: ', error);return;}}
const upvotes = reaction.message.reactions.cache.find(r=>r._emoji.name==="👍").count;
const downvotes = reaction.message.reactions.cache.find(r=>r._emoji.name==="👎").count;
const totalvotes = upvotes - downvotes;
if (upvotes>downvotes) {
reaction.message.channel.messages.fetch(reaction.message.id)
.then(msg => {const footer = `${msg.embeds[0].footer.text.split('|')[0]}| ${totalvotes} votes`;var embed = new Discord.MessageEmbed().setColor(`#00bb00`).setTitle(msg.embeds[0].title).setFooter(footer);msg.edit(embed);});
} else if (upvotes<downvotes) {
reaction.message.channel.messages.fetch(reaction.message.id)
.then(msg => {const footer = `${msg.embeds[0].footer.text.split('|')[0]}| ${totalvotes} votes`;var embed = new Discord.MessageEmbed().setColor(`#bb0000`).setTitle(msg.embeds[0].title).setFooter(footer);msg.edit(embed);});
} else {
reaction.message.channel.messages.fetch(reaction.message.id)
.then(msg => {const footer = `${msg.embeds[0].footer.text.split('|')[0]}| ${totalvotes} votes`;var embed = new Discord.MessageEmbed().setColor(`#0088dd`).setTitle(msg.embeds[0].title).setFooter(footer);msg.edit(embed);});
}
});

client.on('messageReactionRemove', async (reaction, user) => {
if (reaction.partial) {try {await reaction.fetch();} catch (error) {console.log('Something went wrong when fetching the message: ', error);return;}}
const upvotes = reaction.message.reactions.cache.find(r=>r._emoji.name==="👍").count;
const downvotes = reaction.message.reactions.cache.find(r=>r._emoji.name==="👎").count;
const totalvotes = upvotes - downvotes;
if (upvotes>downvotes) {
reaction.message.channel.messages.fetch(reaction.message.id)
.then(msg => {const footer = `${msg.embeds[0].footer.text.split('|')[0]}| ${totalvotes} votes`;var embed = new Discord.MessageEmbed().setColor(`#00bb00`).setTitle(msg.embeds[0].title).setFooter(footer);msg.edit(embed);});
} else if (upvotes<downvotes) {
reaction.message.channel.messages.fetch(reaction.message.id)
.then(msg => {const footer = `${msg.embeds[0].footer.text.split('|')[0]}| ${totalvotes} votes`;var embed = new Discord.MessageEmbed().setColor(`#bb0000`).setTitle(msg.embeds[0].title).setFooter(footer);msg.edit(embed);});
} else {
reaction.message.channel.messages.fetch(reaction.message.id)
.then(msg => {const footer = `${msg.embeds[0].footer.text.split('|')[0]}| ${totalvotes} votes`;var embed = new Discord.MessageEmbed().setColor(`#0088dd`).setTitle(msg.embeds[0].title).setFooter(footer);msg.edit(embed);});
}
});

client.login(process.env.token);