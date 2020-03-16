<template>
    <div class="work-container">
        <Three />
		<ChatbotFooter />
    </div>
</template>

<script>
import Three from '@/components/Three.vue';
import ChatbotFooter from '@/components/ChatbotFooter.vue';
export default {
    name: 'TimeCapsuleProject',
    components: {
    Three,
    ChatbotFooter
}
    
}
</script>

<style lang="scss" scoped>
    .work-container{
        // background-image: url('../../assets/images/201801/001.png');
    }
</style>