<template>
    <Card class="list" v-if="isReady">
        <Form ref="form" inline :model="filterParams" @submit.native.prevent>
            <Row type="flex">
                <Col :xs="12" :sm="6" :lg="4" :xl="3">
                    <FormItem prop="status">
                        <Select clearable placeholder="有效状态" v-model="filterParams.status">
                            <Option value="2">全部</Option>
                            <Option value="1">正常</Option>
                            <Option value="0">禁用</Option>
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
                        <Button type="info" @click="handleTableAccount">分配代理卡券余额</Button>
                    </FormItem>
                </Col>
                <Col span="3"> 
                    <FormItem label="月套餐">
                        <InputNumber  disabled="disabled" :value='comboList[0].balance'></InputNumber>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem label="季度套餐">
                        <InputNumber  disabled="disabled" :value='comboList[1].balance'></InputNumber>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem label="半年套餐">
                        <InputNumber  disabled="disabled" :value='comboList[2].balance'></InputNumber>
                    </FormItem>
                </Col>
                <Col span="3">
                    <FormItem label="全年套餐">
                        <InputNumber  disabled="disabled" :value='comboList[3].balance'></InputNumber>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :data="list" :columns="columns" >
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="onAgent(row)">启用</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="offAgent(row)">禁用</Button>
                <!-- <Button type="success" size="small" @click="handlemodifyAccount">修改</Button> -->
            </template>
            <template slot-scope="{ row, index }" slot="goodsButton">
                <Button type="warning" size="small" style="margin-right: 5px" @click="watchYe(row)">查看余额</Button>
                <Drawer title="套餐总余额" :closable="false" v-model="value1">
                    <Form>
                        <FormItem :label="couponYe[index].goodsName" label-position="top" v-for="item,index in couponYe"  :key="index">
                            <InputNumber  disabled="disabled" :value='couponYe[index].balance' ></InputNumber>
                        </FormItem>
                    </Form>  
                        
                </Drawer>
            </template>
            
        </Table>
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />

        <add-account v-model="addAccountModal" @on-refresh="handleFilterQuery"/>
        <table-expand  v-show="tableAccountModal" :comboList='comboList' @fatherMethod="fatherMethod"  @on-refresh='handleTableAccount' :tableAccountModal='tableAccountModal'/>
        <modify-account v-model="modifyAccountModal" />
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import { datePicker } from '@/config'
    import AddAccount from './components/add-account'
    import TableExpand from './components/table-expand'
    import ModifyAccount from './components/modify-account'

    export default {
        name: 'Agent',
        mixins: [ page ],
        components: { AddAccount,TableExpand ,ModifyAccount},
        methods: {
            handleAddAccount () {
                this.addAccountModal = true
            },
            handleTableAccount () {
                // this.tableAccountModal = true
                // alert(this.tableAccountModal)
                this.tableAccountModal = !this.tableAccountModal
                
            }, 
            handlemodifyAccount () {
                this.modifyAccountModal = true
            },                       
            handleFilterQuery () {
                this.page.current = 1
                this.getList()
            },
            watchYe(row){
                this.value1 = true;
                this.couponYe = row.goodsList
            },
            onAgent(row){
                return new Promise(async (resolve, reject) => {
                    try {
                        const adminId = JSON.parse(window.localStorage.getItem("user")).id
                        const proxyId = row.proxyId
                        const flag = 1;
                        
                       
                        const { data } = await api.agent.enableOrDisable({adminId,proxyId,flag})
                        
                        resolve(
                            this.getList()
                        )
                    } catch (e) {
                        reject(e)
                    }
                })
            },
            offAgent(row){
                return new Promise(async (resolve, reject) => {
                    try {
                        const adminId = JSON.parse(window.localStorage.getItem("user")).id
                        const proxyId = row.proxyId
                        const flag = 0;
                       
                        const { data } = await api.agent.enableOrDisable({adminId,proxyId,flag})
                        
                        resolve(
                            this.getList()
                        )
                    } catch (e) {
                        reject(e)
                    }
                })
            },
            fatherMethod() {
               this.getList()
            },
            
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { current: pageNo, pageSize } = this.page
                        const { status,account } = this.filterParams
                        const adminId = JSON.parse(window.localStorage.getItem("user")).id
                        
                        const { count, proxy } = await api.agent.list({
                            pageNo, pageSize,adminId,status,account
                        })
                        const { data } = await api.agent.queryCNum({
                            adminId
                        })
                        this.comboList = data 
                        
                        resolve({
                            data: proxy,
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
                    status: 2
                },
                value1 :false,
                comboList:[
	            	{
	            		"balance":0,
	            		"goods_id":101
	            	},
	            	{
	            		"balance":0,
	            		"goods_id":102
	            	},
	            	{
	            		"balance":0,
	            		"goods_id":103
	            	},
	            	{
	            		"balance":0,
	            		"goods_id":104
	            	}
	            ],
                addAccountModal: false,
                tableAccountModal:false,
                modifyAccountModal: false,

                couponYe:[
                    {
                        aid : 1
                    },
                    {
                        aid : 2
                    }
                ]
                ,

                columns: [
                    {
                        slot:'action',
                        key: 'id',
                        title: '操作',
                        minWidth: 100,
                        fixed:'left'
                    },
                    {
                        key: 'proxyLevel',
                        title: '代理级别',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'status',
                        title: '账号状态(1)正常(0)禁用',
                        width: 200,
                        align: 'center'
                    },
                    {
                        key: 'proxyName',
                        title: '代理商',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'proxyId',
                        title: '代理ID',
                        align: 'center',
                        minWidth: 100
                    },
                    {
                        key: 'loginAccount',
                        title: '账号',
                        align: 'center',
                        width: 200
                    },
                    {
                        slot:'goodsButton',
                        key: 'goodsButton',
                        title: '套餐',
                        align: 'center',
                      
                    },
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
