
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.EXPERT_BOT_TOKEN);
const {createUser} = require('./joinroom-client');

// In-memory storage for courses
const courses = [];
let currentStep = {};

// /start command
bot.start(async (ctx) => {
  try{
    createUser(ctx.from.id);
    ctx.reply(
      `Сәлем🥰 ${ctx.chat.first_name}! Қош келдіңіз!🤗`,
      Markup.inlineKeyboard([
        Markup.button.callback('Жаңа курс қосу➕', 'create_course'),
        Markup.button.callback('Менің курстарым📚', 'list_courses'),
      ])
    );
  }catch (error) {
    ctx.reply('Sorry, there was an error fetching the data.');
  }
});


// Handler for "Create New Course"
bot.action('create_course', (ctx) => {
  currentStep[ctx.from.id] = { step: 'awaiting_course_name' };
  ctx.reply('Курстың атын енгізіңіз👇:');
});

// Capture course name
bot.on('text', (ctx) => {
  const step = currentStep[ctx.from.id];
  if (step) {
    if (step.step === 'awaiting_course_name') {
      step.courseName = ctx.message.text;
      step.step = 'awaiting_course_description';
      ctx.reply('Курстың сипаттамасын енгізіңіз👇:');
    } else if (step.step === 'awaiting_course_description') {
      step.courseDescription = ctx.message.text;
      // Save the course
      courses.push({
        name: step.courseName,
        description: step.courseDescription,
      });
      delete currentStep[ctx.from.id];
      ctx.reply('Курс сәтті қосылды!✅', Markup.inlineKeyboard([
        Markup.button.callback('Басқа курсты қосу📕', 'create_course'),
        Markup.button.callback('Артқа🔙', 'back_to_menu'),
      ]));
    }
  }
});

// Handler for "List of Courses"
bot.action('list_courses', (ctx) => {
  if (courses.length === 0) {
    ctx.reply('Әзірше ешқандай курс жоқ');
    return;
  }

  const courseButtons = courses.map((course, index) =>
    [Markup.button.callback(course.name, `course_${index}`)]
  );

  ctx.reply(
    'Курстардың тізімі:📚',
    Markup.inlineKeyboard([
      ...courseButtons,
      [Markup.button.callback('Бас меню📲', 'back_to_menu')],
    ])
  );
});

// Show course details
bot.action(/course_\d+/, (ctx) => {
  const index = parseInt(ctx.match[0].split('_')[1], 10);
  const course = courses[index];

  ctx.reply(
    `Курстың аты:👉 ${course.name}\nСипаттамасы:👉 ${course.description}`,
    Markup.inlineKeyboard([
      Markup.button.callback('Курстардың тізімі📚', 'list_courses'),
      Markup.button.callback('Бас меню📲', 'back_to_menu'),
    ])
  );
});

// Handle "Back to Menu" action
bot.action('back_to_menu', (ctx) => {
  delete currentStep[ctx.from.id];
  ctx.reply(
    'Қандай қызметті таңдайсыз❔',
    Markup.inlineKeyboard([
      Markup.button.callback('Жаңа курс қосу📘', 'create_course'),
      Markup.button.callback('Менің курстарым📚', 'list_courses'),
    ])
  );
});

// Error handling for unexpected inputs
bot.on('message', (ctx) => {
  if (!currentStep[ctx.from.id]) {
    ctx.reply(
      'Please choose an option from the menu.',
      Markup.inlineKeyboard([
        Markup.button.callback('Жаңа курс қосу📗', 'create_course'),
        Markup.button.callback('Менің курстарым📚', 'list_courses'),
      ])
    );
  }
});

// Start the bot
bot.launch();
console.log('Bot is up and running...');
