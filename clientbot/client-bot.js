require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.CLIENT_BOT_TOKEN);
const {
  createUser,
  getAllCourses,
  getMyCourses,
  getCourse,
  getMyCourse,
  subscribeCourse,
  getCourseLessons,
  getLesson,
  approve
  
  
} = require('./joinroom-client');

// Mock data for available courses
const availableCourses = [
  { id: '101', name: 'JavaScript негіздері', description: 'JavaScript тілінің негізгі қағидаларын үйреніңіз.' },
  { id: '102', name: 'Node.js бастауыштарға', description: 'Node.js және сервер жағы JavaScript-ті түсіну.' },
  { id: '103', name: 'React тереңдетілген курс', description: 'React кітапханасындағы концептілер мен үлгілерді зерттеңіз.' },
];



bot.start(async (ctx) => {
  try{
    const userId = ctx.from.id;
    const username = ctx.from.username; 
  
    await createUser(userId, username);;
    return ctx.reply(
      'Қош келдіңіз!🤗 Қызметті таңдаңыз:',
      Markup.inlineKeyboard([
        [Markup.button.callback('Жаңа курсқа жазылу➕', 'subscribe')],
        [Markup.button.callback('Менің курстарым📚', 'list_courses')]
      ])
    );
  }catch(error) {
    ctx.reply('Sorry, there was an error fetching the data.');
  }
  
});

bot.action('subscribe', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const availableCourses = await getAllCourses(userId);
    if (!availableCourses || availableCourses.length === 0) {
      return ctx.reply('Қазіргі уақытта қолжетімді курстар жоқ.');
    }
    const buttons = availableCourses.map((course) => 
      Markup.button.callback(course.name, `view_course_${course.id}`)
    );
    buttons.push(Markup.button.callback('Артқа🔙', 'back_to_menu'));
    await ctx.editMessageText(
      'Курс таңдау үшін төмендегі тізімнен таңдаңыз:',
      Markup.inlineKeyboard(buttons, { columns: 1 })
    );
  } catch (error) {
    console.error('Error fetching courses:', error);
    await ctx.reply('Курстарды алу кезінде қате пайда болды. Қайта көріңіз.');
  }
});


bot.action('list_courses', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const courses = await getMyCourses(userId);

    if (!courses || courses.length === 0) {
      return ctx.reply(
        'Сіз ешқандай курсқа әлі жазылған жоқсыз.',
        Markup.inlineKeyboard([
          Markup.button.callback('Бас менюге оралу📲', 'back_to_menu')
        ])
      );
    }

    const buttons = courses.map((course) => {
      // Ensure each button has a text field
      return Markup.button.callback(course.course.name || 'Курс атауы жоқ', `my_course_${course.id}`);
    });

    buttons.push(Markup.button.callback('Артқа🔙', 'back_to_menu'));

    await ctx.editMessageText(
      'Сіздің жазылған курстарыңыз:',
      Markup.inlineKeyboard(buttons, { columns: 1 })// Use .extra() to ensure correct format
    );
  } catch (error) {
    console.error('Error fetching user courses:', error);
    await ctx.reply('Курстарды алу кезінде қате пайда болды. Қайта көріңіз.');
  }
});

bot.on("callback_query", async (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  const [action, userId] = callbackData.split("_");

  if (action === "approve" || action === "reject") {
    await ctx.answerCbQuery(`Session ${action}d!`);

    const isApproved = action === "approve"; // Determine if approved or rejected

    try {
      // Send userId and approval status to the backend
      const response = await approve(userId, isApproved);
      console.log("Approval response:", response);

      // Notify the user about the result
      const replyMessage = isApproved
        ? "Thank you for approving! 🎉 Your session has been activated."
        : "You rejected the session. You can start again if needed.";
      await ctx.reply(replyMessage);
    } catch (error) {
      console.error(`Error during ${action}:`, error.message);

      // Notify the user if there was an error
      await ctx.reply(
        "An error occurred while processing your request. Please try again later."
      );
    }
  }
});





