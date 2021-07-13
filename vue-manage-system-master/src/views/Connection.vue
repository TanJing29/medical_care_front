<template>
	<div>
		<el-input v-model="pageInfo.connectionName" size="mini" placeholder="生源渠道模糊搜索" style="width: 140px;">
		</el-input>&nbsp;
		<el-button style="background-color: #5FB878;color: white; width: 50px;" size="mini" @click="selall">查询
		</el-button>
		<el-button style="background-color: #009688;color: white;width: 50px;" type="text" size="mini"
			@click="dialogFormVisible = true">增加
		</el-button>
		<el-button style="background-color: red;color: white;width: 100px;" type="text" size="mini" @click="pldele()">
			批量删除
		</el-button>


		<el-dialog title="新增客户信息" v-model="dialogFormVisible" :before-close="close">
			<el-form :model="form" :rules="rules">
				<el-form-item prop="connectionName">
					客户名称: <el-input v-model="form.connectionName" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
				<el-form-item prop="phone">
					联系电话: <el-input v-model="form.phone" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 15px;">
					联系人: <el-input v-model="form.liaisonman" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 24px;">
					地址: <el-input v-model="form.address" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 24px;">
					备注: <el-input v-model="form.remarks" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="close()">关闭</el-button>
					<el-button type="primary" @click="addConnection">保 存</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog title="修改客户信息" v-model="dialogFormVisible1" :before-close="close">
			<el-form :model="form" :rules="rules">
				<el-form-item>
					客户编码: <el-input v-model="form.connectionId" disabled style="width: 620px;margin-bottom: 10px;">
					</el-input>
				</el-form-item>
				<el-form-item prop="connectionName">
					客户名称: <el-input v-model="form.connectionName" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
				<el-form-item prop="phone">
					联系电话: <el-input v-model="form.phone" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 15px;">
					联系人: <el-input v-model="form.liaisonman" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 24px;">
					地址: <el-input v-model="form.address" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
				<el-form-item style="margin-left: 24px;">
					备注: <el-input v-model="form.remarks" style="width: 620px;margin-bottom: 10px;"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="close()">关闭</el-button>
					<el-button type="primary" @click="updConnection">保 存</el-button>
				</span>
			</template>
		</el-dialog>

		<el-table :data="connectionData" border style="width: 100%" @selection-change="handleSelectionChange"
			ref="multipleTable">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="conId" label="编号" width="50" align="center">
			</el-table-column>
			<el-table-column prop="connectionId" label="客户编码" width="120" align="center">
			</el-table-column>
			<el-table-column prop="connectionName" label="客户名称" width="120" align="center">
			</el-table-column>
			<el-table-column prop="liaisonman" label="联系人" width="120" align="center">
			</el-table-column>
			<el-table-column prop="phone" label="联系电话" width="120" align="center">
			</el-table-column>
			<el-table-column prop="address" label="地址" width="200" align="center">
			</el-table-column>
			<el-table-column prop="remarks" label="备注" width="200" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" align="center">
				<template #default="scope">
					<el-button type="text" size="small" @click="showEdit(scope.row)">
						<i class="el-icon-edit"></i>编辑
					</el-button>
					<el-button type="text" size="small" @click="delConnection(scope.row)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
	<!-- 分页 -->
	<div class="block" style="display: flex;justify-content: center;margin-top: 10px;">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			:current-page="pageInfo.currentPage" :page-sizes="[2, 4, 6, 8]" :page-size="pageInfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
		</el-pagination>
	</div>



</template>

