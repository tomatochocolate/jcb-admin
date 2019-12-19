<template>
    <Card class="list" v-if="isReady">
        <div class="btn-group">
            <Button type="primary" @click="handleEditGoods('add')">新增商品</Button>
        </div>
        <Table :data="list" :columns="columns" />
        <Page style="margin-top: 15px;"
              :total="page.total" :current="page.current"
              @on-change="handlePageNoChange" @on-page-size-change="handlePageSizeChange" />
        <Store :type="editGoodsModal.type" :data="editGoodsModal.data"
               v-model="editGoodsModal.show" @on-success="getList"/>
    </Card>
</template>
<script type="text/babel">
    import * as api from '@/api'
    import page from '@/mixins/page'
    import Store from './components/store'

    export default {
        name: 'Goods',
        mixins: [ page ],
        components: { Store },
        methods: {
            handleEditGoods (type = 'add', row = {}) {
                this.editGoodsModal.show = true
                this.editGoodsModal.type = type
                this.editGoodsModal.data = row
            },
            getListData () {
                return new Promise(async (resolve, reject) => {
                    try {
                        const { count, goods } = await api.goods.list()

                        resolve({
                            data: goods,
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
                columns: [
                    { title: 'ID', key: 'goodsId', width: 100 },
                    { title: '套餐名称', key: 'goodsName', minWidth: 150, maxWidth: 200 },
                    { title: '套餐单价/分', slot: 'price', width: 130 },
                    { title: '商品描述', key: 'content', minWidth: 180 },
                    { title: '购买分钟数', key: 'buyMinute', width: 130 },
                    { title: '状态', slot: 'status', width: 120 },
                    { title: '是否Top', slot: 'isTop', width: 100 },
                    { title: '是否Hot', slot: 'isHot', width: 100 },
                    { title: '增加时间', key: 'timeAdd', width: 160 },
                    { title: '修改时间', key: 'timeModify', width: 160 }
                ],
                editGoodsModal: {
                    show: false,
                    type: 'add',
                    data: {}
                }
            }
        },
        mounted () {
            this.getList()
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
</style>
