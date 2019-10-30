<template>
    <div class="work-container">
        <Three />
		<Chatbot />
    </div>
</template>

<script>
import Three from '@/components/Three.vue';
import Chatbot from '@/components/Chatbot.vue';
export default {
    name: 'TimeCapsuleProject',
    components: {
    Three,
    Chatbot
}
    
}
</script>

<style lang="scss" scoped>
    .work-container{
        // background-image: url('../../assets/images/201801/001.png');
    }
</style>