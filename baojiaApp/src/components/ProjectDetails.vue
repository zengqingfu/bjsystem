 <template>
  <el-main style="text-align:left; line-height: 1.8em;">
    <el-dialog title="修改项目" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px" class="demo-ruleForm">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.manager" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="项目说明">
          <el-input type="textarea" v-model="form.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatpostData('project', form)">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <!-- <el-button style="float:right" @click="outerVisible = true">删除</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="添加展项" :visible.sync="subpushproductsbox">
      <el-form ref="subpushproducts" :model="subpushproducts" :rules="rules"  label-width="80px" class="demo-ruleForm">
        <el-form-item label="展项名称" prop="name">
          <el-input v-model="subpushproducts.name"></el-input>
        </el-form-item>
        <el-form-item label="展项分类" prop="projectclass">
          <el-input v-model="subpushproducts.projectclass" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="展项说明" prop="content">
          <el-input type="textarea" v-model="subpushproducts.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('subpushproducts')">添加</el-button>
          <el-button @click="subpushproductsbox = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改展项" :visible.sync="subredproductsbox">
      <el-form ref="subredproducts" :model="subredproducts" :rules="rules"  label-width="80px" class="demo-ruleForm">
        <el-form-item label="展项名称" prop="name">
          <el-input v-model="subredproducts.name"></el-input>
        </el-form-item>
        <el-form-item label="展项分类" prop="projectclass">
          <el-input v-model="subredproducts.projectclass" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="展项说明" prop="content">
          <el-input type="textarea" v-model="subredproducts.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatpostData('projectsub', subredproducts), subredproductsbox = false">修改</el-button>
          <el-button @click="subredproductsbox = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改产品信息" :visible.sync="subredproductsboxred">
      <el-form ref="subredproductsred" :model="subredproductsred" label-width="80px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="subredproductsred.name"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input type="number" v-model="subredproductsred.price" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="price">
          <el-input type="number" v-model="subredproductsred.productsintnb" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="content">
          <el-input type="textarea" v-model="subredproductsred.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatpostData_products()">修改</el-button>
          <el-button @click="subredproductsboxred = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="调整" :visible.sync="modsubredproductsbox">
      <el-form ref="modsubredproducts" :model="modsubredproducts" :rules="rules"  label-width="80px" class="demo-ruleForm">
        <el-form-item label="展项名称" prop="name">
          <el-input v-model="modsubredproducts.name"></el-input>
        </el-form-item>
        <el-form-item label="展项分类" prop="projectclass">
          <el-input v-model="modsubredproducts.projectclass" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="展项说明" prop="content">
          <el-input type="textarea" v-model="modsubredproducts.content" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatpostData('projectsub', modsubredproducts), modsubredproductsbox = false">修改</el-button>
          <el-button @click="modsubredproductsbox = false">取消</el-button>
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
                :options="productsclass"
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
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="detail" label="参数" ></el-table-column>
                <el-table-column prop="price" label="价格" sortable></el-table-column>
                <el-table-column prop="company" label="单位" ></el-table-column>
                <el-table-column prop="class" label="分类" ></el-table-column>
                <el-table-column prop="content" label="备注" ></el-table-column>
              </el-table>
            </div>
           </el-form>
    </el-dialog>
    <el-dialog
        width="80%"
        title="配套列表"
        :visible.sync="templatelistVisible"
        append-to-body>
          <el-form ref="form" :rules="rules"  label-width="80px" class="demo-ruleForm">
            <el-form-item label="分类" prop="class" style="width:60%;display: inline-block;">
              <el-cascader
                :options="productsclass"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
                clearable
                filterable
                style="width:46%;">
              </el-cascader>
            </el-form-item>
            <el-input v-model="inputData" placeholder="请输入搜索内容" @input="templateplay(inputData)" style="width:30%;float: right;margin-right:0px"></el-input>
            <div style="margin:0px 0px 30px 80px">
              <el-table :data="templateData_s" @row-click="pushproducts" border :summary-method="jsondata.getSummaries" id="expenditureContractlist" height='90%' style="width: 100%">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="detail" label="内容" ></el-table-column>
                <el-table-column prop="class" label="分类" ></el-table-column>
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
        <el-button @click="updatpostData_end ()">删除</el-button>
    </el-dialog>
    <el-dialog
        width="300px"
        title="添加数量"
        :visible.sync="productsintbox"
        append-to-body>
        <el-form ref="form" :model="productspushdata" :rules="rules"  label-width="120px" style="text-align:center">
          <br/><br/>
          <el-form-item :label="productspushdata.name">
            <el-input type="number" v-model="productsintnb" ></el-input>
          </el-form-item>
          <el-button @click="productspushsub" type="primary" >确认</el-button>
          <el-button @click="productsintbox = false">取消</el-button>
        </el-form>
    </el-dialog>
    <h3  style="position: fixed;right: 100px;z-index: 99;top: 0px;margin: 10px;">
      <el-button style="float: right; margin-left:15px;" @click="dialogFormVisible = true">修改</el-button>
      <el-button style="float: right; margin-left:15px;" @click="subpushproductsbox = true">添加展项</el-button>
      <el-button style="float: right;margin-right:0px" onclick="exportExcel('#projectdate')">点击导出</el-button>
    </h3>
    <div id="projectdate">
    <table><tr><th colspan="8" ><h3 >总额：{{total_money}}</h3></th></tr></table>
    <hr style="height: 30px;background-color: #eee;border: 0px;" />
    <el-row v-for="item in subData" :key="item.id">
      <div style="position: absolute;right: 0px;top: 20px;">
        <el-button type="primary" @click="templatelistVisible = true, pushproductsid = item.indexid">添加套件</el-button>
        <el-button type="primary" @click="productslistVisible = true, pushproductsid = item.indexid">添加单件</el-button>
        <el-button type="primary" @click="redsubproducts(item.id)">修改</el-button>
        <el-button @click="outerVisible = true, deleteprojectsub = item.id">删除</el-button>
      </div>
      <table><tr><th colspan="1" > <h3>{{item.name}} --- {{item.projectclass}}</h3></th></tr></table>
      <el-table :data="item.products" border show-summary :summary-method="jsondata.getSummaries"  style="width: 100%">
        <el-table-column prop="class" label="类别" ></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="productsintnb" label="单位" ></el-table-column>
        <el-table-column prop="money" label="总价" ></el-table-column>
        <el-table-column prop="content" label="备注" ></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="text" @click="productssubmod(scope.$index, item)" size="small">调整信息</el-button>
            <el-button @click="redproducts(scope.$index, item)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    </div>
  </el-main>
