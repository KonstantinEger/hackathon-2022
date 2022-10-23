function chunkSubstr(str, size) {
	const numChunks = Math.ceil(str.length / size)
	const chunks = new Array(numChunks)

	for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
		chunks[i] = str.substr(o, size)
	}

	return chunks
}

export default defineComponent({
	async run({ steps, $ }) {
		return {
			chunks: chunkSubstr(steps.trigger.event.body.text, 210) // must leave space for @mention
		}
	},
})
