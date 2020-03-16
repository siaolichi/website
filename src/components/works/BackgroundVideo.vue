<template>
    <div class="vimeo-wrapper" v-if="url" >
        <iframe :src="url+'?background=1&autoplay=1&loop=1&byline=0&title=0'"
            frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
</template>

<script>
    export default {
        name: 'BackgroundVideo',
        props:{
            url: {
                type: String
            }
        }
    }
</script>

<style lang="scss" scoped>
    .vimeo-wrapper {
        @media only screen and (min-width: 720px) {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            pointer-events: none;
            overflow: hidden;
        }
        width: 100%;
        position: relative;
        margin-top: 100px;
            iframe {
                width: 100vw;
                height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
                min-height: 100vh;
                min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            @media only screen and (max-width: 760px) {
            iframe {
                min-height: 0;
            }
        }
            
        }
</style>