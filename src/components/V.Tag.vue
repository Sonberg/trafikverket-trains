<template>
    <div :class="[tagClasses, textClasses,  'py-1 px-3 mr-3', { 'border-2' : border }]"><slot/></div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: 'grey'
        },
        textColor: {
            type: String,
            default: 'black'
        },
        border: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        tagClasses() {
            return `bg-${this.color} border-${this.color.split('-')[0]}-dark`;
        },
        textClasses() {
            return `text-sm font-bold text-${this.textColor}`;
        }
    }
}
</script>