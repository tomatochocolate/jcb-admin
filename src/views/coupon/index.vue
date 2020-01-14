<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="使用状态" v-model="filterParams.status">
                            <Option value="0">全部</Option>
                            <Option value="1">已使用</Option>
                            <Option value="2">未使用</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="id"><Input clearable placeholder="卡号" v-model="filterParams.coupon" /></FormItem>
                </Col>
                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
                        <Button type="info" @click="">导出</Button>
                        <Button type="info">生成卡密</Button>
                        <Button type="info" @click="handleCouponAccountModal">卡券数量分配</Button>
                    </FormItem>
                </Col>
                <Col span="3"> 
                    <FormItem label="月套餐">
                        <InputNumber  disabled="disabled" :value='comboList.month'></InputNumber>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem label="季度套餐">
                        <InputNumber  disabled="disabled" :value='comboList.quarter'></InputNumber>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem label="半年套餐">
                        <InputNumber  disabled="disabled" :value='comboList.half'></InputNumber>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem label="全年套餐">
                        <InputNumber  disabled="disabled" :value='comboList.year'></InputNumber>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns" >
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="">启用</Button>
                <Button type="error" size="small" @click="">禁用</Button>
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

         <coupon-account v-model="couponAccountModal" @on-refresh="handleFilterQuery" :comboList='comboList'/>

    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import { datePicker } from '@/config'
    import { dayjs } from '@/libs/utils'
    import CouponAccount from './components/coupon-account'

    export default {
        name: 'coupon',
        mixins: [ page ],
        components:{CouponAccount},
        methods: {
            handleCouponAccountModal(){
                this.couponAccountModal = true
            },
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        // const { count, coupons } = await api.user.list({
                        //     pageNo, pageSize
                        // })
                        const count = 15
                        const coupons = [
                            {
		                    	'adId':'1',
                                'content':'2',
                                'timeAdd':'3',
                                'timeModify':'4',
                                'bindIphone':'5',
                                'timeCreate':'6',
                                'validity':'7',
                                'status':'8',
                                'handle':'9',
		                    },
		                    {
		                    	'adId':'1',
                                'content':'2',
                                'timeAdd':'3',
                                'timeModify':'4',
                                'bindIphone':'5',
                                'timeCreate':'6',
                                'validity':'7',
                                'status':'8',
                                'handle':'9',
		                    },
		                    {
		                    	'adId':'1',
                                'content':'2',
                                'timeAdd':'3',
                                'timeModify':'4',
                                'bindIphone':'5',
                                'timeCreate':'6',
                                'validity':'7',
                                'status':'8',
                                'handle':'9',
		                    },
		                    {
		                    	'adId':'1',
                                'content':'2',
                                'timeAdd':'3',
                                'timeModify':'4',
                                'bindIphone':'5',
                                'timeCreate':'6',
                                'validity':'7',
                                'status':'8',
                                'handle':'9',
		                    },
		                    {
		                    	'adId':'1',
                                'content':'2',
                                'timeAdd':'3',
                                'timeModify':'4',
                                'bindIphone':'5',
                                'timeCreate':'6',
                                'validity':'7',
                                'status':'8',
                                'handle':'9',
		                    }
                        ]
                        resolve({
                            data: coupons,
                            meta: {
                                total: count
                            }
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        },
        data () {
            return {
                 filterParams: {
                    coupon: '',
                    status: '',
                },
                comboList:{
                    month : 1,
                    quarter : 2,
                    half : 3,
                    year : 4
                },
                couponAccountModal:false,
                columns: [
                    { title: '卡号', key: 'adId', width: 100 },
                    { title: '所属代理商', key: 'content', width: 150, ellipsis: true, tooltip: true },
                    { title: '卡状态', key: 'timeAdd', width: 160 },
                    { title: '用户ID', key: 'timeModify', width: 160 },
                    { title: '绑定手机', key: 'bindIphone', width: 100 },
                    { title: '激活时间', key: 'timeCreate', width: 100 },
                    { title: '有效期', key: 'validity', width: 100 },
                    { title: '卡密', key: 'status', minWidth: 100,align: 'center'},
                    {slot: 'action',title: '操作',width: 150,align: 'center',fixed:'left'}
                    
                ],
                datePickerOptions: {
                    ...datePicker,
                    disabledDate (date) {
                        return dayjs().isBefore(date)
                    }
                }
            }
        },
        mounted () {
            this.getList()
            
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
     .ivu-form {
        margin-bottom: 10px;

        /deep/ {

            .btn-group {

                .ivu-btn {
                    /*width: 90px;*/
                    &:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }
            .ivu-date-picker {
                display: block;
            }
            .ivu-col {
                padding-right: 10px;
                margin-bottom: 10px;

                @include media('<sm') {
                    &:nth-child(2n+0) {
                        padding-right: 0;
                    }
                }
                @include media('>sm', '<md') {
                    &:nth-child(4n+0),
                    &:nth-child(14) {
                        padding-right: 0;
                    }
                }
                @include media('>md', '<lg') {
                    &:nth-child(4),
                    &:nth-child(8),
                    &:nth-child(12),
                    &:nth-child(14),
                    &:nth-child(16)  {
                        padding-right: 0;
                    }
                }
                @include media('>lg', '<xl') {
                    &:nth-child(8),
                    &:nth-child(15) {
                        padding-right: 0;
                    }
                }
                @include media('>xl') {
                    &:nth-child(12n+0) {
                        padding-right: 0;
                    }
                }
            }
            .ivu-form-item {
                width: 100%;
                margin-right: 0;
                margin-bottom: 0;
            }
            .ivu-btn-text {
                padding: 0;
                margin-left: 10px;
            }
        }
    }
</style>
