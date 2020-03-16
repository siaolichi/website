<template>
    <div id="title-animation">
        <h1><b> Hsiao Li Chi</b></h1>
        <hr>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
#title-animation{
    // font-family: 'Josefin Sans', sans-serif;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    display: flex;
    .home-content{
        width: 100%;
        h1{
            text-align: center;
            width: 100%;
            -webkit-animation-name: fade-in; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
            animation-name: fade-in;
            animation-duration: 4s;
        }
        hr{
            border: solid black 3px;
            width: 90%;
            -webkit-animation-name: swipe-in; /* Safari 4.0 - 8.0 */
            -webkit-animation-duration: 4s; /* Safari 4.0 - 8.0 */
            animation-name: swipe-in;
            animation-duration: 4s;
        }
    }
}
</style>