<template>
<div class="timeline py-3" v-if="stations">
    <ul class="p-0">
        <train-timeline-item :item="stop" v-for="stop in stops" :key="stop.LocationSignature" :select="select" :selected="selected" />
    </ul>
</div>
</template>

<script>
import moment from 'moment';
import {
    uniqBy,
    sortBy,
    reverse
} from 'lodash';

export default {
    props: {
        stations: Array,
        selected: Object,
        select: Function
    },
    computed: {
        stops() {
            return reverse(sortBy(uniqBy(this.stations, x => x.LocationSignature), x => x.AdvertisedTimeAtLocation));
        }
    }
}
</script>

<style lang="less">
@dark-grey: #808080;
@light-grey: #d9d9d9;

.timeline {

    ul {
        margin: 0;
        list-style: none;
        position: relative;

        &::before {
            content: ' ';
            height: 100%;
            width: 1px;
            background-color: @light-grey;
            position: absolute;
            top: 0;
            left: 1.2em;
            z-index: 0;
        }
    }

    li {
        position: inherit;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 2em 2em auto auto;
        align-items: center;
    }

    .bullet {
        width: 1em;
        height: 1em;
        box-sizing: border-box;
        border-radius: 50%;
        z-index: 1;
        margin-right: 1em;
    }

    .time {
        font-size: 0.75em;
        padding-top: 0.25em;
    }

    h3 {
        font-size: 0.9em;
        font-weight: 400;
        margin: 0;
    }

    h4 {
        margin: 0;
        font-size: 0.7em;
        font-weight: 400;
        color: @dark-grey;
    }

    .people img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
}
</style>
