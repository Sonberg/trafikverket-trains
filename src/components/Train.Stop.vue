<template>
<div class="p-6 m-3 flex flex-col">
    <div class="flex flex-row justify-between">
        <div>
            <p class="text-sm mb-2 uppercase" v-html="primaryStop.InformationOwner" />
            <h2 v-html="displayName" />
        </div>
        <div class="flex flex-row flex-wrap my-3">
            <v-tag color="red-light" text-color="white" v-if="isCanceled">Inställd</v-tag>
            <v-tag color="yellow-light" v-if="isLate">Ny tid</v-tag>
        </div>
    </div>
    <div class="flex flex-row mt-3">
        <div v-for="stop in stops" :key="stop.ActivityId" class="mr-3 border border-grey rounded p-3">
            <h3 v-html="stop.ActivityType == 'Ankomst' ? 'Ankommer' : 'Avgår'" />
            <p v-html="displayTime(stop.EstimatedTimeAtLocation)" v-if="stop.EstimatedTimeAtLocation" />
            <p v-html="displayTime(stop.AdvertisedTimeAtLocation)" :class="{ 'line-through text-sm' : stop.EstimatedTimeAtLocation }" />
        </div>
    </div>
    <div v-if="false">
        <ul>
            <li v-html="primaryStop.TypeOfTraffic" />
            <li v-for="info in primaryStop.OtherInformation" :key="info" v-html="info" v-if="primaryStop.OtherInformation" />
            <li v-for="info in primaryStop.ProductInformation" :key="info" v-html="info" v-if="primaryStop.ProductInformation" />
        </ul>
    </div>
</div>
</template>

<script>
import {
    GetStation
} from "@/api/trafikverket.js";

import moment from 'moment';

export default {
    props: {
        primaryStop: Object,
        stops: Array
    },
    computed: {
        station() {
            return GetStation(this.primaryStop);
        },
        displayName() {
            return this.station.AdvertisedLocationName;
        },
        isLate() {
            return this.primaryStop.EstimatedTimeAtLocation;
        },
        isCanceled() {
            return this.primaryStop.Canceled;
        },
    },
    methods: {
        displayTime(date) {
            return moment(date).format("HH:mm");
        }
    }
}
</script>
