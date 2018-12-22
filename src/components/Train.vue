<template>
<div class="my-8 shadow-lg">

    <train-header :stations="stations" :toggle="toggle" :remove="remove" />

    <div class="text-lg text-indigo-darker bg-white flex flex-col" v-if="open">
        <div class="w-full flex flex-row flex-wrap" v-if="stations[0]">
            <div class="py-6 px-3 w-full md:w-1/2">
                <train-timeline :stations="stations" :selected="selected" :select="didSelect" />
            </div>

            <div class="p-6 pl-3 w-full md:w-1/2" v-if="selected">
                <train-stop :primaryStop="selected" :stops="stopsAt(selected.LocationSignature)"/>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import {
    GetStation
} from '@/api/trafikverket.js';

export default {
    name: 'train',
    props: {
        stations: Array,
        remove: Function
    },
    data: () => ({
        open: false,
        selected: this && this.stations ? this.stations[0] : null
    }),
    methods: {
        toggle() {
            this.open = !this.open
        },
        didSelect(station) {
          console.log(station);
          
            this.selected = station;
        },
        stopsAt(location) {
          return this.stations.filter(x => x.LocationSignature === location);
        }
    }
}
</script>