</template>
<style>
</style>

<script>
export default {
  data () {
    return {
      total_money: 0,
      subredproductsred: {},
      subredproductsboxred: false,
      inputData: '',
      modsubredproducts: {},
      modsubredproductsbox: false,
      subredproductsbox: false,
      productsintbox: false,
      subredproducts: {},
      productslistVisible: false,
      subpushproductsbox: false,
      projectdata: '', // 项目例表
      subpushproducts: {
        name: '',
        content: '',
        projectclass: '',
        projectid: this.$route.params.id,
        products: '[]'
      },
      templatelistVisible: false,
      templateData: [],
      templateData_s: [],
      productspushdata: [],
      dataList: [],
      productsintnb: [],
      projectContract: [],
      outerVisible: false,
      productstemplatedata: [],
      gongcheng: [],
      yewu: [],
      productsclass: [{
        value: '道具',
        label: '道具'
      }, {
        value: 'LED屏',
        label: 'LED屏'
      }, {
        value: '投影',
        label: '投影'
      }, {
        value: '屏幕',
        label: '屏幕'
      }, {
        value: '广告物料',
        label: '广告物料'
      }, {
        value: '模型',
        label: '模型'
      }, {
        value: '艺术装置',
        label: '艺术装置'
      }, {
        value: '配件',
        label: '配件'
      }, {
        value: '程序',
        label: '程序'
      }, {
        value: '视频',
        label: '视频'
      }],
      serverproducts: {},
      zhongshouru: '',
      weishoukuan: '',
      projectName: '',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        projectclass: [
          { required: true, message: '请选择签约日期', trigger: 'blur' }
        ]
      },
      table: [],
      Receivables: [],
      expenditure: [],
      optionsproject: [],
      dialogFormVisible: false,
      form: {},
      contentsinvoice: '',
      contentsint: '',
      Receivablesint: '',
      pushproductsid: '',
      deleteprojectsub: '',
      tableData_s: [],
      subData: [],
      projectsubData: []
    }
  },
  mounted () {
    // this.getFormData('supplierlist')
    // this.getFormDataClass('expenditureclass')
    this.getdata()
  },
  methods: {
    redproducts (index, rows) {
      this.projectsubData[rows.indexid].products.splice(index, 1)
      this.serverproducts.products = JSON.stringify(this.projectsubData[rows.indexid].products)
      this.serverproducts.id = rows.id
      this.updatpostData('projectsub', this.serverproducts)
    },
    updatpostData_products () {
      this.subredproductsboxred = false
      console.log(this.subredproductsred)
      this.subredproductsred.money = Number(this.subredproductsred.productsintnb) * Number(this.subredproductsred.price)
      this.serverproducts.products = JSON.stringify(this.modsubredproducts.products)
      this.serverproducts.id = this.modsubredproducts.id
      this.updatpostData('projectsub', this.serverproducts)
    },
    productssubmod (index, rows) {
      this.subredproductsboxred = true
      this.modsubredproducts = this.projectsubData[rows.indexid]
      this.modsubredproducts.indexlist = index
      this.subredproductsred = this.modsubredproducts.products[this.modsubredproducts.indexlist]
    },
    async redsubproducts (projectsubid) {
      this.subredproductsbox = true
      this.subredproducts = await this.jsondata.getDataId('projectsub', projectsubid)
    },
    productspushsub () {
      if (this.productslistVisible === true) {
        this.productspushdata.productsintnb = Number(this.productsintnb)
        this.productspushdata.money = Number(this.productspushdata.productsintnb) * Number(this.productspushdata.price)
        this.projectsubData[this.pushproductsid].products.push(this.productspushdata)
      }
      if (this.templatelistVisible === true) {
        this.productstemplatedata = JSON.parse(this.productspushdata.productsid)
        for (let i = 0; i < this.productstemplatedata.length; i++) {
          this.productstemplatedata[i].productsintnb = Number(this.productsintnb)
          this.productstemplatedata[i].money = Number(this.productstemplatedata[i].productsintnb) * Number(this.productstemplatedata[i].price)
          this.projectsubData[this.pushproductsid].products.push(this.productstemplatedata[i])
        }
      }
      this.serverproducts.products = JSON.stringify(this.projectsubData[this.pushproductsid].products)
      this.serverproducts.id = this.subData[this.pushproductsid].id
      this.updatpostData('projectsub', this.serverproducts)
    },
    pushproducts (row) {
      this.productsintbox = true
      this.productsintnb = 1
      this.productspushdata = row
    },
    handleChange (value) {
      this.inputData = JSON.stringify(value)
      this.inputData = this.jsondata.classstrog(this.inputData)
      this.play(this.inputData)
      this.templateplay(this.inputData)
    },
    async getdata () {
      this.total_money = 0
      this.form = await this.jsondata.getDataId('project', this.$route.params.id)
      this.projectsubData = await this.jsondata.getDataClass('projectsub', this.$route.params.id, 'projectid')
      this.subData = JSON.parse(JSON.stringify(this.projectsubData))
      for (let i = 0; i < this.subData.length; i++) {
        this.subData[i].products = JSON.parse(this.subData[i].products)
        this.projectsubData[i].products = JSON.parse(this.projectsubData[i].products)
        this.subData[i].indexid = i
        this.projectsubData[i].indexid = i
        for (let is = 0; is < this.subData[i].products.length; is++) {
          this.total_money += this.subData[i].products[is].money
          this.subData[i].products[is].money = this.jsondata.currency(this.subData[i].products[is].money, '￥', 2)
          this.subData[i].products[is].price = '￥' + this.subData[i].products[is].price + ' / ' + this.subData[i].products[is].company
          this.subData[i].products[is].productsintnb = '共 ' + this.subData[i].products[is].productsintnb + ' ' + this.subData[i].products[is].company
        }
      }
      this.total_money = this.jsondata.currency(this.total_money, '￥', 2)
      this.templateData = await this.jsondata.getData('template')
      for (let i = 0; i < this.templateData.length; i++) {
        this.templateData[i].productsint = 1
        this.templateData[i].class = this.jsondata.classstrog(this.templateData[i].class)
      }
      this.templateData_s = this.templateData
      this.tableData = await this.jsondata.getData('products')
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].productsint = 1
        this.tableData[i].class = this.jsondata.classstrog(this.tableData[i].class)
      }
      this.tableData_s = this.tableData
    },
    async updatpostData (list, formdata) { // 更新数据
      if (await this.jsondata.updatpostData(list, formdata) === 'OK') {
        this.dialogFormVisible = false
        this.productsintbox = false
        this.productslistVisible = false
        this.templatelistVisible = false
        this.getdata()
      }
    },
    async updatpostData_end () { // 删除
      if (await this.jsondata.deletepost('projectsub', this.deleteprojectsub) === 'OK') {
        this.outerVisible = false
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
    async postData () { // 添加数据
      if (await this.jsondata.postData('projectsub', this.subpushproducts) === 'OK') {
        this.subpushproductsbox = false
        this.getdata()
        this.$refs['subpushproducts'].resetFields()
      }
    },
    play (input) {
      let _this = this
      _this.table = _this.tableData.filter(Val => {
        if (Val.name.includes(input) || Val.class.includes(input) || Val.price.includes(input)) {
          _this.table.push(Val)
          return _this.table
        }
      })
      this.tableData_s = _this.table
    },
    templateplay (input) {
      let _this = this
      _this.table = _this.templateData.filter(Val => {
        if (Val.name.includes(input) || Val.class.includes(input)) {
          _this.table.push(Val)
          return _this.table
        }
      })
      this.templateData_s = _this.table
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 6) {
        const _row = this.dataList[row.projectint][rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>
