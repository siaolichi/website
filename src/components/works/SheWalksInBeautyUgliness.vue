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
		                When someone wrote "I am happy" on the community website, the community accepted "happy" but replaced "I" with "you".
                        Then "You are happy" becoming a mind of this community. 
                        But in this Community, the word "you" in the sentence "you are happy" can't be defined to any single person. 
                        "You" can be the addresser; 
                        addressee or anyone exists inside or outside of the community. <br/>
                        Now, if we rearrange the words of writer – "You are happy", "I am happy", "You are not happy", "I am not happy" – 
                        they don't violate the writer's original idea, and it also doesn't match the writer's idea form the beginning. <br/>
                        However, it can stand for the community's mind. Therefore, when a person fits into a community, 
                        the community can make his/her words more powerful; on the other side, 
                        the community also weakens one's willing at the same time. In this work, 
                        I tried to use two opposite words for the community to choose. The mostly used can stand for the will of the community. 
                        In this case, I quoted a poem about "beauty", which full of beautiful and gentle words, 
                        written by English poet Byron after he met Mrs. Horton in a party. I pick up the adjectives about beauty, 
                        and choose opposite words, then count the statue on twitter with these words. <br/>
                        And it will show the community's willing of "beauty" or "ugliness".

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
        name: 'SheWalksInBeautyUgliness',
        components:{
            BackgroundVideo
        },
        data(){
            return{
                ...worksJson[8],
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