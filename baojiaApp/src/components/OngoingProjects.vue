 <template>
  <el-main style="text-align:left; line-height: 1.8em;">
    <h3>
      进行中项目
      <el-button type="primary" style="float: right;" @click="dialogFormVisible = true">添加项目</el-button>
      <el-button style="float: right;margin-right:20px" onclick="exportExcel('#projectid')">点击导出</el-button>
      <el-input v-model="inputData" placeholder="请输入搜索内容" @input="play(inputData)" style="width:200px;float: right;;margin-right:0px"></el-input>
    </h3>
    <el-dialog title="添加项目" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
        <el-form-item label="日期" prop="ContractDate">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" prop="ContractAmount">
          <el-input v-model="form.manager" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="项目说明" prop="projectContent">
          <el-input type="textarea" v-model="form.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table @row-click="handle" :data="tableData_s" id="projectid" border :summary-method="jsondata.getSummaries" height="90%" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="date" label="时间" sortable></el-table-column>
      <el-table-column prop="name" label="项目名称" sortable></el-table-column>
      <el-table-column prop="manager" label="负责人" sortable></el-table-column>
      <el-table-column prop="content" label="项目说明" sortable></el-table-column>
    </el-table>
  </el-main>
</template>
<script>

export default {
  data () {
    return {
      tableData_s: [],
      table: [],
      inputData: '',
      contentsint: '',
      contentsintp: '',
      Customerlist: [],
      tableData: [],
      optionsproject: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        content: '',
        date: '',
        manager: ''
      },
      formexpenditureData: [],
      formReceivables: [],
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ]
        // CustomerName: [
        //   { required: true, message: '请选择客户名称', trigger: 'blur' }
        // ],
        // ContractAmount: [
        //   { required: true, message: '请输入合同金额' },
        // ],
        // ContractDate: [
        //   { required: true, message: '请选择签约日期', trigger: 'blur' }
        // ]
        // projectContent: [
        //   { required: true, message: '请输入项目内容', trigger: 'blur' }
        // ],        // ,

        // ExpenditureBudget: [
        //   { required: true, message: '请输入支出预算' },
        //   { type: 'number', message: '金额必需为数额' }
        // ]
      }
    }
  },
  props: { // 接收父组件传递过来的参数
    map: {
      // type:String
    }
  },
  watch: {
  },
  mounted () {
    this.getdata()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit () {
      console.log(this.form)
    },
    async postData () {
      if (await this.jsondata.postData('project', this.form) === 'OK') {
        this.getdata()
        this.dialogFormVisible = false
      }
    },
    handle (row, event, column) {
      this.$router.push('/ProjectDetails/' + row.id)
      console.log(row.id)
      // console.log(row, event, column)
    },
    async getdata () {
      this.tableData = await this.jsondata.getData('project')
      this.tableData_s = this.tableData
    },
    play (input) {
      let _this = this
      _this.table = _this.tableData.filter(Val => {
        if (Val.name.includes(input)) {
          console.log(Val)
          _this.table.push(Val)
          return _this.table
        }
      })
      this.tableData_s = _this.table
    }
  }
}
</script>
