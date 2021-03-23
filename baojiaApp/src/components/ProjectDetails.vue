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
          <el-button style="float:right" @click="outerVisibledelete = true">删除</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="添加展项" :visible.sync="subpushproductsbox">
      <el-form ref="form" :model="subpushproducts" :rules="rules"  label-width="80px" class="demo-ruleForm">
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
    <el-dialog
        class="addlist"
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
<<<<<<< HEAD
                <!-- <el-table-column prop="category" label="类别" width="80"></el-table-column> -->
                <el-table-column prop="name" label="名称" ></el-table-column>
                <el-table-column prop="brand" label="品牌" ></el-table-column>
                <!-- <el-table-column prop="unit" label="单位" width="50"></el-table-column> -->
                <el-table-column prop="cost" label="成本单价(元)" ></el-table-column>
                <el-table-column prop="price" label="单价(元)" ></el-table-column>
                <!-- <el-table-column prop="detail" label="工艺及材料说明"></el-table-column> -->
                <!-- <el-table-column prop="content" label="备注" ></el-table-column> -->
=======
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="detail" label="参数" ></el-table-column>
                <el-table-column prop="price" label="价格" sortable></el-table-column>
                <el-table-column prop="class" label="分类" ></el-table-column>
                <el-table-column prop="company" label="单位" ></el-table-column>
                <el-table-column label="操作" >
                  <template slot-scope="scope">
                    <el-button @click="pushproducts(scope.row)" type="text" size="small">添加</el-button>
                  </template>
                </el-table-column>
