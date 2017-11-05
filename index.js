const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)

const about = `
  <b>СМЫСЛ</b> – Friends-cafe в Нижнем Новгороде!

  "Friends-cafe" - это особый формат, вы приходите в место, где с вами общаются. Интересуются тем, что у вас происходит в жизни. А так же как и настоящий друг, мы можем просто помолчать и поддержать ваше настроение.. или поднять его, если вы не в духе ))

  К нам вы можете забежать и перекусить вкуснейшими сэндвичами, и выпить бодрящего кофе.
  Вас обрадует приятная цена и хорошее качество.

  К вашему вниманию:
  - Кофе;
  - Сэндвичи;
  - Комбо Предложения (специально для cтудентов);
  - сезонные предложения.

  Обязателен к посещению! Ждём в гости!
`;

bot.command('start', ({ reply }) =>
  reply('Привет!', Markup.keyboard([
      [Markup.callbackButton('Меню', 'Меню'), Markup.callbackButton('О нас', 'О нас')],
      [Markup.callbackButton('Режим работы', 'Режим работы'), Markup.callbackButton('Адрес', 'Адрес')]
    ])
    .resize()
    .extra()
  )
)

const getMenu = (ctx) => ctx.replyWithPhoto('https://pp.userapi.com/c636929/v636929456/5f3ba/7QI_b7wbSOE.jpg');
const getAddress = (ctx) => ctx.replyWithLocation(56.300535, 43.9835956).then(ctx.reply('Нижний Новгород, проспект Гагарина 21'));
const getMode = (ctx) => ctx.reply(`
  пн-сб: 09:00 - 21:00
  вс: 11:00 - 21:00
`);

/* Команды */
bot.command('help', (ctx) => ctx.reply(
`
  Вы можете воспользоваться следующими командами:

  /menu -  посмотреть меню
  /mode - режим работы
  /address - адрес
`
));
bot.command('/menu', (ctx) => { getMenu(ctx) });
bot.command('/mode', (ctx) => getMode(ctx));
bot.command('/address', (ctx) => getAddress(ctx));

/* Сообщения */
bot.hears('Меню', (ctx) => { getMenu(ctx) });
bot.hears('Режим работы', (ctx) => getMode(ctx));
bot.hears('Адрес', (ctx) => getAddress(ctx));
bot.hears('О нас', (ctx) => (ctx.replyWithHTML(about)));

bot.hears(/пока/i, (ctx) => ctx.reply('До новых встреч!'));

/* События */
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.catch((err) => {
  console.log('Ooops', err);
})

bot.startPolling();
