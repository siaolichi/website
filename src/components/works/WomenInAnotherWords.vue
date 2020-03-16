<template>
    <div class="work-container">
        <BackgroundVideo :url="video"/>
        <button class="open-button" v-if="!showDescription" @click="switchDescription">D</button>
        <button class="close-button" v-else @click="switchDescription">X</button>
        <transition name="fade" mode="out-in">
            <div class="more-detail" v-if="showDescription">
                <div class="description">
                    <h1>{{title}}</h1>
                    <p>{{year}}</p>
                    <p>
                        Collaborate with Taiwan consmetic brand "VesCir".
                        <br>A word to describe your best condition.
                        <br>I put this conception in our audio-visual project. 
                        People can test their skin condition and create threir own moving image.
                        They can either download through app or recieve by E-mail",
                    </p>
                </div>
                <div class="gallery">
                    <v-gallery :images="imageList"></v-gallery>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import worksJson from '@/assets/works.json';
    import BackgroundVideo from './BackgroundVideo';
    export default {
        name: 'WomenInAnotherWords',
        components:{
            BackgroundVideo
        },
        data(){
            return{
                ...worksJson[3],
                showDescription: true,
                showPhotos: true,
                imageList: []
            }
        },
        mounted() {
		    console.log('mounted', this.title);
            this.$store.commit('setDocReady', true);
            for (let photo of this.photos) {
                console.log(photo);
                let url = require(`../../assets/images/${this.id}/${photo}`);
				const item = { title: this.title, url };
				this.imageList.push(item);
			}
        },
        methods:{
            switchDescription(){
                this.showDescription = !this.showDescription;
            },
            switchshowPhotos(){
                this.showPhotos = !this.showPhotos;
            }
        }
        
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/libs/variables.scss";
    .work-container{
        height: 100%;
        .open-button,.close-button {
            background: $white-background-color;
            border: none;
            font-weight: bold;
            font-size: 20px;
            // float: right;
            width: 60px;
            height: 60px;
            margin: 30px;
            border-radius: 30px;
            z-index: 2;
        }
        .more-detail {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            height: 80vh;
            align-items: stretch;
        }
        .description {
            background: $white-background-color;
            font-size: 12px;
            margin: 20px;
            padding: 20px;
            text-align: justify;
            line-height: 1.5em;
            font-weight: 900;
            width: 40%;
        }
        .gallery {
            width: 40%;
            margin: 20px;
        }
        .vimeo-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
            overflow: hidden;
        
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
        }
        @media only screen and (max-width: 760px) {
            .description {
                width: 100%;
            }
            .gallery {
                width: 100%;
            }
        }
    }
</style>