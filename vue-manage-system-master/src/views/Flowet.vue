<template>

	<!-- 显示请假申请 -->
	<el-dialog title="请假申请流程" v-model="dialogFormVisible1" :before-close="close1">
		<el-form :model="form" :rules="rules">
			<el-form-item style="margin-left: 10px;">
				申请人: <el-input v-model="form.empVo.empname" disabled style="width: 450px;"></el-input>
			</el-form-item>
			<el-form-item>
				开始时间: <el-date-picker v-model="form.kstime" disabled style="width: 450px;" type="datetime"
					placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				结束时间: <el-date-picker v-model="form.jsdata" disabled style="width: 450px;" type="datetime"
					placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				请假时长: <el-input v-model="form.qjsc" disabled style="width: 450px;"></el-input>
			</el-form-item>
			<el-form-item>
				申请理由: <el-input v-model="form.sqqq" disabled style="width: 450px;"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="close1()">关闭</el-button>
			</span>
		</template>
	</el-dialog>

	<!-- 显示报销申请 -->
	<el-dialog title="报销申请流程" v-model="dialogFormVisible3" :before-close="close1">
		<el-form :model="form" :rules="rules">
			<el-form-item style="margin-left: 10px;">
				申请人: <el-input v-model="form.empVo.empname" disabled style="width: 420px;"></el-input>
			</el-form-item>
			<el-form-item>
				开始时间: <el-date-picker v-model="form.kstime" disabled style="width: 420px;" type="datetime"
					placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				报销金额: <el-input v-model="form.bxmoney" disabled style="width: 420px;"></el-input>
			</el-form-item>
			<el-form-item style="margin-left: 27px;">
				备注: <el-input v-model="form.sqqq" disabled style="width: 420px;"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="close1()">关闭</el-button>
			</span>
		</template>
	</el-dialog>
	<!-- 显示加班申请 -->
	<el-dialog title="加班申请流程" v-model="dialogFormVisible5" :before-close="close1">
		<el-form :model="form" :rules="rules">
			<el-form-item style="margin-left: 10px;">
				申请人: <el-input v-model="form.empVo.empname" disabled style="width: 420px;"></el-input>
			</el-form-item>
			<el-form-item>
				开始时间: <el-date-picker v-model="form.kstime" disabled style="width: 450px;" type="datetime"
					placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				结束时间: <el-date-picker v-model="form.jsdata" disabled style="width: 450px;" type="datetime"
					placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				加班原因: <el-input v-model="form.sqqq" disabled style="width: 450px;"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="close1()">关闭</el-button>
			</span>
		</template>
	</el-dialog>

	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="刘经理" name="first">
			<el-table :data="flowData" border style="width: 100%" @selection-change="handleSelectionChange"
				ref="multipleTable">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="fid" label="编号" width="50" align="center">
				</el-table-column>
				<el-table-column prop="flowname" label="流程名称" width="160" align="center">
					<template #default="scope">
						<a style="color: #2D8CF0;" @click="showEdit(scope.row)">
							{{scope.row.flowname}}
						</a>
					</template>
				</el-table-column>
				<el-table-column prop="empVo.empname" label="申请人" width="160" align="center">
				</el-table-column>
				<el-table-column prop="empVo.zhiweiVo.zwname" label="当前节点" width="180" align="center">
				</el-table-column>
				<el-table-column prop="initiatetime" label="发起时间" width="200" align="center">
				</el-table-column>
				<el-table-column prop="status" label="审核结果" width="160" align="center">
					<template v-slot="slot">
						<p v-if="slot.row.status==0" style="color: #20A0FF;">审批中</p>
						<p v-if="slot.row.status==1" style="color: #00A854;">审批通过</p>
						<p v-if="slot.row.status==2">审批不通过</p>
						<p v-if="slot.row.status==3" style="color: #777777;">撤销</p>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template #default="scope">
						<el-button type="text" size="small" @click="updstatus(scope.row)">
							通过
						</el-button>
						<el-button type="text" size="small" @click="updstatus1(scope.row)">
							驳回
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tab-pane>

		<el-tab-pane label="罗经理" name="second">
			<el-table :data="flow2Data" border style="width: 100%" @selection-change="handleSelectionChange"
				ref="multipleTable">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="fid" label="编号" width="50" align="center">
				</el-table-column>
				<el-table-column prop="flowname" label="流程名称" width="160" align="center">
					<template #default="scope">
						<a style="color: #2D8CF0;" @click="showEdit(scope.row)">
							{{scope.row.flowname}}
						</a>
					</template>
				</el-table-column>
				<el-table-column prop="empVo.empname" label="申请人" width="160" align="center">
				</el-table-column>
				<el-table-column prop="empVo.zhiweiVo.zwname" label="当前节点" width="180" align="center">
				</el-table-column>
				<el-table-column prop="initiatetime" label="发起时间" width="200" align="center">
				</el-table-column>
				<el-table-column prop="status" label="审核结果" width="160" align="center">
					<template v-slot="slot">
						<p v-if="slot.row.status==0" style="color: #20A0FF;">审批中</p>
						<p v-if="slot.row.status==1" style="color: #00A854;">审批通过</p>
						<p v-if="slot.row.status==2">审批不通过</p>
						<p v-if="slot.row.status==3" style="color: #777777;">撤销</p>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template #default="scope">
						<el-button type="text" size="small" @click="updstatus(scope.row)">
							通过
						</el-button>
						<el-button type="text" size="small" @click="updstatus1(scope.row)">
							驳回
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tab-pane>
		<el-tab-pane label="已审批 " name="third">
			<el-table :data="flow1Data" border style="width: 100%" @selection-change="handleSelectionChange"
				ref="multipleTable">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="fid" label="编号" width="50" align="center">
				</el-table-column>
				<el-table-column prop="flowname" label="流程名称" width="160" align="center">
					<template #default="scope">
						<a style="color: #2D8CF0;" @click="showEdit(scope.row)">
							{{scope.row.flowname}}
						</a>
					</template>
				</el-table-column>
				<el-table-column prop="empVo.empname" label="申请人" width="160" align="center">
				</el-table-column>
				<el-table-column prop="empVo.zhiweiVo.zwname" label="当前节点" width="180" align="center">
				</el-table-column>
				<el-table-column prop="initiatetime" label="发起时间" width="200" align="center">
				</el-table-column>
				<el-table-column prop="status" label="审核结果" width="160" align="center">
					<template v-slot="slot">
						<p v-if="slot.row.status==0" style="color: #20A0FF;">审批中</p>
						<p v-if="slot.row.status==1" style="color: #00A854;">审批通过</p>
						<p v-if="slot.row.status==2">审批不通过</p>
						<p v-if="slot.row.status==3" style="color: #777777;">撤销</p>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template #default="scope">
						<el-button type="text" size="small" @click="updstatus(scope.row)">
							通过
						</el-button>
						<el-button type="text" size="small" @click="updstatus1(scope.row)">
							驳回
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tab-pane>
	</el-tabs>



