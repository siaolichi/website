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
                    <br>
                    What’s the image of AI in our mind? Maybe cool, be dangerous, 
                    be marvelous, but it can also be friendly, and cute. Like Doraemon.
                    <br>
                    Alan Turing said that he design a machine like a child, not an adult. 
                    He also argued that it might be good if his child computer acted randomly, 
                    at least some of that time.
                    <br> Take it easy, and make everything possible. that’s what my project want to achieve.
                    
                    <br>This newspaper is written by my little AI journalist. Like most of three year old children,
                    it read lot’s of fairytale and children’s books. Such like Grimm, one thousand and one night, 
                    also fairytale from japan, brazil. 
                    It will keep on reading lot’s fairytale. It is going to discover the world through its tiny digital 
                    eyes, and share with people what it saw in the newspaper and website.
                    <br>
                    <br>
                    reference:
                    <br>
                    In the machine learning part, I use the "Story teller" by Ryan Kiros
                    <br>https://github.com/ryankiros/neural-storyteller
                    <br>
                    <br>
                    <a class='link' 
                        style='font-weight: bold; font-size: 12pt; color: #000;' 
                        href='https://siaolichi.github.io/MyTinyNews/' 
                        target='_blank'>Website
                    </a>
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
        name: 'TimeCapsuleProject',
        data(){
            return{
                ...worksJson[2],
                showDescription: true,
                showPhotos: true,
                imageList: []
            }
        },
        components:{
            BackgroundVideo
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