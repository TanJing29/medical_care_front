<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 销售统计
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-select placeholder="请选择" v-model="pageInfo.index" class="handle-select mr10">
					<el-option key="1" label="客户名" value="Connection_Name"></el-option>
					<el-option key="3" label="商品名" value="sname"></el-option>
					<el-option key="4" label="已登记" value="state"></el-option>
				</el-select>
				<el-input v-model="pageInfo.value" placeholder="请输入" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="ss">搜索</el-button>
				<el-button type="primary" @click="xzsale">新增</el-button>
			</div>
			<el-table :data="delivery" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="did" label="ID" width="55" align="center"></el-table-column>
				<el-table-column label="商品名" align="center">
					<template #default="scope">
						<a style="color:red;cursor:pointer;"
							@click="UpdateDelvery(scope.row)">{{scope.row.shop.sname}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="connection.connectionName" label="客户名"></el-table-column>
				<el-table-column prop="shop.shopNumber" label="商品编码"></el-table-column>
				<el-table-column prop="salesOrderNo" label="销售单号"></el-table-column>
				<el-table-column prop="shop.company" label="单位"></el-table-column>
				<el-table-column label="销售价" prop="shop.price"></el-table-column>
				<el-table-column prop="quantity" label="数量"></el-table-column>
				<el-table-column prop="amountReceivable" label="应收金额"></el-table-column>
				<el-table-column prop="actualMoney" label="实收金额"></el-table-column>
				<el-table-column prop="oweMoney" label="欠收金额"></el-table-column>
				<el-table-column prop="state" label="销售状态">
					<template v-slot="scope">
						<p v-if="scope.row.state==0">已登记</p>
						<p v-if="scope.row.state==1">已销售</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template #default="scope">
						<el-button type="text" @click="handleEdit(scope.row)">销售</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pageInfo.currentPage" :page-sizes="[2, 5, 10, 20]" :page-size="pageInfo.pagesize"
					layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
		</div>

		<!-- 新增弹出框 -->
		<el-dialog title="新增" v-model="dialogFormVisible" width="30%">
			<el-form label-width="70px">
				销售编号:<el-input v-model="from1.salesOrderNo" placeholder="销售编号"></el-input>
				客户名称:<el-select v-model="from1.conId" placeholder="客户名称" style="width:420px;">
					<el-option v-for="itms in Conn" :label="itms.connectionName" :value="itms.conId"></el-option>
				</el-select>
				选择商品:<el-select v-model="from1.sid" placeholder="选择商品" @change="Sale_Sid" style="width:420px;">
					<el-option v-for="itms in Shop" :label="itms.sname" :value="itms.sid"></el-option>
				</el-select>
				商品价格:<el-input v-model="from1.price" disabled placeholder="商品价格"></el-input>
				商品数量:<el-input v-model="from1.quantity" @change="spslSale" placeholder="商品数量"></el-input>
				应收金额:<el-input v-model="from1.amountReceivable" disabled placeholder="应收金额"></el-input>
				实收金额:<el-input v-model="from1.actualMoney"  @change="ssjeSale" placeholder="实收金额"></el-input>
				欠收金额:<el-input v-model="from1.oweMoney" disabled placeholder="欠收金额"></el-input>
				备注:<el-input type="textarea" v-model="from1.remarks"></el-input>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="AddDelvery()">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<el-dialog title="查看详情" v-model="dialogFormVisible2" width="30%">
			<el-form label-width="70px">
				销售编号:<el-input v-model="from1.salesOrderNo" placeholder="销售编号"></el-input>
				选择商品:<el-select v-model="from1.sid" placeholder="选择商品" @change="Sale_Sid" style="width:420px;">
					<el-option v-for="itms in Shop" :label="itms.sname" :value="itms.sid"></el-option>
				</el-select>
				商品数量:<el-input v-model="from1.quantity" disabled placeholder="商品数量"></el-input>
				应收金额:<el-input v-model="from1.amountReceivable" disabled placeholder="应收金额"></el-input>
				实收金额:<el-input v-model="from1.actualMoney" disabled placeholder="实收金额"></el-input>
				欠收金额:<el-input v-model="from1.oweMoney" disabled placeholder="欠收金额"></el-input>
				欠收金额:<el-input v-model="from1.saleDate" disabled placeholder="销售时间"></el-input>
				备注:<el-input type="textarea" v-model="from1.remarks"></el-input>
			</el-form>
		</el-dialog>
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
	// import {
	// 	fetchData
	// } from "../../api/index";

	export default {
		name: "basetable",
		data() {
			return {
				delivery: [],
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
					value: ''
				},
				from1: {
					sid: '',
					conId: '',
					salesOrderNo: '',
					price: '',
					quantity: '',
					amountReceivable: '',
					actualMoney: '',
					oweMoney: '',
					state: '',
					saleDate:'',
					remarks: ''
				}
			}
		},
		methods: {
			xzsale(){
				this.dialogFormVisible = true
				
			},
			ss(){
				console.log(this.pageInfo)
				const _this = this
				this.axios.get("http://localhost:8089/m1/findAllDelverid", {
						params: this.pageInfo
					})
					.then(res => {
						console.log(res)
						_this.delivery = res.data.list
						_this.pageInfo.total = res.data.total
					}).catch(function(err) {
						console.log(err)
					})
			},
			handleEdit(row) {
				const _this = this
				this.axios.put("http://localhost:8089/m1/xiaoshou/" + row.said + "/" + row.state)
					.then(res => {
						if (res.data.data == 1) {
							_this.$message({
								message: '销售成功',
								type: 'success'
							});
						} else {
							_this.$message({
								message: '销售失败！',
								type: 'warning'
							});
						}
						console.log(res)
						_this.Page();
					}).catch(err => {
						console.log(err)
					})
			},
			handleDelete(row) {
				const _this = this
				this.axios.delete("http://localhost:8089/m1/delSale/" + row.said + "/" + row.state)
					.then(res => {
						console.log(row.said)
						if (res.data.data == 0) {
							_this.$message({
								message: '删除失败！',
								type: 'warning'
							});
						} else {
							
							_this.$message({
								message: '删除成功',
								type: 'success'
							});
						}
						console.log(res)
						_this.Page();
					}).catch(err => {
						console.log(err)
					})
			},
			UpdateDelvery(row) {
				this.from1.state = row.state
				this.from1.sid = row.sid
				this.from1.conId = row.conId
				this.from1.price = row.price
				this.from1.quantity = row.quantity
				this.from1.amountReceivable = row.amountReceivable
				this.from1.actualMoney = row.actualMoney
				this.from1.remarks = row.remarks
				this.from1.salesOrderNo = row.salesOrderNo
				this.from1.oweMoney = row.oweMoney
				this.from1.saleDate=row.saleDate
				this.dialogFormVisible2 = true
				console.log(this.from1)
				console.log(row)
			},
			// 获取当前日期的方法
			getProjectNum() {
				const projectTime = new Date() // 当前中国标准时间
				const Year = projectTime.getFullYear() // 获取当前年份 支持IE和火狐浏览器.
				const Month = projectTime.getMonth() + 1 // 获取中国区月份
				const Day = projectTime.getDate() // 获取几号
				var CurrentDate = String(Year)
				if (Month >= 10) { // 判断月份和几号是否大于10或者小于10
					CurrentDate += Month
				} else {
					CurrentDate += '0' + Month
				}
				if (Day >= 10) {
					CurrentDate += Day
				} else {
					CurrentDate += '0' + Day
				}
				return CurrentDate
			},
			Sale_Sid() {
				this.from1.salesOrderNo = 'XS' + this.getProjectNum() + Math.floor(Math.random() * 10000)
				var row = this.Shop.filter(s => s.sid == this.from1.sid)[0]
			
				console.log(row)
				this.from1.sid = row.sid
				this.from1.price = row.price
			},
			spslSale(){
				this.from1.amountReceivable=this.from1.price * this.from1.quantity
			},
			ssjeSale(){
				this.from1.oweMoney=this.from1.amountReceivable - this.from1.actualMoney
				console.log(this.from1)
			},
			AddDelvery() {
				const _this = this
				this.axios.post("http://localhost:8089/m1/AddSale", this.from1)
					.then(function(response) {
						console.log("AddSale?????")
						console.log(response)
						_this.Page()
						_this.dialogFormVisible = false
					}).catch(function(error) {
						_this.$message({
							message: '新增失败',
							type: 'warning'
						});
						console.log(error)
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
				console.log(this.pageInfo)
				const _this = this
				this.axios.get("http://localhost:8089/m1/findPageSale", {
						params: this.pageInfo
					})
					.then(res => {
						console.log(res.data.data.list)
						_this.delivery = res.data.data.list
						_this.pageInfo.total = res.data.data.total
					}).catch(function(err) {
						console.log(err)
					})
			},
			SaleShow(){
				const _this=this
				this.axios.get("http://localhost:8089/m1/findSaleAll")
				.then(res => {
					_this.Sale = res.data
				}).catch(function(err) {
					console.log(err)
				})
			}
		},
		created() {
			this.Page()
			this.SaleShow()
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
