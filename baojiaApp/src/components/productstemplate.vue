 <template>
  <el-main style="text-align:left; line-height: 1.8em;">
    <h3 style="color:#333">
      <span  @click="goToHome" style="cursor: pointer;color:#409EFF">{{this.projectName}}</span>配套列表
      <el-button type="primary" style="float: right;" @click="dialogFormVisible = true">添加配套模版</el-button>
      <el-button style="float: right;margin-right:20px" onclick="exportExcel('#expenditureContractlist')">点击导出</el-button>
      <el-input v-model="inputData" placeholder="请输入搜索内容" @input="playlist(inputData)" style="width:200px;float: right;margin-right:0px"></el-input>
    </h3>
    <el-dialog title="添加配套模版" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-button @click="productslistVisible=true" type="primary" style="float:right">添加配件</el-button>
          <el-input v-model="form.name" style="width:76%" ></el-input>
        </el-form-item>
        <div style="margin:20px 0px 30px 80px">
          <el-table :data="productsformadd" border :summary-method="jsondata.getSummaries" id="expenditureContractlist" height='90%' style="width: 100%">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="productsintnb" label="量数" ></el-table-column>
            <el-table-column prop="category" label="类别" width="80"></el-table-column>
            <el-table-column prop="brand" label="品牌" ></el-table-column>
            <el-table-column prop="unit" label="单位" width="50"></el-table-column>
            <el-table-column prop="cost" label="成本单价(元)" ></el-table-column>
            <el-table-column prop="price" label="单价(元)" ></el-table-column>
            <!-- <el-table-column prop="detail" label="工艺及材料说明"></el-table-column> -->
            <!-- <el-table-column prop="content" label="备注" ></el-table-column> -->
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button @click="redproducts(scope.$index, productsformadd)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form-item label="分类" prop="class">
          <el-cascader
            v-model="form.class"
            :options="jsondata.listjson()"
            :props="{ expandTrigger: 'hover' }"
            clearable
            filterable
            style="width:46%;">
          </el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="content">
          <el-input type="textarea" v-model="form.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加配套模版</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogAddVisible">
      <el-form ref="formModify" :model="formModify" :rules="rules"  label-width="80px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-button @click="productslistVisible=true" type="primary" style="float:right">添加配件</el-button>
          <el-input v-model="formModify.name" style="width:76%" ></el-input>
        </el-form-item>
        <div style="margin:20px 0px 30px 80px">
          <el-table :data="productsform" border :summary-method="jsondata.getSummaries" id="expenditureContractlist" height='90%' style="width: 100%">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="productsintnb" label="量数" width='80'></el-table-column>
            <el-table-column prop="category" label="类别" width="80"></el-table-column>
            <el-table-column prop="brand" label="品牌" ></el-table-column>
            <el-table-column prop="unit" label="单位" width="50"></el-table-column>
            <el-table-column prop="cost" label="成本单价(元)" ></el-table-column>
            <el-table-column prop="price" label="单价(元)" ></el-table-column>
            <!-- <el-table-column prop="detail" label="工艺及材料说明"></el-table-column> -->
            <!-- <el-table-column prop="content" label="备注" ></el-table-column> -->
            <el-table-column label="操作" >
              <template slot-scope="scope">
                <el-button @click="redproducts(scope.$index, productsform)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form-item label="分类" prop="class">
          <el-cascader
            v-model="formModify.class"
            :options="jsondata.listjson()"
            :props="{ expandTrigger: 'hover' }"
            clearable
            filterable
            style="width:46%;">
          </el-cascader>
          {{this.prodcutstemplateclass}}
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
        width="80%"
        title="配件列表"
        :visible.sync="productslistVisible"
        append-to-body>
          <el-form ref="form" :rules="rules"  label-width="80px" class="demo-ruleForm">
            <el-form-item label="分类" prop="class" style="width:60%;display: inline-block;">
              <el-cascader
                :options="jsondata.listjson()"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
                clearable
                filterable
                style="width:46%;">
              </el-cascader>
            </el-form-item>
            <el-input v-model="inputData" placeholder="请输入搜索内容" @input="play(inputData)" style="width:30%;float: right;margin-right:0px"></el-input>
            <div style="margin:0px 0px 30px 80px">
              <el-table :data="tableData_s" @row-click="pushproducts" border :summary-method="jsondata.getSummaries" id="expenditureContractlist" height='90%' style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="category" label="类别" width="80"></el-table-column>
                <el-table-column prop="name" label="名称" ></el-table-column>
                <el-table-column prop="brand" label="品牌" ></el-table-column>
                <el-table-column prop="unit" label="单位" width="50"></el-table-column>
                <el-table-column prop="cost" label="成本单价(元)" ></el-table-column>
                <el-table-column prop="price" label="单价(元)" ></el-table-column>
                <el-table-column prop="detail" label="工艺及材料说明"></el-table-column>
                <el-table-column prop="content" label="备注" ></el-table-column>
              </el-table>
            </div>
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
    <el-dialog
        width="30%"
        title="添加数量"
        :visible.sync="productsintbox"
        append-to-body>
        <el-form ref="form" :model="productspushdata" :rules="rules"  label-width="80px" style="text-align:center">
          <br/><br/>
          <el-form-item :label="productspushdata.name">
            <el-input type="number" v-model="productsintnb" ></el-input>
          </el-form-item>
          <el-button @click="productspushsub" type="primary" >确认</el-button>
          <el-button @click="productsintbox = false">取消</el-button>
        </el-form>
    </el-dialog>
    <el-table :data="porductsdata_s" @row-click="handle" border :summary-method="jsondata.getSummaries" id="expenditureContractlist" height='90%' style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="class" label="分类" ></el-table-column>
      <el-table-column prop="content" label="备注" ></el-table-column>
    </el-table>
  </el-main>