>>>>>>> parent of be5746b... 修复错乱版本
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
                <el-table-column prop="detail" label="参数" ></el-table-column>
                <el-table-column prop="price" label="价格" sortable></el-table-column>
                <el-table-column prop="class" label="分类" ></el-table-column>
                <el-table-column prop="company" label="单位" ></el-table-column>
                <el-table-column label="操作" >
                  <template slot-scope="scope">
                    <el-button @click="pushproducts(scope.row)" type="text" size="small">添加</el-button>
                  </template>
                </el-table-column>
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
    <h3>
      项目明细
      <el-button type="primary" style="float: right; margin-left:10px;" @click="dialogFormVisible = true">修改</el-button>
      <el-button type="primary" style="float: right; margin-left:10px;" @click="subpushproductsbox = true">添加展项</el-button>
      <el-button style="float: right;margin-right:0px" onclick="exportExcel('#projectdate')">点击导出</el-button>
    </h3>
    <div class="titledivbox">
      <table><tr><th colspan="8" ><h3 >总额：{{total_money}}</h3></th></tr></table>
      <el-table :data="gongcheng" border show-summary :summary-method="jsondata.getSummaries" class="titletop" style="width: 100%">
        <el-table-column prop="category" label="类别" width="80"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="brand" label="品牌" width="120"></el-table-column>
        <el-table-column prop="productsintnb" label="数量" width="80"></el-table-column>
        <el-table-column prop="unit" label="单位" width="50"></el-table-column>
        <el-table-column prop="cost" label="成本单价(元)" width="130"></el-table-column>
        <el-table-column prop="price" label="单价(元)" width="130"></el-table-column>
        <el-table-column prop="money" label="小计(元)" width="130"></el-table-column>
        <el-table-column prop="detail" label="工艺及材料说明"></el-table-column>
        <el-table-column prop="content" label="备注" ></el-table-column>
        <el-table-column label="操作" ></el-table-column>
      </el-table>
    </div>
    <div id="projectdate">
    <table><tr><th colspan="8" ><h3 >总额：还没计算</h3></th></tr></table>
    <hr style="height: 30px;background-color: #eee;border: 0px;" />
    <el-row v-for="item in subData" :key="item.id">
      <div style="position: absolute;right: 10px;top: 5px;">
        <el-button @click="templatelistVisible = true, pushproductsid = item.indexid">添加套件</el-button>
        <el-button @click="productslistVisible = true, pushproductsid = item.indexid">添加单件</el-button>
        <el-button @click="redsubproducts(item.id)">修改</el-button>
        <el-button @click="outerVisible = true, deleteprojectsub = item.id">删除</el-button>
      </div>
      <table><tr><th colspan="1" > <h3>{{item.name}} --- {{item.projectclass}}</h3></th></tr></table>
      <el-table :data="item.products" border show-summary :summary-method="jsondata.getSummaries"  style="width: 100%">
        <el-table-column prop="class" label="类别" ></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格" sortable></el-table-column>
        <el-table-column prop="productsintnb" label="单位" ></el-table-column>
        <el-table-column prop="money" label="总价" ></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
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
      inputData: '',
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
        label: '道具',
        children: [{
          value: 'fankui',
          label: '反馈'
        }, {
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }]
      }, {
        value: 'LED屏',
        label: 'LED屏'
      }, {
        value: '投影',
        label: '投影'
      }, {
        value: '屏幕',
        label: '屏幕',
        children: [{
          value: '拼接屏',
          label: '拼接屏',
          children: [{
            value: '进口',
            label: '进口'
          }, {
            value: '国产',
            label: '国产'
          }]
        }, {
          value: '一体机',
          label: '一体机',
          children: [{
            value: '一体机(不触摸)',
            label: '一体机(不触摸)'
          }, {
            value: '电容触摸一体机',
            label: '电容触摸一体机'
          }, {
            value: '红外触摸一体机',
            label: '红外触摸一体机'
          }]
        }, {
          value: '广告机',
          label: '广告机'
        }, {
          value: '全息屏(带柜体)',
          label: '全息屏(带柜体）'
        }, {
          value: '全息屏(不带柜体)',
          label: '全息屏(不带柜体)'
        }]
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
      projectsubData: [],
      stringreplace: '---' // 换行字符串替换
    }
  },
  mounted () {
    // this.getFormData('supplierlist')
    // this.getFormDataClass('expenditureclass')
    this.getdata()
  },
  watch: {
    // subData: {// 深度监听，可监听到对象、数组的变化
    //   handler (newValue, oldValue) {
    //     console.log(newValue, oldValue)
    //     if (newValue.length === oldValue.length) {
    //       for (let i = 0; i < newValue.length; i++) {
    //         if (newValue[i].products.length === oldValue[i].products.length) {
    //           if (JSON.stringify(newValue[i].products) === JSON.stringify(oldValue[i].products)) {
    //           }
    //         }
    //       }
    //     }
    //   },
    //   immediate: false,
    //   deep: true // true 深度监听
    // }
  },
  methods: {
    redproducts (index, rows, projectidint) {
      rows.products.splice(index, 1)
      this.serverproducts.products = JSON.stringify(rows.products)
      this.serverproducts.id = rows.id
      this.updatpostData('projectsub', this.serverproducts)
    },
    async redsubproducts (projectsubid) {
      this.subredproductsbox = true
      this.subredproducts = await this.jsondata.getDataId('projectsub', projectsubid)
    },
    productspushsub () {
      if (this.productslistVisible === true) {
        this.productspushdata.productsintnb = this.productsintnb
        this.productspushdata.money = this.jsondata.currency(Number(this.productspushdata.productsintnb) * Number(this.productspushdata.price), '￥', 2)
        this.productspushdata.price = this.productspushdata.price + '/' + this.productspushdata.company
        this.productspushdata.productsintnb = '共 ' + this.productsintnb + ' ' + this.productspushdata.company
        this.subData[this.pushproductsid].products.push(this.productspushdata)
      }
      if (this.templatelistVisible === true) {
        this.productstemplatedata = JSON.parse(this.productspushdata.productsid)
        for (let i = 0; i < this.productstemplatedata.length; i++) {
          this.productstemplatedata[i].productsintnb = this.productsintnb
          this.productstemplatedata[i].money = this.jsondata.currency(Number(this.productstemplatedata[i].productsintnb) * Number(this.productstemplatedata[i].price), '￥', 2)
          this.productstemplatedata[i].price = this.productstemplatedata[i].price + '/' + this.productstemplatedata[i].company
          this.productstemplatedata[i].productsintnb = '共 ' + this.productsintnb + ' ' + this.productstemplatedata[i].company
          this.subData[this.pushproductsid].products.push(this.productstemplatedata[i])
        }
      }
      this.serverproducts.products = JSON.stringify(this.subData[this.pushproductsid].products)
      this.serverproducts.id = this.subData[this.pushproductsid].id
      this.updatpostData('projectsub', this.serverproducts)
    },
    pushproducts (row) {
      this.productspushdata = {}
      this.productsintbox = true
      this.productsintnb = 1
      this.productspushdata = row
      console.log(this.productspushdata)
    },
    handleChange (value) {
      this.inputData = JSON.stringify(value)
      this.inputData = this.jsondata.classstrog(this.inputData)
      this.play(this.inputData)
      this.templateplay(this.inputData)
    },
    async getdata () {
      this.form = await this.jsondata.getDataId('project', this.$route.params.id)
      this.projectsubData = await this.jsondata.getDataClass('projectsub', this.$route.params.id, 'projectid')
      this.subData = this.projectsubData
      for (let i = 0; i < this.projectsubData.length; i++) {
        this.subData[i].products = JSON.parse(this.projectsubData[i].products)
        // for (let is = 0; is < this.subData[is].products.length; is++) {
        //   this.subData[i].products[is].money = this.jsondata.currency(this.subData[i].products[is].money, '￥', 2)
        //   this.subData[i].products[is].price = this.subData[i].products[is].price + '/' + this.subData[i].products[is].company
        //   this.subData[i].products[is].productsintnb = '共 ' + this.subData[i].products[is].productsintnb + ' ' + this.subData[i].products[is].company
        // }
        this.subData[i].indexid = i
      }
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
        // this.productslistVisible = false
        // this.templatelistVisible = false
        if (list === 'project') {
          this.$router.push('/index/')
        } else {
          this.getdata()
        }
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
    upGo (fieldData, index) {
      let sqlid = fieldData.id
      fieldData = fieldData.products
      if (index !== 0) {
        fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0]
      } else {
        fieldData.push(fieldData.shift())
      }
      this.modifyjson(fieldData, sqlid)
    },
    downGo (fieldData, index) {
      let sqlid = fieldData.id
      fieldData = fieldData.products
      if (index !== fieldData.length - 1) {
        fieldData[index] = fieldData.splice(index + 1, 1, fieldData[index])[0]
      } else {
        fieldData.unshift(fieldData.splice(index, 1)[0])
      }
      this.modifyjson(fieldData, sqlid)
    },
    play (input) {
      let _this = this
      _this.table = _this.tableData.filter(Val => {
        if (Val.name.includes(input) || Val.class.includes(input) || Val.cost.includes(input)) {
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
