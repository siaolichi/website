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
		                Internet not only reduces distance of people, 
                        but polarize people. Such like google, 
                        which can filter what they don’t want to see and take priority to show what they prefer. 
                        People are effected by environment and website they search. 
                        Google and Yahoo draw on a user’s past search preferences when responding to queries, 
                        meaning that over time different people might receive ideologically opposite search results having entered identical information. 
                        And some neutral will be effected by environment and website they see. People only connect to other with the same opinion, 
                        it’s called "echo chambers."
                        <br>
                        Every group collect proof to show they are right, 
                        but when they can’t find anything to show off, 
                        they "MAKE" proofs. But when the FAKE proofs come, people can’t make sure the truth in ”echo chambers”. 
                        As we have so much information in Internet, we only can get half by "echo chambers" and keep getting similar message just like in a loop.
                        <br>
                        In this work, I took massages include the letters "mob" or "tyranny" in a box. 
                        But when people look inside the box from left, they only can see the massage about "mob". 
                        For the same way, when people look inside the box from right, they only can see the massage about "tyranny." 
                        Moreover, when they walk closer to read the massage, this massage disappeared. The only thing they can see is "mod" or "tyranny."
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
        name: 'OneSideTruth',
        components:{
            BackgroundVideo
        },
        data(){
            return{
                ...worksJson[7],
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