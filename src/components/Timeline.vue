<template>
    <div id="cv-timeline">
    <div class="content">
            <div class="performances-wrapper" v-if="currentContent.performances">
                <b>Performances</b>
                <p class="performances" v-for="item in currentContent.performances" :key="item">
                    {{item}}
                </p>
                <br>
            </div>
            <div class="performances-wrapper" v-if="currentContent.exhibitions">
                <b>exhibitions</b>
                <p class="performances" v-for="item in currentContent.exhibitions" :key="item">
                    {{item}}
                </p>
            </div>
        </div>
        <div class="timeline" v-dragscroll>
            <ul class="timeline-list">
                <li style="width: 50px; height:100%; display: inline-block;"></li>
                <li class="timeline-item -date" @click="selectYear($event)">
                    <span>2013</span>
                </li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item -date" @click="selectYear($event)">
                    <span>2014</span>
                </li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item -date" @click="selectYear($event)">
                    <span>2015</span>
                </li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item -date" @click="selectYear($event)">
                    <span>2016</span>
                </li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item -date" @click="selectYear($event)">
                    <span>2017</span>
                </li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item -date" @click="selectYear($event)">
                    <span>2019</span>
                </li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item"></li>
                <li class="timeline-item -date" @click="selectYear($event)">
                    <span>2020</span>
                </li>
                <li style="width: 50px; height:100%; display: inline-block;"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { dragscroll } from 'vue-dragscroll'
    export default {
        name: 'Timeline',
        directives: {
            'dragscroll': dragscroll
        },
        data() {
            return {
                exhibitions: {
                    2013: [
                        'National Palace Museum, Qianlong C.H.A.O. New Media Art , interactive installation',
                        'Digital Art Festival Taipei',
                    ],
                    2014: [
                        'The 12th Taoyuan Creation Award'
                    ],
                    2017: [
                        'Cooperation project \'Diaspora\', Asia contemporary art platform NON Berlin'
                    ],
                    2019: [
                        'PANORAMA Shenzhen New Media Art Festival, Cutural Center Exhibition Gallery, Shenzen',
                        'Beyond Gender, Factory Berlin, Germany',
                        'Asia Now, Asian Art Fair, Paris, France'
                    ],
                    2020: [
                        'Stranger Thing at Slient Green, Berlin, Germany'
                    ]
                },
                performances: {
                    2015: [
                        'Chaning, Ausland, Berlin'
                    ],
                    2016: [
                        '0ff2n0ff, Tresor Linz, Linz'
                    ],
                    2017: [
                        'Emitter Micro, Ausland, Berlin'
                    ]
                },
                currentContent: {
                    exhibitions: ['Stranger Thing at Slient Green, Berlin, Germany']
                }
            }
        },
        mounted () {
            const vm = this;
            window.addEventListener('scroll',this.initScroll);
        },
        destroyed () {
        },
        methods: {
            initScroll() {
                if((this.$el.getBoundingClientRect().top < 350) && (this.$el.childNodes[1].scrollLeft < 490)) {
                    this.$el.childNodes[1].scrollBy({ top: 0, left: 2000, behavior: 'smooth' });
                    console.log("Here");
                    window.removeEventListener('scroll',this.initScroll);
                }
            },
            selectYear(event) {
                const year = event.target.innerText;
                const timelineElement = event.target.offsetParent;
                const leftPos = event.target.offsetLeft + event.target.offsetWidth/2;
                const parentWidth = timelineElement.offsetWidth;
                timelineElement.scroll({ top: 0, left: leftPos - parentWidth/2, behavior: 'smooth' });
                this.currentContent.exhibitions = this.exhibitions[year]
                this.currentContent.performances = this.performances[year]
                // console.log(this.currentContent)
            }
        },
    }
</script>

<style lang="scss" scoped>
    $bgcolor: white;
    $maincolor: rgb(45,44,46);
    #cv-timeline{
        width: 100%;
        height: 500px;
        text-align: center;
        overflow: hidden;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        margin-top: 80px;
        &:before,
            &:after {
                content: '';
                width: 20px;
                position: absolute;
                bottom: 0;
                height: 100%;
                z-index: 1;
            }

            &:before {
                left: 0;
                background-image: linear-gradient(to right, $bgcolor, rgba($bgcolor,0));
            }

            &:after {
                right: 0;
                background-image: linear-gradient(to right, rgba($bgcolor,0), $bgcolor);
            }
        }
        .content {
            margin: auto;
            margin-top: 100px;
            width: 80%;
            height: calc( 100% - 100px );
            text-align: left;
            z-index: 2;
        }
        /* timeline */
        .timeline {
            left: 0;
            bottom: -15px;
            width: 100%;
            position: absolute;
            overflow-x: scroll;
            overflow-y: hidden;
            margin-top: 2.25em;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            /* timeline ul */
            .timeline-list {
                // position: absolute;
                width:100%;
                height: 100%;
                margin: 0;
                padding: 0;
                white-space: nowrap;
                list-style: none;
                transition: transform 600ms cubic-bezier(0.680, -0.550, 0.265, 1.550);
            }

            .timeline-item {
                display: inline-block;
                vertical-align: top;
                width: 24px;

                &:before {
                    content: '';
                    display: block;
                    margin: 0 auto;
                    width: 2px;
                    height: 8px;
                    background: $maincolor;
                }

                &.-date {
                    width: 36px;
                    cursor: pointer;
                    span {
                        display: block;
                        margin: 2em 0;
                        font-weight: 700;
                    }

                    &:before {
                        width: 4px;
                        height: 14px;
                    }
                }
            }
        }
</style>