</template>
<script>
// import axios from 'axios'

export default {
  data () {
    return {
      prodcutstemplateclass: '',
      productspushdata: {
      },
      porductsdata: [],
      porductsdata_s: [],
      productsintnb: 1,
      productsintbox: false,
      productslistVisible: false,
      productsform: [],
      productsformadd: [],
      form: {
        name: '',
        productsid: '',
        class: '',
        content: ''
      },
      productsclassvalue: [],
      outerVisible: false,
      tableData_s: [],
      table: [],
      inputData: '',
      boxvalue: true,
      boxvalue1: false,
      productsdetail: {
        name: '',
        productsid: '',
        class: '',
        content: ''
      },
      projectName: '',
      Customerlist: [],
      tableData: [],
      dialogAddVisible: false,
      dialogFormVisible: false,
      formModify: {},
      TransactionList: {},
      formTransactionCon: '',
      optionsprojectClass: [],
      optionsOtherParty: [],
      rules: {
        name: [
          { required: true, message: '配套名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '填写价格', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '选择单位', trigger: 'blur' }
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
      this.inputData = JSON.stringify(value)
      this.inputData = this.jsondata.classstrog(this.inputData)
      this.play(this.inputData)
      console.log(this.inputData)
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
      this.formModify.class = JSON.stringify(this.formModify.class)
      for (let i = 0; i < this.productsform.length; i++) {
        this.productsform[i].detail = this.jsondata.stringreplace_up(this.productsform[i].detail)
        this.productsform[i].content = this.jsondata.stringreplace_up(this.productsform[i].content)
        if (i !== 0) {
          this.productsform[i].basicint = this.productsform[i].productsintnb
        }
      }
      this.formModify.productsid = JSON.stringify(this.productsform) // 格式化换行
      if (await this.jsondata.updatpostData('template', this.formModify) === 'OK') {
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
      this.form.class = JSON.stringify(this.form.class)
      for (let i = 0; i < this.productsformadd.length; i++) {
        this.productsformadd[i].detail = this.jsondata.stringreplace_up(this.productsformadd[i].detail)
        this.productsformadd[i].content = this.jsondata.stringreplace_up(this.productsformadd[i].content)
        if (i !== 0) {
          this.productsformadd[i].basicint = this.productsformadd[i].productsintnb
        }
      }
      this.form.productsid = JSON.stringify(this.productsformadd)
      if (await this.jsondata.postData('template', this.form) === 'OK') {
        this.dialogFormVisible = false
        this.getdata()
        this.productsformadd = []
      }
      this.resetForm('form')
    },
    async getdata () {
      this.tableData = await this.jsondata.getData('products')
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].productsint = 1
        this.tableData[i].class = this.jsondata.classstrog(this.tableData[i].class)
      }
      this.tableData_s = this.tableData
      this.porductsdata = await this.jsondata.getData('template')
      for (let i = 0; i < this.porductsdata.length; i++) {
        this.porductsdata[i].class = this.jsondata.classstrog(this.porductsdata[i].class)
      }
      this.porductsdata_s = this.porductsdata
    },
    async deletepost () { // 删除
      if (await this.jsondata.deletepost('template', this.formModify.id) === 'OK') {
        this.dialogAddVisible = false
        this.outerVisible = false
        this.getdata()
      }
    },
    async handle (row, event, column) { // 点击列表
      this.dialogAddVisible = true
      this.prodcutstemplateclass = row.class
      this.formModify = await this.jsondata.getDataId('template', row.id)
      this.productsform = JSON.parse(this.formModify.productsid)
      for (let i = 0; i < this.productsform.length; i++) {
        this.productsform[i].detail = this.jsondata.stringreplace_ld(this.productsform[i].detail)
        this.productsform[i].content = this.jsondata.stringreplace_ld(this.productsform[i].content)
      }
    },
    redproducts (index, rows) {
      rows.splice(index, 1)
    },
    pushproducts (row) {
      this.productsintbox = true
      this.productsintnb = 1
      this.productspushdata = row
    },
    productspushsub () {
      this.productspushdata.productsintnb = this.productsintnb
      if (this.dialogFormVisible) {
        this.productsformadd.push(this.productspushdata)
      }
      if (this.dialogAddVisible) {
        this.productsform.push(this.productspushdata)
      }
      this.productsintbox = false
      this.productslistVisible = false
    },
    goToHome () {
      this.$router.push('/projectdetails/' + this.$route.params.id)
    },
    play (input) {
      let _this = this
      _this.table = _this.tableData.filter(Val => {
        if (Val.name.includes(input) || Val.class.includes(input)) {
          _this.table.push(Val)
          return _this.table
        }
      })
      this.tableData_s = _this.table
    },
    playlist (input) {
      let _this = this
      _this.table = _this.porductsdata.filter(Val => {
        if (Val.name.includes(input)) {
          _this.table.push(Val)
          return _this.table
        }
      })
      this.porductsdata_s = _this.table
    }
  }
}
</script>
