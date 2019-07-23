<template>
	<div class="capsule1">
		<p v-if="WaitingForResponse == false" id="respond">{{ chat.respond }}</p>
		<div v-else style="width:100%; text-align: left;">
			<ResponsePending />
		</div>
		<div id="sound-box"></div>
		<input
			v-model="chat.user_sentence"
			class="form-control form-control-lg"
			type="text"
			placeholder="talk with me here"
			@keyup.enter="requestResponse()"
		/>
	</div>
</template>
<script>
import ResponsePending from './ResponsePrending';
export default {
	name: 'Capsule1',
	components: {
		ResponsePending
	},
	data() {
		return {
			chat: {
				user_sentence: '',
				respond: 'Hello, My name is Li-Chi. Today is July 9th 2018'
			},
			WaitingForResponse: false
		};
	},
	mounted() {
		this.getSoundResponse(this.chat.respond);
	},

	methods: {
		getSoundResponse(data) {
			this.axios
				.post(`${process.env.VUE_APP_API_URI}/sound`, {
					generate_sound: data
				})
				.then(response => {
					document.querySelector('#sound-box').innerHTML = response.data;
					console.log(response);
				})
				.catch(err => console.log(err));
		},

		requestResponse() {
			const vm = this;
			console.log('got!');
			document.querySelector('.form-control').value = '';
			vm.WaitingForResponse = true;
			this.axios
				.post(`${process.env.VUE_APP_API_URI}/response`, {
					user_sentence: this.chat.user_sentence
				})
				.then(response => {
					console.log(response.data);
					vm.WaitingForResponse = false;
					vm.chat.respond = response.data.response;
					this.getSoundResponse(response.data.response);
				});
		}
	}
};
</script>
<style scoped>
.capsule1 {
	width: 80%;
	height: 80vh;
	height: calc(var(--vh, 1vh) * 90);
	margin: auto;
}
.form-control {
	bottom: 50px;
	left: 20%;
	position: fixed;
	text-align: left;
	size: 3em;
	height: 3em;
	width: 60%;
	margin: auto;
}
#respond {
	font-family: 'Chogokuboso Gothic';
	font-weight: 500;
	font-size: 120px;
	text-align: left;
}

.sound-box {
	display: none;
}
</style>
