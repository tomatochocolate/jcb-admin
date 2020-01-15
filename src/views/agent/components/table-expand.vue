<template>
    <Modal mask-closable scrollable title="添加账号"
           :width="500" :loading="isSubmit"
           v-model="show">
        <Form ref="form" :model="params" :rules="rules" :label-width="90"
              @submit.native.prevent>
              
            <FormItem prop="status" label="">
                        <Select clearable placeholder="填写ID" v-model="params.unit" style="width:100px"  filterable>
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
            </FormItem>
            <FormItem  label="月套餐">
                <InputNumber
                    :max="comboList.month"
                    :min="0"
                    v-model="shareList.month"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
            </FormItem>
            <FormItem  label="季度套餐">
                <InputNumber
                    :max="comboList.quarter"
                    :min="0"
                    v-model="shareList.quarter"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
            </FormItem>
            <FormItem  label="半年套餐">
                <InputNumber
                    :max="comboList.half"
                    :min="0"
                    v-model="shareList.half"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
            </FormItem>
            <FormItem  label="全年套餐">
                <InputNumber
                    :max="comboList.year"
                    :min="0"
                    v-model="shareList.year"
                    :formatter="value => `${value}`"
                    :parser="value => value.replace(/[\s\.]/, '')">
                </InputNumber>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="text" @click="show = false">取消</Button>
            <Button type="primary" @click="">确定</Button>
        </div>
    </Modal>
</template>
<script type="text/babel">
    import { phone } from '@/libs/validator'

    export default {
        name: 'TableExpand',
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show (value) {
                this.$emit('input', value)
            },
            value (value) {
                this.show = value
            }
        },

        data () {
            return {
                show: this.value,
                params: {
                    phone: '',
                    account: '',
                    realname: '',
                    password: '',
                    agentId: '',
                    company:'',
                    remark:''
                },
                cityList: [
                    {
                        value: 10001,
                        label: '代理甲'
                    },
                    {
                        value: 10002,
                        label: '代理乙'
                    },
                    {
                        value: 10003,
                        label: '代理丙'
                    },
                ],
                comboList:{
                    month : 1,
                    quarter : 2,
                    half : 3,
                    year : 4
                },
                shareList:{
                    month : 0,
                    quarter : 0,
                    half : 0,
                    year : 0
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