<script>
	import qs from 'qs'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		methods: {
			//全选复选框
			SAll() {
				this.$refs.multipleTable.toggleAllSelection();
			},
			//取消选中的复选框
			NSel() {
				this.$refs.multipleTable.clearSelection();
			},
			//批量删除按钮
			pldele() {
				console.log(this.multipleSelection.length)
				if (this.multipleSelection.length === 0) {
					this.deld();
				} else {
					this.multipleSelection.forEach(item => {
						this.delete1(item)
					});
					this.dels();
				}
			},
			//总复选框的全选和取消全选
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//模糊查询
			selall() {
				const _this = this
				this.axios.get("http://localhost:8089/m1/selmhConnection", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.connectionData = response.data.list
						_this.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//修改
			updConnection() {
				const _this = this
				this.form.updatename = "lxx"
				this.axios.put("http://localhost:8089/m1/updConnection", this.form)
					.then(function(response) { // eslint-disable-line no-unused-vars
						_this.axios.get("http://localhost:8089/m1/selmhConnection", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.connectionData = response.data.list
								_this.pageInfo.total = response.data.total
								for (var key in _this.form) {
									delete _this.form[key];
								}
							}).catch(function(error) {
								console.log(error)
								for (var key in _this.form) {
									delete _this.form[key];
								}
							})
						_this.dialogFormVisible1 = false
					}).catch(function(error) {
						console.log(error)
						for (var key in _this.form) {
							delete _this.form[key];
						}
					})
			},
			showEdit(row) { //自动获取值并填入到form表单中
				this.form.conId = row.conId
				this.form.connectionId = row.connectionId
				this.form.connectionName = row.connectionName
				this.form.liaisonman = row.liaisonman
				this.form.address = row.address
				this.form.phone = row.phone
				this.form.remarks = row.remarks
				this.dialogFormVisible1 = true
			},
			//批量删除
			delete1(row) {
				const _this = this
				this.form.deletename = "lxx"
				this.axios.put("http://localhost:8089/m1/delConnection", row, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) { // eslint-disable-line no-unused-vars
						_this.axios.get("http://localhost:8089/m1/selmhConnection", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.connectionData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
					}).catch(function(error) {
						console.log(error)
					})
			},
			//单个删除
			delConnection(row) {
				const _this = this
				var flag = true // eslint-disable-line no-unused-vars
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(row);
					_this.form.deletename = "lxx"
					_this.axios.put("http://localhost:8089/m1/delConnection", row)
						.then(function(response) {
							console.log(response)
							var rows = _this.connectionData
								.filter(d => d.sourceId != row.sourceId)
							_this.connectionData = rows
							_this.pageInfo.total = _this.pageInfo.total - 1
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消删除!'
					});
				});
			},
			//新增
			addConnection() {
				const _this = this
				this.form.addname = "lxx"
				this.axios.post("http://localhost:8089/m1/addConnection", this.form)
					.then(function(response) { // eslint-disable-line no-unused-vars
						_this.axios.get("http://localhost:8089/m1/selmhConnection", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.connectionData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.dialogFormVisible = false
						for (var key in _this.form) {
							delete _this.form[key];
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			close() {
				this.dialogFormVisible = false
				this.dialogFormVisible1 = false
				this.dialogFormVisible2 = false
				for (var key in this.form) {
					delete this.form[key];
				}
				this.$message({
					type: 'info',
					message: '已取消操作'
				});
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.axios.get("http://localhost:8089/m1/selmhConnection", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.connectionData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.axios.get("http://localhost:8089/m1/selmhConnection", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.connectionData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleClick(row) {
				console.log(row);
			}
		},
		data() {
			return {
				rules: {
					sourceName: [{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					}]
				},
				deld() {
					ElMessage({
						showClose: true,
						message: '请选择删除内容!',
						type: 'error'
					});
				},
				dels() {
					ElMessage({
						showClose: true,
						message: '删除成功!',
						type: 'success'
					});
				},
				pageInfo: {
					currentPage: 1, //当前页数，由用户指定
					pagesize: 5, //每页显示的条数
					total: 0, //总记录条数，数据库查出来的
					connectionName: ""
				},
				dialogFormVisible: false,
				dialogFormVisible1: false,
				form: {
					liaisonman: "",
					connectionName: "",
					conId: '',
					connectionId: "",
					address: "",
					phone: "",
					remarks: "",
					updatename: "",
					deletename: ""
				},
				value: '',
				connectionData: [],
			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/m1/selmhConnection", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.connectionData = response.data.list
					_this.pageInfo.total = response.data.total
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>
</style>
