 <template>
  <el-main style="text-align:left; line-height: 1.8em;">
    <h3 style="color:#333">
      <span  @click="goToHome" style="cursor: pointer;color:#409EFF">{{this.projectName}}</span>配件列表
      <el-button type="primary" style="float: right;" @click="dialogFormVisible = true">添加配件</el-button>
      <el-button style="float: right;margin-right:20px" onclick="exportExcel('#expenditureContractlist')">点击导出</el-button>
      <el-input v-model="inputData" placeholder="请输入搜索内容" @input="play(inputData)" style="width:200px;float: right;;margin-right:0px"></el-input>
    </h3>
    <el-dialog title="添加配件" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="成本单价(元)" prop="cost">
          <el-input type="number"  v-model="form.cost" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="单价(元)" prop="price">
          <el-input type="number"  v-model="form.price" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="类别">
            <el-select v-model="form.category" placeholder="请选择" style="width:46%" >
            <el-option label="设备" value="设备"></el-option>
            <el-option label="软件" value="软件"></el-option>
            <el-option label="视频" value="视频"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="class">
          <el-cascader
            v-model="form.class"
            :options="jsondata.listjson()"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            clearable
            filterable
            style="width:46%;">
          </el-cascader>
        </el-form-item>
        <el-form-item label="参数" prop="detail">
          <el-input type="textarea" v-model="form.detail" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="content">
          <el-input type="textarea" v-model="form.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">确定添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button @click="resetForm('form')" style="float:right">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogAddVisible">
      <el-form ref="formModify" :model="formModify" :rules="rules"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formModify.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="formModify.brand" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="formModify.unit" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="成本单价(元)" prop="cost">
          <el-input type="number"  v-model="formModify.cost" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="单价(元)" prop="price">
          <el-input type="number"  v-model="formModify.price" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="类别">
            <el-select v-model="formModify.category" placeholder="请选择" style="width:46%" >
            <el-option label="设备" value="设备"></el-option>
            <el-option label="软件" value="软件"></el-option>
            <el-option label="视频" value="视频"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="class">
          <el-cascader
            v-model="form.class"
            :options="jsondata.listjson()"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            clearable
            filterable
            style="width:46%;">
          </el-cascader>
          {{prodcutstemplateclass}}
        </el-form-item>
        <el-form-item label="参数" prop="detail">
          <el-input type="textarea" v-model="formModify.detail" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="content">
          <el-input type="textarea" v-model="formModify.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormModify('formModify')">确定修改</el-button>
          <el-button @click="dialogAddVisible = false">取消</el-button>
          <el-button @click="outerVisible=true" style="float:right">删除</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
        width="30%"
        title="确认删除"
        :visible.sync="outerVisible"
        append-to-body>
        <el-button @click="outerVisible = false">取消</el-button>
        <el-button @click="deletepost">删除</el-button>
    </el-dialog>
    <el-table :data="tableData_s" @row-click="handle" border id="expenditureContractlist" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="category" label="类别" width="80"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="brand" label="品牌" width="120"></el-table-column>
      <el-table-column prop="unit" label="单位" width="80"></el-table-column>
      <el-table-column prop="cost" label="成本单价(元)" width="100"></el-table-column>
      <el-table-column prop="price" label="单价(元)" width="80"></el-table-column>
      <el-table-column prop="class" label="分类" ></el-table-column>
      <el-table-column prop="detail" label="工艺及材料说明"></el-table-column>
      <el-table-column prop="content" label="备注" ></el-table-column>
    </el-table>
  </el-main>
</template>
<script>
// import axios from 'axios'

export default {
  data () {
    return {
      form: {
        name: '',
        unit: '个',
        content: '无',
        class: '',
        brand: '',
        detail: '',
        price: ''
      },
      productsclassvalue: [],
      outerVisible: false,
      tableData_s: [],
      table: [],
      inputData: '',
      boxvalue: true,
      boxvalue1: false,
      hetongjiner: 0, // 合同金额
      yingshou: 0, // 应收金额
      zongshouru: 0, // 到账金额
      weishou: 0, // 未收金额
      biujifapiao: 0, // 不计发河北村
      weikaifapiao: 0, // 已付款未收票
      formbf: [],
      projectName: '',
      Customerlist: [],
      tableData: [],
      dialogAddVisible: false,
      dialogFormVisible: false,
      formModify: {}, // 添加收到金额
      TransactionList: {},
      prodcutstemplateclass: '',
      formTransactionList: [], // 交易列表
      formTransaction: { // 交易
        MoneyClass: '',
        CollectMoney: '',
        AmountMoney: '',
        invoice: '',
        projectId: this.$route.params.id
      },
      optionsprojectClass: [],
      optionsOtherParty: [],
      rules: {
        name: [
          { required: true, message: '配件名称', trigger: 'blur' }
        ],
        cost: [
          { required: true, message: '填写价格', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '选择单位', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '选择分类', trigger: 'blur' }
        ]
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
    handleChange (value) {
      // this.form.class = JSON.stringify(value)
      console.log(value)
    },
    submitFormModify (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updatpostData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async updatpostData () { // 更新数据
      this.formModify.detail = this.formModify.detail.replace(/\n/g, '\n')
      this.formModify.class = JSON.stringify(this.formModify.class)
      if (await this.jsondata.updatpostData('products', this.formModify) === 'OK') {
        this.dialogAddVisible = false
        this.getdata()
      }
    },
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
    async postData () { // 添加数据
      console.log(this.form)
      this.form.class = JSON.stringify(this.form.class)
      this.form.detail = this.form.detail.replace(' ', '/n')
      if (await this.jsondata.postData('products', this.form) === 'OK') {
        this.dialogFormVisible = false
        this.getdata()
        this.resetForm('form')
      }
    },
    async getdata () {
      this.tableData = await this.jsondata.getData('products')
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].class = this.jsondata.classstrog(this.tableData[i].class)
      }
      this.tableData_s = this.tableData
    },
    async deletepost () { // 删除
      if (await this.jsondata.deletepost('products', this.formModify.id) === 'OK') {
        this.dialogAddVisible = false
        this.outerVisible = false
        this.getdata()
      }
    },
    async handle (row, event, column) { // 点击列表
      this.dialogAddVisible = true
      this.prodcutstemplateclass = row.class
      this.formModify = await this.jsondata.getDataId('products', row.id)
    },
    goToHome () {
      this.$router.push('/projectdetails/' + this.$route.params.id)
    },
    play (input) {
      let _this = this
      _this.table = _this.tableData.filter(Val => {
        if (Val.name.includes(input) || Val.class.includes(input) || Val.brand.includes(input) || Val.detail.includes(input)) {
          _this.table.push(Val)
          return _this.table
        }
      })
      this.tableData_s = _this.table
    }
  }
}
</script>
