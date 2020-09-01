const Discord=require("discord.js");
const client=new Discord.Client();
const prefix=process.env.prefix;
require('dotenv').config();
client.once("ready",()=>{
console.log("Ready!");
client.user.setActivity(`${prefix}poll | ${client.users.cache.size} poll makers in ${client.guilds.cache.size} servers`, { type: 'WATCHING' });
setInterval(function(){client.user.setActivity(`${prefix}poll | ${client.users.cache.size} poll makers in ${client.guilds.cache.size} servers`, { type: 'WATCHING' });},60000);
});

client.on("message",async message=>{
if(message.author.bot===false&&message.content.startsWith(prefix)===true){
const command=message.content.substring(prefix.length,message.content.length);

if(command.startsWith("poll")===true){
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
message.channel.send(embed)
.then(function(message) {
message.react("1️⃣");
message.react("2️⃣");
message.react("3️⃣");
message.react("4️⃣");
}).catch(function(){});
}else{
channel.send(embed)
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
.setDescription(`**${message.author.tag}**, the server should have a role names\r\n`+"`Poll maker`"+`\r\nElse, nobody can post polls.`);
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}else{
var embed=new Discord.MessageEmbed()
.setColor("#ba0000")
.setTitle(":x: | **Poll**")
.setDescription("**"+message.author.tag+"**, you don't have permissions to send polls.\r\nYou can only send polls if you have the `Poll maker` role.");
message.channel.send(`||<@${message.author.id}>||`,[embed]);
}}}}

}
});
client.login(process.env.token);