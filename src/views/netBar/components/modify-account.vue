<template>
    <Modal mask-closable scrollable title="商户信息编辑"
           :width="500" :loading="isSubmit"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="140"
              @submit.native.prevent>
           
           <FormItem prop="name" label="名称">
                <Input clearable type="text" placeholder="请输入名称" :maxlength="16" v-model="params.name" @on-enter="handleSubmitForm" />
            </FormItem>
            <FormItem prop="ips" label="ip">
                <Input clearable type="text" placeholder="请输入ip" :maxlength="32" v-model="params.ips" @on-enter="handleSubmitForm"/>
            </FormItem>
            <!-- <FormItem prop="status" label="状态">
                <Input clearable type="text" placeholder="请输入状态" :maxlength="32" v-model="params.status" @on-enter="handleSubmitForm"/>
            </FormItem> -->
            <!-- <FormItem prop="Ntype" label="企业类型">
                <Input clearable type="text" placeholder="请输入企业类型" :maxlength="32" v-model="params.type" @on-enter="handleSubmitForm"/>
            </FormItem> -->
            <FormItem prop="" label="企业类型">
                <RadioGroup v-model="params.type"  size="large">
                    <Radio label='1'>常规</Radio>
                    <Radio label='2'>网吧型</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem prop="remark" label="备注">
                <Input clearable type="text" placeholder="请输入备注" :maxlength="32" v-model="params.remark" @on-enter="handleSubmitForm"/>
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
        name: 'modifyAccount',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            modify:{
                
            }
        },
        watch: {
            show (value) {
                this.$emit('input', value)
                // this.params = this.modifyparams
            },
            value (value) {
                this.show = value
            },
            // modifyparams(value){
            //     this.starchange()
                
            // }
        },
        methods:{
            childMethods(v1,v2){
                this.params = v1
                this.modifyparams = v2
                this.params.goodsType = this.params.goodsType.toString()
                
            },
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
                try {
                    
                    const abc = await this.setMeal(this.params)
                    const code = 200
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
                modifyparams: {
                    adminId:1,
                    goodsId: 1,
                    goodsName: 1,
                    buyMinute: 1,
                    priceShow:1,
                    price:1,
                    content:1,
                    status:1,
                    goodsType:1,
                },
                show: this.value,
                params: {
                    goodsId: '',
                    goodsName: '',
                    buyMinute: '',
                    priceShow:'',
                    price:'',
                    content:'',
                    status:1
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'change blur' },
                        { pattern: phone, message: '请输入正确的手机号码' }
                    ],
                    account: [
                        { required: true, message: '请输入用户名', trigger: 'change blur' },
                        { min: 2, message: '用户名最少2位字符' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change blur' },
                        { min: 6, max: 16, message: '请输入6~16位的密码' }
                    ],
                    agentId: { required: true, message: '请选择代理商', trigger: 'change blur' }
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
