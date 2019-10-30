<template>
	<div class="capsule1">
		<p v-if="WaitingForResponse == false" id="respond">{{ chat.respond }}</p>
		<div v-else style="width:100%; text-align: left;">
			<ResponsePending />
		</div>
		<div id="sound-box"></div>
		<div v-if="docReady === true" class="input-footer">
			<div class="input-wrapper">
				<input
					v-model="chat.user_sentence"
					class="text-input"
					type="text"
					placeholder="talk with me here"
					autofocus
					@keyup.enter="requestResponse()"
				/>
			</div>
			<button class="send-button" @click="requestResponse()">
				<img src="../assets/icon/send.png" alt="send" />
			</button>
		</div>
	</div>
</template>
<script>
import ResponsePending from './ResponsePrending';
import { mapState } from 'vuex';
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
	computed: {
		...mapState(['docReady'])
	},
	mounted() {
		this.getSoundResponse(this.chat.respond);
	},

	methods: {
		getSoundResponse(data) {
			console.log('send sound request!');
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
			document.querySelector('.text-input').value = '';
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


#respond {
	font-family: 'Montserrat', sans-serif;
	margin-top: 10%;
	font-weight: 500;
	font-size: 30px;
	text-align: left;
}

.input-footer {
	bottom: 50px;
	left: 20%;
	position: fixed;
	width: 60%;
}
.input-wrapper {
	display: inline-block;
	border: rgb(225, 247, 246) solid 2px;
	border-radius: 1.5em;
	width: calc(90% - 50px);
}
.text-input {
	text-align: left;
	size: 4em;
	height: 4em;
	width: 94.5%;
	background: rgb(172, 225, 222);
	border-radius: 1em;
	margin: 2.5%;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	-webkit-animation-name: swipe-in; /* Safari 4.0 - 8.0 */
	-webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
	animation-name: swipe-in;
	animation-duration: 4s;
	border: none;
}
.send-button {
	width: 50px;
	height: 50px;
	margin: 2.5%;
	display: inline-block;
	vertical-align: middle;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
	border: none;
	background: none;
}

/* Safari 4.0 - 8.0 */
@-webkit-keyframes swipe-in {
	from {
		background-color: none;
		width: 0;
		border: none;
	}
	to {
		background-color: rgb(172, 225, 222);
		width: 90%;
		border: none;
	}
}

/* Standard syntax */
@keyframes swipe-in {
	from {
		background-color: none;
		width: 0;
		border: none;
	}
	to {
		background-color: rgb(172, 225, 222);
		width: 90%;
		border: none;
	}
}

#sound-box {
	display: none;
}
img{
	background: none;
}
@media only screen and (max-width: 600px) {
	.input-footer {
		width: 90%;
		left: 8%;
	}
}
</style>
