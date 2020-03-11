<template>
    <Modal mask-closable scrollable title="新增代理商"
           :width="500" :loading="isSubmit"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="140"
              @submit.native.prevent>
            <FormItem prop="account" label="套餐ID">
                <Input clearable type="text" placeholder="请输入套餐ID" :maxlength="32" v-model="params.account" @on-enter="handleSubmitForm"/>
            </FormItem>
            <FormItem prop="account" label="商品名称">
                <Input clearable type="text" placeholder="请输入账号" :maxlength="32" v-model="params.account" @on-enter="handleSubmitForm"/>
            </FormItem>
            <FormItem prop="buyMinute" label="购买分钟数">
                <Input clearable type="text" placeholder="请输入密码（6~16位）" :maxlength="16" v-model="params.buyMinute" @on-enter="handleSubmitForm" />
            </FormItem>
            <FormItem prop="priceShow" label="原价">
                <Input clearable type="text" placeholder="请输代理名称" v-model="params.priceShow" @on-enter="handleSubmitForm"/>
            </FormItem>
            <FormItem  prop="price" label="销售价格">
                <Input clearable type="text" placeholder="请输入渠道码" v-model="params.price" @on-enter="handleSubmitForm"/>
            </FormItem>  
            <FormItem  prop="content" label="商品描述">
                <Input clearable type="text" placeholder="请输入渠道码" v-model="params.content" @on-enter="handleSubmitForm"/>
            </FormItem>                           
        </Form>
        <div slot="footer">
            <Button type="text" @click="show = false">取消</Button>
            <Button type="primary" @click="handleSubmitForm">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import { phone } from '@/libs/validator'

    export default {
        name: 'AddAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show (value) {
                if (!value) this.$refs.form.resetFields()
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },
        methods:{
            async handleSubmitForm () {
                if (!await this.$refs.form.validate() || this.isSubmit) return
                
                this.isSubmit = true
                try {
                    
                    const { code, message } = await api.agent.add(this.params)

                    this.isSubmit = false
                    if (code !== 200) {
                        this.$Message.error(message)
                        return
                    }
                    this.show = false
                    this.$emit('on-refresh')
                    this.$Message.success('添加成功')
                } catch (e) {
                    this.isSubmit = false
                    this.$Message.error(e.message)
                }
            },
        },

        data () {
            return {
                show: this.value,
                params: {
                    account: '',
                    password: '',
                    proxyName: '',
                    channelCode:'',
                    adminId:'',
                    content:'',
                    agentId:''
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'change blur' },
                        { pattern: phone, message: '请输入正确的手机号码',min:11}
                    ],
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'change blur' },
                        { min: 2, message: '用户名最少2位字符' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change blur' },
                        { min: 6, max: 16, message: '请输入6~16位的密码' }
                    ],
                    agentId: [
                        { required: true, message: '请输入用户名', trigger: 'change blur' },
                        { min: 2, message: '用户名最少2位字符' }
                    ],
                },

                isSubmit: false
            }
        },
        mounted(){
            this.params.adminId = JSON.parse(window.localStorage.getItem("user")).id
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    /deep/ .agent.ivu-form-item {

        .ivu-form-item-label {
            padding-top: 5px;
        }
    }
</style>
