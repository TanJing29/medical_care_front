<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 期间销售统计
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-select placeholder="请选择" v-model="pageInfo.index" class="handle-select mr10">
					<el-option key="1" label="当天" value="sids"></el-option>
					<el-option key="2" label="一周" value="qwe"></el-option>
					<el-option key="3" label="一个月" value="rty"></el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-search" @click="ss">搜索</el-button>
			</div>
			<el-table :data="delivery" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column label="商品名" align="center">
					<template #default="scope">
						<a style="color:red;cursor:pointer;">{{scope.row.sname}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="connectionName" label="客户名称"></el-table-column>
				<el-table-column prop="connectionName" label="商品名称"></el-table-column>
				<el-table-column prop="shopNumber" label="商品编码"></el-table-column>
				<el-table-column label="销售价格" prop="price"></el-table-column>
				<el-table-column prop="quantity" label="数量"></el-table-column>
				<el-table-column prop="company" label="单位"></el-table-column>
				<el-table-column prop="amountReceivable" label="应收金额"></el-table-column>
				<el-table-column prop="actualMoney" label="实收金额"></el-table-column>
				<el-table-column prop="oweMoney" label="欠收金额"></el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pageInfo.currentPage" :page-sizes="[2, 5, 10, 20]" :page-size="pageInfo.pagesize"
					layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		ref,
		reactive
	} from "vue";
	import {
		ElMessage,
		ElMessageBox
	} from "element-plus";
	export default {
		name: "basetable",
		data() {
			return {
				delivery: [],
				sname: "",
				cname: '',
				Shop: [],
				Conn: [],
				Sale: [],
				dialogFormVisible: false,
				dialogFormVisible2: false,
				pageInfo: {
					currentPage: 1, //识别当前页码
					pagesize: 2, //每页多少条数据
					total: 0,
					index: '',
				},
				from1: {
					connectionName: '',
					sname: '',
					shopNumber: '',
					price: '',
					quantity: '',
					company:'',
					amountReceivable: '',
					actualMoney: '',
					oweMoney: '',
				}
			}
		},
		methods: {
			ss(){
				const _this = this
				this.axios.get("http://localhost:8089/m1/findSaletj", {
						params: this.pageInfo
					})
					.then(res => {
						console.log(res)
						// _this.delivery = res.data.list
						// _this.pageInfo.total = res.data.total
					}).catch(function(err) {
						console.log(err)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				// this.pageInfo.AnnSearch=null
				this.pageInfo.pagesize = pagesize
				this.Page()
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.index = ''
				this.pageInfo.currentPage = currentPage
				this.Page()
			},
			Page() {
				const _this = this
				this.axios.get("http://localhost:8089/m1/findSaletj", {
						params: this.pageInfo
					})
					.then(res => {
						console.log(res)
						_this.delivery = res.data.data.list
						_this.pageInfo.total = res.data.data.total
					}).catch(function(err) {
						console.log(err)
					})
			},
		},
		created() {
			this.Page()
			const _this = this
			this.axios.get("http://localhost:8089/m1/findShopAll")
				.then(res => {
					_this.Shop = res.data
				}).catch(function(err) {
					console.log(err)
				}),
				this.axios.get("http://localhost:8089/m1/findConnAll")
				.then(res => {
					_this.Conn = res.data
				}).catch(function(err) {
					console.log(err)
				})
		},

	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 300px;
		display: inline-block;
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>
