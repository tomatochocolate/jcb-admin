<template>
    <Modal mask-closable scrollable title="添加套餐"
           :width="500" :loading="isSubmit"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="140"
              @submit.native.prevent>
            <FormItem prop="proxyId" label="代理ID">
                <Input clearable type="text" placeholder="输入代理ID" :maxlength="32" v-model="params.proxyId" @on-enter="handleSubmitForm"/>
            </FormItem>
            <FormItem prop="goodsId" label="套餐ID">
                <Input clearable type="text" placeholder="输入套餐ID" :maxlength="32" v-model="params.goodsId" @on-enter="handleSubmitForm"/>
            </FormItem>
            <FormItem prop="" label="套餐类型">
                <RadioGroup v-model="params.cardType"  size="large">
                    <Radio label='1'>体验卡</Radio>
                    <Radio label='2'>付费卡</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem prop="number" label="数量">
                <Input clearable type="text" placeholder="输入数量" :maxlength="16" v-model="params.number" @on-enter="handleSubmitForm" />
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
    import axios from 'axios'

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
            setMeal(e){
                var obj = { goodsId : 123 , adminId : 1  }
                var str = JSON.stringify(obj)
                
                let that = this
                axios({
                      url: "/api-console/goods/addorupdate", //在线跨域请求
                      method: "post", //默认是get请求
                      //   dataType:'JSON',
                      headers: {
                        //设置请求头
                        // "Content-Type": "application/x-www-form-urlencoded",
                        'token':'000000019DEtx2NGf1adckYbJpjNrkke',
                        'Access-Control-Allow-Origin':'*',
                        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        'Content-Type': 'application/json'
                      },
                      data: {
                        //？search后面的值写在params中
                        // members_id:e.memberId,pageName:'/console/user',flag:1
                        goodsId : this.params.goodsId ,goodsName : this.params.goodsName ,
                        buyMinute : this.params.buyMinute ,priceShow : this.params.priceShow ,
                        price : this.params.price ,content : this.params.content ,
                        adminId : this.params.adminId ,status : this.params.status ,
                        goodsType : this.params.goodsType *1
                      }
                    })
                    .then(function(val) {
                      console.log(val); // axios会对我们请求来的结果进行再一次的封装（ 让安全性提高 ）
                      return val
                    })
                    .catch(function(err) {
                      console.log(err);
                    });
            },
            async handleSubmitForm () {
                if (!await this.$refs.form.validate() || this.isSubmit) return
                
                this.isSubmit = true
                // try {
                    
                //     const abc = await api.coupon.card(this.params)
                //     console.log(abc);
                //     window.open(abc)
                //     const code = 200
                //     this.isSubmit = false
                //     if (code !== 200) {
                //         this.$Message.error(message)
                //         return
                //     }
                //     this.show = false
                //     this.$emit('on-refresh')
                //     this.$Message.success('添加成功')
                // } catch (e) {
                //     this.isSubmit = false
                //     this.$Message.error(e.message)
                // }
                 var that=this;
                 var couponUrl = 'http://192.168.0.160:9988/api-console/admin/export/card?proxyId='+that.params.proxyId+'&number='+that.params.number+'&goodsId='+that.params.goodsId+'&cardType='+that.params.cardType;
                
                console.log(couponUrl);
                
                // var couponUrl =  "http://192.168.0.160:9988/api-console/admin/export/card?proxyId=1&number=1&goodsId=101&cardType=1"
                // window.location.href= couponUrl
                

                // var host = window.location.host
                // var cardUrl = "http://192.168.0.160:9988/api-console/admin/export/card?"
                // console.log(host);
                window.location.href = couponUrl
            },
            
        },

        data () {
            return {
                phone: 'apple',
                show: this.value,
                params: {
                    proxyId:'',
                    goodsId: '',
                    cardType: "1",
                    number: '',
                },
                rules: {
                    goodsId: [
                        { required: true, message: '请输入套餐ID', trigger: 'change blur' },
                        { min: 1, message: '套餐ID最少2位数字' }
                    ],
                    goodsName: [
                        { required: true, message: '请输入套餐名称', trigger: 'change blur' },
                        { min: 4, max: 16, message: '请输入至少四个字符' }
                    ],
                    buyMinute: [
                        { required: true, message: '请输入套餐时间', trigger: 'change blur' },
                        {  max: 16, message: '请输入套餐时间' }
                    ],
                    priceShow: [
                        { required: true, message: '请输入原价', trigger: 'change blur' },
                        {  max: 16, message: '请输入正确格式' }
                    ],
                    price: [
                        { required: true, message: '请输入售价', trigger: 'change blur' },
                        {  max: 16, message: '请输入正确格式' }
                    ],
                    content: [
                        { required: true, message: '请输入套餐内容介绍', trigger: 'change blur' },
                        { min: 6,  message: '请输入不少于6个字符的内容' }
                    ],
                    number: [
                        { required: true, message: '请输入套餐内容介绍', trigger: 'change blur' },
                    ],
                    proxyId: [
                        { required: true, message: '请输入套餐内容介绍', trigger: 'change blur' },
                    ],
                    cardType: [
                        { required: true, message: '请输入套餐内容介绍', trigger: 'change blur' },
                    ],
                },

                isSubmit: false
            }
        },
        mounted(){
            // this.params.adminId = JSON.parse(window.localStorage.getItem("user")).id
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

