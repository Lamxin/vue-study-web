<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    componentName: 'KForm',
    provide() {
        return {
            form: this
        }
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        rules: {
            type: Object
        }
    },
    data() {
        return {

        }
    },
    created() {
        this.fileds = []
        this.$on('kkb.form.addField', item => {
            this.fileds.push(item)
        })
    },
    methods: {
        validate(cb) {
            const tasks = this.fileds
            // .filter(item => item.prop)
            .map(item => item.validate())
            Promise.all(tasks).then(()=>{
                cb(true)
            }).catch(()=>{
                cb(false)
            })
        }
    }
}
</script>

<style>

</style>