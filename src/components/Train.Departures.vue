<template>
<div class="w-full p-6 border-t-2 ">
    <h3 class="pb-3">Välj station</h3>
    <div class="flex flex-wrap">
        <div :class="classesFor(stations[key])" @click="didSelect(stations[key])" v-for="key in Object.keys(stations)" :key="stations[key].ActivityId">{{displayName(stations[key])}}</div>
    </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        stations: Object,
        selected: Object,
        didSelect: Function
    },
    computed: {
        activeDepartures() {
            //return this.stations.filter(this.isActive);
            return [];
        }
    },
    methods: {
        displayName(train) {
            return moment(train.TimeAtLocation).format('HH:mm');
        },
        isActive(x) {
            return moment(x.TimeAtLocation).isAfter();
        },
        backgroundFor(train) {
            let isSelected = this.selected && this.selected.ActivityId == train.ActivityId;
            let isActive = this.isActive(train);

            if (isSelected && isActive) {
                return 'bg-indigo-darker';
            }

            if (isSelected) {
                return 'bg-grey-darker';
            }
            return this.isActive(train) ?'bg-indigo' : 'bg-grey';
        },
        classesFor(train) {
            return ['p-2', 'm-2', this.backgroundFor(train), 'rounded', 'text-white', 'text-sm'];
        }
    }
}
</script>
