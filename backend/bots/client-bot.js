require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.CLIENT_BOT_TOKEN);
// Mock data for available courses
const availableCourses = [
  { id: '101', name: 'JavaScript Basics', description: 'Learn the fundamentals of JavaScript.' },
  { id: '102', name: 'Node.js for Beginners', description: 'Introduction to Node.js and server-side JavaScript.' },
  { id: '103', name: 'Advanced React', description: 'Deep dive into React concepts and patterns.' },
];

// Mock data to store user's subscribed courses
const userCourses = {};

// Start command
bot.start((ctx) => {
  return ctx.reply(
    'Welcome! Please select an option:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Subscribe to new Course', 'subscribe')],
      [Markup.button.callback('List of my Courses', 'list_courses')]
    ])
  );
});

// Handle 'Subscribe to new Course'
bot.action('subscribe', (ctx) => {
  const buttons = availableCourses.map((course) => 
    Markup.button.callback(course.name, `view_course_${course.id}`)
  );
  buttons.push(Markup.button.callback('Back', 'back_to_menu'));

  return ctx.editMessageText(
    'Select a course to view details:',
    Markup.inlineKeyboard(buttons, { columns: 1 })
  );
});

// Show course details and subscription options
availableCourses.forEach((course) => {
  bot.action(`view_course_${course.id}`, (ctx) => {
    return ctx.reply(
      `Course Name: ${course.name}\nDescription: ${course.description}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Subscribe to Course', `subscribe_to_${course.id}`),
        Markup.button.callback('Go Back to Courses List', 'subscribe')
      ])
    );
  });

  // Handle subscription to the course
  bot.action(`subscribe_to_${course.id}`, (ctx) => {
    const userId = ctx.from.id;
    userCourses[userId] = userCourses[userId] || [];
    if (!userCourses[userId].some((c) => c.id === course.id)) {
      userCourses[userId].push(course);
    }
    return ctx.reply(
      `You have subscribed to: ${course.name}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Back to Menu', 'back_to_menu'),
        Markup.button.callback('Back to Courses List', 'subscribe')
      ])
    );
  });
});

// Handle 'List of my Courses'
bot.action('list_courses', (ctx) => {
  const userId = ctx.from.id;
  const courses = userCourses[userId] || [];

  if (courses.length === 0) {
    return ctx.reply(
      'You have not subscribed to any courses yet.',
      Markup.inlineKeyboard([
        Markup.button.callback('Back to Menu', 'back_to_menu')
      ])
    );
  }

  const buttons = courses.map((course) => 
    Markup.button.callback(course.name, `my_course_${course.id}`)
  );
  buttons.push(Markup.button.callback('Back', 'back_to_menu'));

  return ctx.editMessageText(
    'Here are your subscribed courses:',
    Markup.inlineKeyboard(buttons, { columns: 1 })
  );
});

// Handle course details from the user's list
availableCourses.forEach((course) => {
  bot.action(`my_course_${course.id}`, (ctx) => {
    return ctx.reply(
      `Course Name: ${course.name}\nDescription: ${course.description}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Back to My Courses', 'list_courses'),
        Markup.button.callback('Back to Menu', 'back_to_menu')
      ])
    );
  });
});

// Handle 'Back' to the main menu
bot.action('back_to_menu', (ctx) => {
  return ctx.reply(
    'Welcome back! Please select an option:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Subscribe to new Course', 'subscribe')],
      [Markup.button.callback('List of my Courses', 'list_courses')]
    ])
  );
});

// Start polling
bot.launch()
  .then(() => {
    console.log('Bot is running...');
  })
  .catch((error) => {
    console.error('Error launching bot:', error);
  });

// Graceful stop on SIGINT or SIGTERM
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
