<template>
	<div class="home">
		<Three />
		<Chatbot />
	</div>
</template>

<script>
// @ is an alias to /src
import Three from '@/components/Three.vue';
import Chatbot from '@/components/Chatbot.vue';

export default {
	name: 'Home',
	components: {
		Three,
		Chatbot
	}
};
</script>
