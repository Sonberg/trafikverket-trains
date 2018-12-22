<template>
<div class="my-8 border-2 border-grey-darkest">
    <div class="text-lg text-grey-darker bg-white p-4 flex flex-row justify-between">
        <div class="flex flex-row">
            <div class="bg-grey-darker text-white px-3 py-1 text-sm font-bold flex items-center align-center">
                {{number}}
            </div>
            <div class="p-1 px-3 text-grey-darkest hidden md:block">
                Kunde inte hitta tåget
            </div>
        </div>
        <div class="border-grey-darkest border-2 font-bold text-grey-darkest hover:border-red hover:bg-red hover:text-white px-3 py-1 text-sm flex items-center align-center" @click="remove(number)">
            Ta bort
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        number: String,
        remove: Function
    }
}
</script>
