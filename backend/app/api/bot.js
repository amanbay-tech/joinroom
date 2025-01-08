const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.CLIENT_BOT_TOKEN);

exports.getUserId = async (username) => {
    try {
        const userInfo = await bot.telegram.getChat(`@${username}`);
        console.log(`User ID: ${userInfo.id}`);
        return userInfo.id;
    } catch (error) {
        console.error('Error fetching user ID:', error.message);
        return null;
    }
};

exports.sendMessage = async (chatId, message) => {
    try {
        await bot.telegram.sendMessage(chatId, message);
        console.log(`Message sent to ${chatId}: ${message}`);
    } catch (error) {
        console.error(`Error sending message to ${chatId}:`, error.message);
    }
};
