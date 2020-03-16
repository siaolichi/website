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
		                Shan shui painting, 
                        refers to a style of traditional Chinese painting that involves or depicts scenery or natural landscapes, 
                        using a brush and ink rather than more conventional paints. 
                        In Chinese, “Shan” is mountain and “Shui” is water, 
                        but the two elements together signify a landscape. 
                        When Chinese painters work on shan shui painting, 
                        they do not try to present an image of what they have seen in the nature, but what they have thought about nature.
                        <br><br>
                        Chinese Shan shui painting was brought to Taiwan with a plenty of immigrants, 
                        just like other immigrant culture, after thee generations, 
                        new generations began to reflect on the relationship between original culture and themselves.
                        <br><br>
                        Through this project, I began to think what is the nature of Taiwan in my mind. 
                        Taiwan is a island which full of mountain and rain. In my hometown, 
                        the best time to see the mountain after raining days. In this time, 
                        there are no impurities but some steam in the air, 
                        the shape of mountains are clear but soft. 
                        It feel like a landscape with stretched mountains which made by rain.
                        <br><br>
                        In oder to reproduce the image, I made a installation to create mountains by rain. 
                        In the upside of five acrylic plates are five tube. 
                        The whole installation connect to the weather of Taiwan’s five longitudinal mountain ranges. 
                        Each tube represent a mountain from north to south. 
                        If the mountain is raining, the tube will begin to supply ink, 
                        when ink drop down into the gap between five acrylic plate, it create the shape of mountains.<br>


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
                ...worksJson[5],
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