import { axios } from "@pipedream/platform"

const wait_for_ms = ms => new Promise((res) => {
	setTimeout(res, ms);
});

export default defineComponent({
	props: {
		twitter: {
			type: "app",
			app: "twitter",
		}
	},
	async run({steps, $}) {
		try {
			const len = steps.split_into_twitter_sized_msgs.$return_value.chunks.length;

			const first_resp = await axios($, {
				method: 'post',
				url: 'https://api.twitter.com/1.1/statuses/update.json',
				params: {
					status: `1/${len}: `+ steps.split_into_twitter_sized_msgs.$return_value.chunks[0]
				}
			}, {
				token: {
					key: this.twitter.$auth.oauth_access_token,
					secret: this.twitter.$auth.oauth_refresh_token,
				},
				oauthSignerUri: this.twitter.$auth.oauth_signer_uri,
			});
			let last_tweet_id = first_resp.id_str;

			await wait_for_ms(1500);

			for (let i = 1; i < len; i++) {
				const prefix = (i + 1) + "/" + len + ": ";
				const params = {
					status: prefix + steps.split_into_twitter_sized_msgs.$return_value.chunks[i],
					in_reply_to_status_id: last_tweet_id,
					auto_populate_reply_metadata: "true"
				};
				const resp = await axios($, {
					method: 'post',
					url: 'https://api.twitter.com/1.1/statuses/update.json',
					params
				}, {
					token: {
						key: this.twitter.$auth.oauth_access_token,
						secret: this.twitter.$auth.oauth_refresh_token,
					},
					oauthSignerUri: this.twitter.$auth.oauth_signer_uri,
				});
				last_tweet_id = resp.id_str;
				await wait_for_ms(1500);
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
})