</template>

<script>
	import qs from 'qs'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		methods: {
			showEdit(row) { //自动获取值并填入到form表单中
				if (row.flowname === "请假申请") {
					this.form.fid = row.fid
					this.form.flowname = row.flowname
					this.form.sqqq = row.sqqq
					this.form.qjsc = row.qjsc
					this.form.remarks = row.remarks
					this.form.kstime = row.kstime
					this.form.jsdata = row.jsdata
					this.form.empVo.empname = row.empVo.empname
					this.form.bxmoney = row.bxmoney
					this.dialogFormVisible1 = true
				} else if (row.flowname === "加班申请") {
					this.form.fid = row.fid
					this.form.flowname = row.flowname
					this.form.sqqq = row.sqqq
					this.form.qjsc = row.qjsc
					this.form.remarks = row.remarks
					this.form.kstime = row.kstime
					this.form.jsdata = row.jsdata
					this.form.empVo.empname = row.empVo.empname
					this.form.bxmoney = row.bxmoney
					this.dialogFormVisible5 = true
				} else {
					this.form.fid = row.fid
					this.form.flowname = row.flowname
					this.form.sqqq = row.sqqq
					this.form.qjsc = row.qjsc
					this.form.remarks = row.remarks
					this.form.kstime = row.kstime
					this.form.jsdata = row.jsdata
					this.form.empVo.empname = row.empVo.empname
					this.form.bxmoney = row.bxmoney
					this.dialogFormVisible3 = true
				}
			},
			//修改通过
			updstatus(row) {
				const _this = this
				this.$confirm('此操作将对该数据进行审核, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					row.status = 1
					this.axios.put("http://localhost:8089/m1/updstatus", row)
						.then(function(response) { // eslint-disable-line no-unused-vars
							_this.axios.get("http://localhost:8089/m1/sel1")
								.then(function(response) {
									_this.flowData = response.data
								}).catch(function(error) {
									console.log(error)
								})
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消审核!'
					});
				});
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			close1() {
				this.dialogFormVisible3 = false
				this.dialogFormVisible1 = false
				this.dialogFormVisible5 = false
			},
			close() {
				this.dialogFormVisible = false
				this.dialogFormVisible2 = false
				this.dialogFormVisible4 = false
				this.$message({
					type: 'info',
					message: '已取消操作'
				});
			},
			handleClick(row) {
				console.log(row);
			}
		},
		data() {
			return {
				activeName: 'second',
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
				dialogFormVisible: false,
				dialogFormVisible1: false,
				dialogFormVisible2: false,
				dialogFormVisible3: false,
				dialogFormVisible4: false,
				dialogFormVisible5: false,
				form: {
					empVo: {},
					zhiweiVo: {},
					liaisonman: "",
					suppliername: "",
					suppId: '',
					supplierId: "",
					address: "",
					suphone: "",
					remarks: "",
					updatename: "",
					deletename: "",
					kstime: "",
					jsdata: "",
					flowname: ""
				},
				value: '',
				flowData: [],
				flow1Data: [],
				flow2Data: [],
			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/m1/sel1")
				.then(function(response) {
					_this.flowData = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			this.axios.get("http://localhost:8089/m1/sel2")
				.then(function(response) {
					_this.flow1Data = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			this.axios.get("http://localhost:8089/m1/sel3")
				.then(function(response) {
					_this.flow2Data = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>
</style>
