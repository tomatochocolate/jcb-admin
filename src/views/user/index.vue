<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="有效状态" v-model="filterParams.status">
                            <Option value="0">正常</Option>
                            <Option value="1">禁用</Option>
                            <Option value="2">过期</Option>
                            <Option value="3">体验</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="id"><Input clearable placeholder="用户ID" v-model="filterParams.id" /></FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="phone"><Input clearable placeholder="手机号" v-model="filterParams.phone" /></FormItem>
                </Col>
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="date">
                        <DatePicker format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="请选择注册时间区间"
                                    :options="datePickerOptions"
                                    v-model="filterParams.created_at" />
                    </FormItem>
                </Col>
                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
                        <Button type="info" @click="handleAddAccount">添加用户</Button>
                        <Button type="info" @click="handleTimeAccount">增加时长</Button>
                        <Button type="info" @click="handleFlowAccount">增加流量</Button>
                        <Button @click="addTime">测试</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns" @on-selection-change="selectFun"/>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

        <add-account v-model="addAccountModal" @on-refresh="handleFilterQuery" />
        <time-account v-model="timeAccountModal" @on-refresh="handleFilterQuery" />
        <flow-account v-model="flowAccountModal" @on-refresh="handleFilterQuery" />
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import { datePicker } from '@/config'
    import { dayjs } from '@/libs/utils'

    import AddAccount from './components/add-account'
    import TimeAccount from './components/time-account'
    import FlowAccount from './components/flow-account'
    export default {
        name: 'User',
        mixins: [ page ],
        components: { AddAccount ,TimeAccount,FlowAccount},
        methods: {
            addTime(){
               
                 var members_id = 100524 ;
                 const admin_id = 1;
                 const add_time = 5 ;
                 const unit = 1 ;
               
                const abc = api.user.timer({
                    members_id  ,admin_id ,add_time ,unit 
                })
            },
            handleAddAccount () {
                this.addAccountModal = true
            },
            handleTimeAccount () {
                this.timeAccountModal = true
            },
             handleFlowAccount () {
                this.flowAccountModal = true
            },
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            selectFun(selection){
                
                this.checklist = selection
                console.log(this.checklist);
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { id, status, phone, created_at } = this.filterParams

                        const { count, members } = await api.user.list({
                            pageNo, pageSize, status, phone, id,
                            created_at: created_at.filter(item => item).map(item => dayjs(item).format('YYYY-MM-DD')).join(',')
                        })

                        resolve({
                            data: members,
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
                    id: '',
                    phone: '',
                    status: '',
                    created_at: []
                },
                addAccountModal: false,
                importAccountModal: false,
                timeAccountModal: false,
                flowAccountModal: false,

                checklist:[],

                 members_id : 100524 ,
                 admin_id : 1,
                 add_time : 10 ,
                 unit : 1 ,

                columns: [
                    { key: 'status', title: '账号状态', width: 100, fixed: 'left' },
                    { key: 'memberId', title: '用户ID', width: 100 },
                    { key: 'memberType', title: '注册平台', width: 100 },
                    { key: 'memberAccount', title: '会员账号', width: 140 },
                    { key: 'memberName', title: '会员名', width: 140 },
                    { key: 'experience', title: '是否体验', width: 100 },
                    { key: 'memberPaid', title: '是否付费', width: 100 },
                    { key: 'timeStart', title: '体验/续费开始时间', width: 170 },
                    { key: 'timeEnd', title: '体验/续费到期时间', width: 170 },
                    { key: 'timeAdd', title: '账号激活时间', width: 170 },
                    { key: 'timeLogin', title: '最后登录时间', width: 170 },
                    { key: 'ipLogin', title: '最近登录IP', width: 140 },
                    { key: 'versionSoft', title: '最近使用版本', width: 130 },
                    { key: 'channelReg', title: '注册渠道代码', width: 130 },
                    { key: 'ipReg', title: '注册IP', width: 140 },
                    { type:'selection',title:'选择',width:80,align:'center'}
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
