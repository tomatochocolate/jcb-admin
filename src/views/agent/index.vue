<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="有效状态" v-model="filterParams.status">
                            <Option value="0">正常</Option>
                            <Option value="1">禁用</Option>
                        </Select>
                    </FormItem>
                </Col>
                <!-- <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="level">
                        <Select clearable placeholder="账号等级" v-model="filterParams.level">
                            <Option value="1">一级</Option>
                            <Option value="2">二级</Option>
                            <Option value="3">三级</Option>
                        </Select>
                    </FormItem>
                </Col> -->
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="account"><Input clearable placeholder="账号" v-model="filterParams.account" /></FormItem>
                </Col>
                <Col>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleFilterQuery">查询</Button>
                        <Button type="info" @click="handleAddAccount">新增代理商</Button>
                        <Button type="info" @click="handleTableAccount">增加代理卡券余额</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns" >
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="onAgent(row)">启用</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="offAgent(row)">禁用</Button>
                <Button type="success" size="small" @click="handlemodifyAccount">修改</Button>
            </template>
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

        <add-account v-model="addAccountModal" />
        <table-expand v-model="tableAccountModal" />
        <modify-account v-model="modifyAccountModal" />
    </Card>
</template>
<script type="text/babel">
    import page from '@/mixins/page'
    import AddAccount from './components/add-account'
    import TableExpand from './components/table-expand'
    import ModifyAccount from './components/modify-account'

    export default {
        name: 'Agent',
        mixins: [ page ],
        components: { AddAccount,TableExpand ,ModifyAccount},
        methods: {
            onAgent(row){
                console.log(this.$store.state.app.user.id);
            },
            offAgent(row){
                console.log(this);
            },
            handleAddAccount () {
                this.addAccountModal = true
            },
            handleTableAccount () {
                this.tableAccountModal = true
            }, 
            handlemodifyAccount () {
                this.modifyAccountModal = true
            },                       
            handleFilterQuery () {},
                        getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        // const { count, coupons } = await api.user.list({
                        //     pageNo, pageSize
                        // })
                        const count = 16
                        const agents = [
		                    {
		                    	'account':'1',
                                'status':'2',
                                'level':'3',
                                'totalLower':'a',
                                'totalUsers':'5',
                                'timeCreate':'6',
                                'createTime':'7',
                                'lastLoginTime':'8',
                                'functional':'9',
                                'coupon':'10'
		                    },
                             {
		                    	'account':'1',
                                'status':'2',
                                'level':'3',
                                'totalLower':'b',
                                'totalUsers':'5',
                                'timeCreate':'6',
                                'createTime':'7',
                                'lastLoginTime':'8',
                                'functional':'9',
                                'coupon':'10'
		                    }
                        ]
                        resolve({
                            data: agents,
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
                    level: '',
                    account: '',
                    status: ''
                },
                addAccountModal: false,
                tableAccountModal:false,
                modifyAccountModal: false,

                columns: [
                    {
                        slot:'action',
                        key: 'id',
                        title: '操作',
                        minWidth: 100,
                        fixed:'left'
                    },
                    {
                        key: 'account',
                        title: '代理级别',
                        minWidth: 100
                    },
                    {
                        key: 'status',
                        title: '账号状态',
                        width: 100
                    },
                    {
                        key: 'level',
                        title: '上级',
                        minWidth: 100
                    },
                    {
                        key: 'totalLower',
                        title: '账户',
                        width: 100
                    },
                    {
                        key: 'totalUsers',
                        title: '姓名',
                        width: 100
                    },
                    {
                        key: 'createTime',
                        title: '电话',
                        minWidth: 100
                    },
                    {
                        key: 'lastLoginTime',
                        title: '公司',
                        width: 100
                    },
                    {
                        key: 'functional',
                        title: '备注',
                        width: 100,
                    },
                     {
                        key: 'coupon',
                        title: '卡券余额',
                        width: 100,
                    }
                ]
            }
        },
        mounted () {
            this.isReady = true
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
