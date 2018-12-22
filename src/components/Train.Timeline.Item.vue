<template>
<li :class="['p-3', { 'bg-grey-light' : isSelected } ]" @click="select(item)">
    <div :class="classes"></div>
    <div :class="['time']">
        <p v-html="displayTime(item.EstimatedTimeAtLocation)" v-if="item.EstimatedTimeAtLocation" class="font-bold" />
        <p v-html="displayTime(item.AdvertisedTimeAtLocation)" :class="{ 'line-through' : this.item.EstimatedTimeAtLocation }" />
    </div>
    <div class="desc mx-6">
        <h3 v-html="displayName" />
        <h4 v-html="informationText" />
    </div>
    <div class="flex flex-wrap justify-end">
        <div class="text-sm bg-indigo-darker text-white py-1 px-3 hidden md:block" v-if="item.TrackAtLocation">
            Plattform {{item.TrackAtLocation}}
        </div>
    </div>
</li>
</template>

<script>
import {
    GetStation
} from "@/api/trafikverket.js";
import moment from "moment";

export default {
    props: {
        item: Object,
        selected: Object,
        select: Function
    },
    computed: {
        station() {
            return GetStation(this.item);
        },
        displayName() {
            return this.station.AdvertisedLocationName;
        },
        informationText() {
            if (this.item.EstimatedTimeAtLocation) {
                return "Ny tid";
            }
        },
        time() {
            return (
                this.item.EstimatedTimeAtLocation || this.item.AdvertisedTimeAtLocation
            );
        },
        isCanceled() {
            return this.item.Canceled;
        },
        isSelected() {
            return this.selected && this.selected.ActivityId == this.item.ActivityId;
        },
        inFuture() {
            return moment(this.time).isAfter();
        },
        classes() {
            var classes = ["bullet", "border-2", "border-indigo-darkest"];

            if (this.inFuture && this.isCanceled) {
                classes.push("border-red");
                classes.push("bg-red");
            } else if (this.inFuture) {
                classes.push("border-indigo");
                classes.push("bg-indigo");
            } else {
                classes.push("bg-white");
            }

            return classes;
        }
    },
    methods: {
        displayTime(date) {
            return moment(date).format("HH:mm");
        }
    }
};
</script>
