const { search, getURL } = require('pagalworld');
const { Telegraf } = require('telegraf');
const bot = new Telegraf("5993676392:AAESrodB_E_edhxeUlMiO5s2QOv1jlj72x8");
bot.start((ctx) => {
  ctx.reply("Welcome " + ctx.from.first_name + " to the music downloader bot");
  ctx.reply("try /music for songs then follw up");
});

async function song(name, callback) {
  try {
    const songPage = await search(name);
    console.log(songPage);
    const songURL = await getURL(name);
    console.log(songURL);
    callback(null, songURL);
  } catch (error) {
    console.error(error);
    callback(error, null);
  }
}

bot.command("music", (ctx) => {
  ctx.reply("Enter the song name");

  bot.on("text", (ctx) => {
    const songName = ctx.message.text;
    ctx.reply("Wait your Song is being ready.");
    song(songName, (error, songURL) => {
      if (error) {
        // Handle the error here
        console.error(error);
      } else {
        // Use the songURL as needed
        ctx.reply(songURL);
        console.log(songURL);
      }
    });
  });
});

console.log("Bot is running");
bot.launch();
