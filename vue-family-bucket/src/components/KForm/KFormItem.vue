<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if="error">{{error}}</p>
    </div>
</template>

<script>
import Schema from "async-validator"
import emitter from "@/mixins/emitter"
export default {
    componentName: 'KFormItem',
    inject:['form'],
    mixins: [emitter],
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String
        }
    },
    data() {
        return {
            error: ''
        }
    },
    created() {
        
    },
    mounted(){
        this.$on('validate', ()=>{
            this.validate()
        })
        // 派发事件通知KForm，新增一个KFormItem实例
        if(this.prop){
            this.dispatch('KForm', 'kkb.form.addField', [this])
        }
    },
    methods:{
        validate(){
            const data = this.form.model[this.prop]
            const rules = this.form.rules[this.prop]

            const desc = {[this.prop]: rules}

            const schema = new Schema(desc)
            return schema.validate({[this.prop]: data}, errors => {
                if(errors){
                    this.error = errors[0].message
                }else {
                    this.error = ''
                }
            })
        }
    }
}
</script>

<style>

</style>