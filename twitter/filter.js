export default defineComponent({
	async run({ steps, $ }) {
		let condition = false;
		for (const sender of steps.trigger.event.headers.to.value) {
			if (sender.address.includes("twitter"))
				condition = true;
		}
		if (condition == false) {
			$.flow.exit("Ending workflow early because the condition is false")
		} else {
			$.export("$summary", "Continuing workflow, since condition for ending was not met.")
		}
	},
})