bot.action(/my_course_(\d+)/, async (ctx) => {
  try {
    const courseId = parseInt(ctx.match[1], 10); 
    const userId = ctx.from.id;

    const course = await getMyCourse(userId, courseId);

    if (!course) {
      return ctx.reply('Курс табылмады.');
    }
    return ctx.reply(
      `Курс атауы:👉 ${course.name}\nСипаттамасы:👉 ${course.description}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Сабақтарды көру📖', `list_lessons_${courseId}`),
        Markup.button.callback('Менің курстарыма оралу📚', 'list_courses'),
        Markup.button.callback('Бас менюге оралу📲', 'back_to_menu')
      ])
    );
  } catch (error) {
    console.error('Error fetching course details:', error);
    await ctx.reply('Курсты алу кезінде қате пайда болды. Қайта көріңіз.');
  }
});
bot.action(/view_course_(\d+)/, async (ctx) => {
  try {
    const id = parseInt(ctx.match[1], 10);
    const userId = ctx.from.id;

    // Fetch course details using the helper function
    const course = await getCourse(userId, id);
    
    // Check if the course was found
    if (!course) {
      return ctx.reply('Курс табылмады.');
    }

    // Display course details with subscription option
    return ctx.reply(
      `Курс атауы:👉 ${course.name}\nСипаттамасы:👉 ${course.description}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Курсқа жазылу📝', `subscribe_to_${course.id}`),
        Markup.button.callback('Курстар тізіміне оралу🔙', 'subscribe')
      ])
    );
  } catch (error) {
    console.error('Error fetching course details:', error);
    await ctx.reply(`Курсты алу кезінде қате пайда болды. Қайта көріңіз.`);
  }
});

// Handle course subscription dynamically
bot.action(/subscribe_to_(\d+)/, async (ctx) => {
  try {
    const courseId = parseInt(ctx.match[1], 10); // Extract courseId from action data
    const userId = ctx.from.id;

    // Fetch course details using the helper function to verify it exists
    const course = await getCourse(userId, courseId);
    if (!course) {
      return ctx.reply('Курс табылмады.');
    }

    // Call the backend API to create a subscription
    await subscribeCourse(userId, courseId);

    // Respond with a confirmation message including the course name
    return ctx.reply(
      `${course.name} - курсына жазылуға сұраныс жіберілді ✅`,
      Markup.inlineKeyboard([
        Markup.button.callback('Бас менюге оралу📲', 'back_to_menu'),
        Markup.button.callback('Курстар тізіміне оралу🔙', 'subscribe')
      ])
    );
  } catch (error) {
    console.error('Error subscribing to course:', error);
    await ctx.reply('Курсқа жазылу кезінде қате пайда болды. Қайта көріңіз.');
  }
});
bot.action(/list_lessons_(\d+)/, async (ctx) => {
  try {
    const courseId = parseInt(ctx.match[1], 10); 
    const userId = ctx.from.id;
    const lessons = await getCourseLessons(userId, courseId);
    console.log("lessons", lessons)

    if (!lessons || lessons.length === 0) {
      return ctx.reply('Бұл курста сабақтар жоқ.');
    }
    const buttons = lessons.map((lesson) => 
      Markup.button.callback(lesson.name, `view_lesson_${lesson.id}_${courseId}`)
    );
    buttons.push(Markup.button.callback('Курстың мәліметтеріне оралу🔙', `my_course_${courseId}`));
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
        [Markup.button.callback('Курстың мәліметтеріне оралу🔙', `my_course_${lesson.courseId}`)],
        [Markup.button.callback('Бас меню📲', 'back_to_menu')],
      ])
    );
  } catch (error) {
    console.error('Error fetching lesson details:', error);
    await ctx.reply('Сабақты алу кезінде қате пайда болды. Қайта көріңіз.');
  }
});

// 'Бас менюге оралу' әрекетін өңдеу
bot.action('back_to_menu', (ctx) => {
  return ctx.reply(
    'Қайта оралдыңыз!🤗 Қызметті таңдаңыз:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Жаңа курсқа жазылу➕', 'subscribe')],
      [Markup.button.callback('Менің курстарым📚', 'list_courses')]
    ])
  );
});

// Ботты іске қосу
bot.launch()
  .then(() => {
    console.log('Бот іске қосылды...');
  })
  .catch((error) => {
    console.error('Ботты іске қосу кезінде қате пайда болды:', error);
  });

// SIGINT немесе SIGTERM болған жағдайда ботты тоқтату
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
