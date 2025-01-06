
require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.EXPERT_BOT_TOKEN);
const {
  createUser,
  getExpertCourses,
  createCourse,
  getCourse,
  addLesson,
  getCourseLessons,
  getLesson
} = require('./joinroom-client');

// In-memory storage for courses
// const courses = [];
const currentStep = {};

// /start command
bot.start(async (ctx) => {
  try{
    const userId = ctx.from.id;
    const username = ctx.chat.username; 

    await createUser(userId, username);
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



// Handler for "List of Courses"
bot.action('list_courses', async (ctx) => {
  try {
    const courses = await getExpertCourses(ctx.from.id);
    if (!courses || courses.length === 0) {
      return ctx.reply('Әзірше ешқандай курс жоқ');
    }
    const courseButtons = courses.map((course, index) => 
      [Markup.button.callback(course.name, `course_${course.id}`)]
    );
    ctx.reply(
      'Курстардың тізімі:📚',
      Markup.inlineKeyboard([
        ...courseButtons,
        [Markup.button.callback('Бас меню📲', 'back_to_menu')],
      ])
    );
  } catch (error) {
    console.error('Error fetching courses:', error);
    ctx.reply('Курстарды алу кезінде қате пайда болды. Қайта көріңіз.');
  }
});

bot.action(/course_\d+/, async (ctx) => {
  try {
    const courseId = parseInt(ctx.match[0].split('_')[1], 10);
    const userId = ctx.from.id;

    // Fetch course details from the API
    const course = await getCourse(userId, courseId);

    if (!course) {
      return ctx.reply('Курс табылмады.');
    }
    console.log('Creating add_lesson button with courseId:', courseId);
    ctx.reply(
      `Курстың аты:👉 ${course.name}\nСипаттамасы:👉 ${course.description}`,
      Markup.inlineKeyboard([
        [Markup.button.callback('Курстардың тізімі📚', 'list_courses')],
        [Markup.button.callback('Сабақтардың тізімі📚', `list_lessons_${courseId}`)],
        [Markup.button.callback('Cабақ қосу📘', `add_lesson_${courseId}`)],
        [Markup.button.callback('Бас меню📲', 'back_to_menu')],
      ])
    );
    
  } catch (error) {
    console.error('Error fetching course details:', error);
    ctx.reply('Курсты алу кезінде қате пайда болды. Қайта көріңіз.');
  }
});

// Handler for "Add Lesson" action with courseId extraction
bot.action(/add_lesson_(\d+)/, (ctx) => {
  try {
    const courseId = parseInt(ctx.match[1], 10); // Extract courseId from the action data
    console.log('Action data:', ctx.match[0]); 
    console.log('Extracted courseId:', courseId); 

    if (isNaN(courseId)) {
      ctx.reply('Курс идентификаторы дұрыс емес. Қайтадан енгізіңіз.');
      return;
    }

    // Set the user's step to awaiting lesson name input
    currentStep[ctx.from.id] = {
      step: 'awaiting_lesson_name',
      courseId,
    };
    console.error(currentStep);

    ctx.reply('Сабақтың атын енгізіңіз👇:');
  } catch (error) {
    console.error('Error in add_lesson action:', error);
    ctx.reply('Қате пайда болды. Қайта көріңіз.');
  }
});

// Unified text handler for course and lesson creation process
bot.on('text', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const step = currentStep[userId];
    
    if (step) {
      switch (step.step) {
        // Handle course creation steps
        case 'awaiting_course_name':
          step.courseName = ctx.message.text;
          step.step = 'awaiting_course_description';
          await ctx.reply('Курстың сипаттамасын енгізіңіз👇:');
          break;

        case 'awaiting_course_description':
          step.courseDescription = ctx.message.text;
          const courseName = step.courseName;
          const courseDescription = step.courseDescription;
          try {
            const response = await createCourse(userId, courseName, courseDescription);
            await ctx.reply('Курс сәтті қосылды!✅', Markup.inlineKeyboard([
              Markup.button.callback('Басқа курсты қосу📕', 'create_course'),
              Markup.button.callback('Артқа🔙', 'back_to_menu'),
            ]));
          } catch (error) {
            await ctx.reply('Курсты қосу кезінде қате пайда болды. Қайта көріңіз.');
          }
          delete currentStep[userId];
          break;

        // Handle lesson creation steps
        case 'awaiting_lesson_name':
          step.lessonName = ctx.message.text;
          step.step = 'awaiting_lesson_description';
          await ctx.reply('Сабақтың сипаттамасын енгізіңіз👇:');
          break;

        case 'awaiting_lesson_description':
          step.lessonDescription = ctx.message.text;
          step.step = 'awaiting_lesson_url';
          await ctx.reply('Сабақтың url-ін енгізіңіз👇:');
          break;

        case 'awaiting_lesson_url':
          step.lessonUrl = ctx.message.text;
          const { courseId, lessonName, lessonDescription, lessonUrl } = step;
          try {
            const response = await addLesson(userId, courseId, lessonName, lessonDescription, lessonUrl);
            await ctx.reply('Сабақ сәтті қосылды!✅', Markup.inlineKeyboard([
              Markup.button.callback('Басқа сабақ қосу📘', `add_lesson_${courseId}`),
              Markup.button.callback('Курстардың тізімі📚', 'list_courses'),
              Markup.button.callback('Бас меню📲', 'back_to_menu'),
            ]));
          } catch (error) {
            await ctx.reply('Сабақты қосу кезінде қате пайда болды. Қайта көріңіз.');
          }
          delete currentStep[userId];
          break;

        default:
          ctx.reply('Белгісіз қадам, қайтадан бастаңыз.');
          delete currentStep[userId];
          break;
      }
    } else {
      ctx.reply('Please choose an option from the menu.', Markup.inlineKeyboard([
        Markup.button.callback('Жаңа курс қосу📗', 'create_course'),
        Markup.button.callback('Менің курстарым📚', 'list_courses'),
      ]));
    }
  } catch (error) {
    console.error('Error processing input:', error);
    ctx.reply('Қате пайда болды. Қайта көріңіз.');
  }
});

bot.action(/list_lessons_(\d+)/, async (ctx) => {
  try {
    const courseId = parseInt(ctx.match[1], 10); 
    const userId = ctx.from.id;
    const lessons = await getCourseLessons(userId, courseId);

    if (!lessons || lessons.length === 0) {
      return ctx.reply('Бұл курста сабақтар жоқ.');
    }
    const buttons = lessons.map((lesson) => 
      Markup.button.callback(lesson.name, `view_lesson_${lesson.id}_${courseId}`)
    );
    buttons.push(Markup.button.callback('Курстың мәліметтеріне оралу🔙', `course_${courseId}`));
    await ctx.reply(
      'Сабақтар тізімін таңдау үшін төмендегі тізімнен таңдаңыз:',
      Markup.inlineKeyboard(buttons, { columns: 1 })
    );
  } catch (error) {
    console.error('Error fetching lessons:', error);
    await ctx.reply('Сабақтарды алу кезінде қате пайда болды. Қайта көріңіз.');
  }
});

bot.action(/view_lesson_(\d+)_(\d+)/, async (ctx) => {
  try {
    const lessonId = parseInt(ctx.match[1], 10);
    const couseId = parseInt(ctx.match[2], 10); 
    const userId = ctx.from.id;

    // Fetch the lesson details using the helper function
    const lesson = await getLesson(userId, couseId, lessonId);

    // Check if the lesson was found
    if (!lesson) {
      return ctx.reply('Сабақ табылмады.');
    }

    // Display the lesson details to the user
    await ctx.reply(
      `Сабақтың аты:👉 ${lesson.name}\nСипаттамасы:👉 ${lesson.description}\nСілтеме: ${lesson.url}`,
      Markup.inlineKeyboard([
        [Markup.button.callback('Курстың мәліметтеріне оралу🔙', `course_${lesson.courseId}`)],
        [Markup.button.callback('Бас меню📲', 'back_to_menu')],
      ])
    );
  } catch (error) {
    console.error('Error fetching lesson details:', error);
    await ctx.reply('Сабақты алу кезінде қате пайда болды. Қайта көріңіз.');
  }
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
