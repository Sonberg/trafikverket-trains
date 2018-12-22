<template>
<div class="flex flex-row">
    <div class="w-full px-4">
        <div class="flex flex-row justify-between">
            <h1 class="text-5xl">Tåg</h1>
        </div>
        <input type="number" class="p-4 bg-indigo w-full text-white text-xl mt-8 focus:outline-none focus:bg-indigo-dark shadow-lg" placeholder="Lägg till tågnummer att bevaka" @keyup.enter="addTrain($event)">

        <train :stations="trains[number]" v-for="number in trainNumbers" :key="number" v-if="trainNumbers.length > 0" :remove="removeTrain"/>
        
        <train-not-found :number="number" v-for="number in trainsNotFound" :key="number + '-not-found'" :remove="removeTrain" />

        <div class="py-4 flex flex-row" v-if="trains.length == 0">

        </div>

        <div class="border-t-2 border-indigo py-6">
            <div class="w-1/3 mb-6">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
        Uppdatera varje
      </label>
                <div class="relative">
                    <select v-model="updateInterval" class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey" id="grid-state">
          <option :value="1000 * 15">15 sekunder</option>
          <option :value="1000 * 30">30 sekunder</option>
          <option :value="1000 * 60" selected>1 minut</option>
          <option :value="1000 * 60">2 minuter</option>
          <option :value="null" >aldrig</option>
        </select>
                    <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import {
    GetTrainNumbers
} from '@/api/trafikverket.js';

import { without } from 'lodash';

export default {
    name: "home",
    components: {},
    computed: {
        selectedTrainNumbers() {
            return (this.$route.query.trains || '')
                .split(',')
                .filter(x => x && x != '');
        },
        trainNumbers() {
            return Object.keys(this.trains);
        },
        trainsNotFound() {
            return this.selectedTrainNumbers.filter(x => this.trainNumbers.indexOf(x) == -1 );
        }
    },
    watch: {
        updateInterval: function (val) {
            if (!val) {
                return this.interval = null;
            }

            this.interval = setInterval(this.update, val)
        }
    },
    data: () => ({
        updateInterval: 1000 * 60,
        interval: null,
        trains: {}
    }),
    methods: {
        removeTrain(val) {
            this.setTrains(this.selectedTrainNumbers.filter(x => x != val));
        },
        addTrain(event) {
            let value = event.target.value;

            if (!value) {
                return;
            }

            this.setTrains([...this.selectedTrainNumbers || [], event.target.value]);
            event.target.value = null;
            this.update();
        },
        setTrains(vals) {

            let uniq = (value, index, self) => {
                return self.indexOf(value) === index && value != '' && value;
            };

            this.$router.push({
                query: {
                    trains: vals.length ? vals.filter(uniq).join(',') : null
                }
            });
        },
        async update() {
            this.trains = await GetTrainNumbers(this.selectedTrainNumbers);
        }
    },
    created() {
        this.update();
        this.interval = setInterval(this.update, this.updateInterval);
    }
};
</script>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
