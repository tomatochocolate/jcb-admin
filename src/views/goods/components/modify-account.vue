<template>
    <Modal mask-closable scrollable title="套餐修改"
           :width="500" :loading="isSubmit"
           v-model="show">
        <Form ref="form"
              :model="params" :rules="rules" :label-width="140"
              @submit.native.prevent>
           
            <FormItem prop="goodsId" label="套餐ID">
                <!-- <Input clearable type="text" placeholder="请输入套餐ID" :maxlength="32" v-model="params.goodsId" @on-enter="handleSubmitForm" style="width:150px"/> -->
                <Input  disabled="disabled" :value='modifyparams.goodsId'style="width:78px"  />
            </FormItem>
            <FormItem prop="goodsName" label="商品名称">
                <Input clearable type="text" placeholder="请输入商品名称" :maxlength="32" v-model="params.goodsName" @on-enter="handleSubmitForm" style="width:150px"/>
                <Input  disabled="disabled" :value='modifyparams.goodsName'style="margin-left:50px;width:78px"  />
            </FormItem>
            <FormItem prop="" label="套餐类型1">
                <RadioGroup v-model="params.goodsType"  size="large">
                    <Radio label='1'>包时（天）</Radio>
                    <Radio label='2'>流量（G）</Radio>
                </RadioGroup>
            </FormItem>   
            <FormItem prop="buyMinute" label="套餐数值">
                <Input clearable type="text" placeholder="输入对应套餐数值" :maxlength="16" v-model="params.buyMinute" @on-enter="handleSubmitForm" style="width:150px" />
                <Input  disabled="disabled" :value='modifyparams.buyMinute'style="margin-left:50px;width:78px"  />
            </FormItem>
            <FormItem prop="priceShow" label="原价">
                <Input clearable type="text" placeholder="请输原价" v-model="params.priceShow" @on-enter="handleSubmitForm" style="width:150px"/>
                <Input  disabled="disabled" :value='modifyparams.priceShow'style="margin-left:50px;width:78px"  />
            </FormItem>
            <FormItem  prop="price" label="销售价格">
                <Input clearable type="text" placeholder="请输入销售价格" v-model="params.price" @on-enter="handleSubmitForm" style="width:150px"/>
                <Input  disabled="disabled" :value='modifyparams.price'style="margin-left:50px;width:78px"  />
            </FormItem>  
            <FormItem  prop="content" label="商品描述">
                <Input clearable type="text" placeholder="请输入商品描述" v-model="params.content" @on-enter="handleSubmitForm" />
                <!-- <Input  disabled="disabled" :value='modifyparams.content'style="margin-left:50px;width:78px"  /> -->
            </FormItem> 
            <!-- <FormItem  prop="goodsType" label="套餐类型">
                <Select clearable placeholder="时长单位" v-model="params.goodsType" style="width:150px">
                            <Option value="1">包时（天）</Option>
                            <Option value="2">流量（G）</Option>
                </Select>
            </FormItem>  -->
                                 
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
