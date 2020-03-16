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
		                <b>description updating...</b>
                        <br/><br/>
                        AR Installation.
                        <br/>
                        <b>Cooperated with Hsiangfu Chen</b>

                    </p>
                </div>
                <div class="gallery">
                    <v-gallery :images="imageList" control-title="false"></v-gallery>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import worksJson from '@/assets/works.json';
    import BackgroundVideo from './BackgroundVideo';
    export default {
        name: 'TimeCapsuleProject',
        components:{
            BackgroundVideo
        },
        data(){
            return{
                ...worksJson[4],
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
         @media only screen and (max-width: 720px) {
            .open-button,.close-button {
                display: hidden;
            }
        }
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
            height: 100%;
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