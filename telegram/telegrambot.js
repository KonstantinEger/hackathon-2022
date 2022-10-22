import TelegramBot from 'node-telegram-bot-api'

export default defineComponent({
    async run({ steps, $ }) {
      const telegramToken = `${process.env.telegramToken}`
      const maeuschenChatId = `${process.env.maeuschenChat}`
      const igelChatId = `${process.env.igelChat}`

      const bot = new TelegramBot(telegramToken);

      let textMessage = steps.trigger.event.body.text;
      
      let email = steps.trigger.event.headers.to.text;

      let groupNameMatched, groupName;

    
        groupNameMatched = email.match(/\+.*\@/)[0];
        groupName = groupNameMatched.substring(1, groupNameMatched.length - 1);


      if (textMessage.trim().length !== 0) {
        switch(groupName) {
            case "maueschen":
                await bot.sendMessage(maeuschenChatId, textMessage);
              break;
            case "igel":
                await bot.sendMessage(igelChatId, textMessage);
              break;
          }
      }
      
      return steps.trigger.event.body
    },
  })