import TelegramBot from 'node-telegram-bot-api'

export default defineComponent({
	async run({ steps, $ }) {
		const telegramToken = `${process.env.telegramToken}`
		const maeuschenChatId = `${process.env.maeuschenChat}`
		const igelChatId = `${process.env.igelChat}`

		const bot = new TelegramBot(telegramToken);

		let textMessage = steps.trigger.event.body.text;

		const addresses = steps.trigger.event.headers.to.value;
		const hasIgel = addresses.filter(({ address }) => address.includes("igel")).length > 0;
		const hasMaueschen = addresses.filter(({ address }) => address.includes("maueschen")).length > 0;

		if (textMessage.trim().length !== 0) {
			if (hasMaueschen)
				await bot.sendMessage(maeuschenChatId, textMessage);
			if (hasIgel)
				await bot.sendMessage(igelChatId, textMessage);
		}

		return steps.trigger.event.body
	},
})
