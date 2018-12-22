<template>
<div class="text-lg text-white bg-indigo-darker p-4  flex flex-row justify-between">
    <div class="flex flex-row" @click="toggle">
        <div class="bg-indigo px-3 py-1 text-sm font-bold flex items-center align-center hidden md:block">
            {{information.AdvertisedTrainIdent}}
        </div>
        <div class="p-1 px-3">
            {{information.FromLocation.AdvertisedShortLocationName}} - {{information.ToLocation.AdvertisedShortLocationName}}
        </div>
    </div>
    <div class="flex flex-row">
        <v-tag color="none" text-color="white" class="hidden md:block" v-if="haReachedDestination" :border="false">
            Tåget har nått sin destination
        </v-tag>
        <v-tag color="none" text-color="white" class="hidden md:block" v-else-if="nextStop" :border="false">
            {{nextStopDisplayName}}
        </v-tag>
         <div class="border-white border-2 font-bold text-white hover:border-red hover:bg-red hover:text-white px-3 py-1 text-sm flex items-center align-center hidden sm:block" @click="remove(information.AdvertisedTrainIdent)">
            Ta bort
        </div>
    </div>
</div>
</template>

<script>
import moment from "moment";
import {
    uniqBy,
    sortBy
} from 'lodash';
import {
    GetStation
} from "@/api/trafikverket.js";

export default {
    props: {
        stations: Array,
        toggle: Function,
        remove: Function
    },
    computed: {
        information() {
            let train = this.stations[0];

            return {
                AdvertisedTrainIdent: train.AdvertisedTrainIdent,
                FromLocation: GetStation(train.FromLocation[0]),
                ToLocation: GetStation(train.ToLocation[0])
            };
        },
        destinationsLeft() {
            let left = this.stations.filter(this.inFuture);

            return sortBy(uniqBy(left, x => x.LocationSignature), x => x.AdvertisedTimeAtLocation);
        },
        haReachedDestination() {
            return this.destinationsLeft.length === 0
        },
        nextStop() {
            if (!this.destinationsLeft || !this.destinationsLeft.length) {
                return null;
            }

            return this.destinationsLeft[0];
        },
        nextStopDisplayName() {
            let station = GetStation(this.nextStop).AdvertisedShortLocationName;
            let time = moment(this.nextStop.AdvertisedTimeAtLocation).fromNow();

            if (this.isArrival(this.nextStop)) {
                return `Ankommer till ${station} ${time}`
            }
            return `Avgår från ${station} ${time}`
        }
    },
    methods: {
        inFuture(item) {
            return moment(item.AdvertisedTimeAtLocation).isAfter();
        },
        isArrival(item) {
            return item.ActivityType == "Ankomst";
        }
    }
};
</script>
