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
        class="addlist"
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
                <!-- <el-table-column prop="category" label="类别" width="80"></el-table-column> -->
                <el-table-column prop="name" label="名称" ></el-table-column>
                <el-table-column prop="brand" label="品牌" ></el-table-column>
                <!-- <el-table-column prop="unit" label="单位" width="50"></el-table-column> -->
                <el-table-column prop="cost" label="成本单价(元)" ></el-table-column>
                <el-table-column prop="price" label="单价(元)" ></el-table-column>
                <!-- <el-table-column prop="detail" label="工艺及材料说明"></el-table-column> -->
                <!-- <el-table-column prop="content" label="备注" ></el-table-column> -->
              </el-table>
            </div>
           </el-form>
    </el-dialog>
    <el-dialog
        class="addlist"
        title="配套列表"
        :visible.sync="templatelistVisible"
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
        width="30%"
        title="确认删除项目"
        :visible.sync="outerVisibledelete"
        append-to-body>
        <el-button @click="outerVisible = false">取消</el-button>
        <el-button @click="form.close = 1; updatpostData ('project', form)">删除</el-button>
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
    <div class="titledivbox">
      <table><tr><th colspan="8" ><h3 >总额：{{total_money}}</h3></th></tr></table>
      <el-table :data="gongcheng" border show-summary :summary-method="jsondata.getSummaries" class="titletop" style="width: 100%">
        <el-table-column prop="category" label="类别" width="101"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="brand" label="品牌" width="120"></el-table-column>
        <el-table-column prop="productsintnb" label="数量" width="90"></el-table-column>
        <el-table-column prop="unit" label="单位" width="70"></el-table-column>
        <el-table-column prop="cost" label="成本单价(元)" width="130"></el-table-column>
        <el-table-column prop="price" label="单价(元)" width="130"></el-table-column>
        <el-table-column prop="money" label="小计(元)" width="140"></el-table-column>
        <el-table-column prop="detail" label="工艺及材料说明"></el-table-column>
        <el-table-column prop="content" label="备注" ></el-table-column>
        <el-table-column label="操作" width="150"></el-table-column>
      </el-table>
    </div>
    <div id="projectdate">
    <el-row v-for="item in subData" :key="item.id">
      <div style="position: absolute;right: 10px;top: 5px;">
        <el-button @click="templatelistVisible = true, pushproductsid = item.indexid">添加套件</el-button>
        <el-button @click="productslistVisible = true, pushproductsid = item.indexid">添加单件</el-button>
        <el-button @click="redsubproducts(item.id)">修改</el-button>
        <el-button @click="outerVisible = true, deleteprojectsub = item.id">删除</el-button>
      </div>
      <table v-show="item.showtitle" style="width: -webkit-fill-available;background-color:rgb(1 82 144);"><tr><th colspan="1" ><h3 style="color:#fff;margin:8px 20px">{{item.name}}<span style="font-size:14px"> --- 导出单项</span></h3></th></tr></table>
      <table v-show="item.showsub" style="width: -webkit-fill-available;background-color:rgb(164 204 175)"><tr><th colspan="1"><p style="color:#fff;margin:8px 20px">{{item.projectclass}}<span style="font-size:14px"> --- 导出单项</span></p></th></tr></table>
      <el-table :data="item.products" border show-summary :summary-method="jsondata.getSummaries"  style="width: 100%">
        <el-table-column prop="category" label="类别" width="100"></el-table-column>
        <el-table-column prop="name" label="名称" width="180">
          <template slot-scope="scope">
            <el-input @input="projectsubData[item.indexid].products[scope.$index].name = scope.row.name; changeInput(projectsubData[item.indexid])" v-model="scope.row.name" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="brand" label="品牌" width="120">
          <template slot-scope="scope">
            <el-input @input="projectsubData[item.indexid].products[scope.$index].brand = scope.row.brand; changeInput(projectsubData[item.indexid])" v-model="scope.row.brand" ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="90">
          <template slot-scope="scope">
            <el-input type="number" @input="projectsubData[item.indexid].products[scope.$index].productsintnb = scope.row.productsintnb; changeInputint(projectsubData[item.indexid], scope.$index)" v-model="scope.row.productsintnb" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unit" label="单位" width="70">
          <template slot-scope="scope">
            <el-input @input="projectsubData[item.indexid].products[scope.$index].unit = scope.row.unit; changeInput(projectsubData[item.indexid])" v-model="scope.row.unit" ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="成本单价(元)" width="130">
          <template slot-scope="scope">
            <el-input type="number" @input="projectsubData[item.indexid].products[scope.$index].cost = scope.row.cost; changeInput(projectsubData[item.indexid])" v-model="scope.row.cost"><i slot="prefix" class="el-input__icon">￥</i></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单价(元)" width="130">
          <template slot-scope="scope">
            <el-input type="number" @input="projectsubData[item.indexid].products[scope.$index].price = scope.row.price; changeInput(projectsubData[item.indexid])" v-model="scope.row.price" ><i slot="prefix" class="el-input__icon">￥</i></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="小计(元)" width="140">
          <template slot-scope="scope">
            <el-input v-model="scope.row.money" ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="detail" label="工艺及材料说明">
          <template slot-scope="scope">
            <el-input type="textarea" @input="projectsubData[item.indexid].products[scope.$index].detail = jsondata.stringreplace_up(scope.row.detail); changeInput(projectsubData[item.indexid])" v-model="scope.row.detail" autosize></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="备注" >
          <template slot-scope="scope">
            <el-input type="textarea" @input="projectsubData[item.indexid].products[scope.$index].content = jsondata.stringreplace_up(scope.row.content); changeInput(projectsubData[item.indexid])" v-model="scope.row.content" autosize></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" >
          <template slot-scope="scope">
            <el-button @click="upGo(projectsubData[item.indexid], scope.$index)" type="text" size="small"><i class="el-icon-top"></i></el-button>
            <el-button @click="downGo(projectsubData[item.indexid], scope.$index)" type="text" size="small"><i class="el-icon-bottom"></i></el-button>
            <!-- <el-button type="text" @click="productssubmod(scope.$index, item)" size="small">调整信息</el-button> -->
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
      textarea1: '',
      total_money: 0,
      subredproductsred: {},
      subredproductsboxred: false,
      inputData: '',
      modsubredproducts: {},
      outerVisibledelete: false,
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
      projectsubData: []
    }
  },
  mounted () {
    // this.getFormDataClass('expenditureclass')
    this.getdata()
    this.getFormData('supplierlist')
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
    changeInput (listdata, indexid) {
      this.modifyjson(listdata.products, listdata.id)
    },
    changeInputint (listdata, indexid) {
      if (listdata.products[indexid].Matchingid && !listdata.products[indexid].basicint) {
        for (let i = 0; i < listdata.products.length; i++) {
          console.log(listdata.products[i].Matchingid)
          if (listdata.products[i].Matchingid === listdata.products[indexid].Matchingid && listdata.products[i].basicint) {
            listdata.products[i].productsintnb = listdata.products[indexid].productsintnb * listdata.products[i].basicint
          }
        }
      }
      this.modifyjson(listdata.products, listdata.id)
    },
    modifyjson (datajson, indexid) { // 更新数据
      this.serverproducts.products = JSON.stringify(datajson)
      this.serverproducts.id = indexid
      this.updatpostData('projectsub', this.serverproducts)
    },
    redproducts (index, rows) {
      this.projectsubData[rows.indexid].products.splice(index, 1)
      this.modifyjson(this.projectsubData[rows.indexid].products, rows.id)
    },
    updatpostData_products () {
      this.subredproductsboxred = false
      this.subredproductsred.money = Number(this.subredproductsred.productsintnb) * Number(this.subredproductsred.price)
      this.modifyjson(this.modsubredproducts.products, this.modsubredproducts.id)
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
      // console.log(this.productspushdata)
      if (this.productslistVisible === true) {
        this.productspushdata.detail = this.jsondata.stringreplace_up(this.productspushdata.detail)
        this.productspushdata.content = this.jsondata.stringreplace_up(this.productspushdata.content)
        this.productspushdata.productsintnb = Number(this.productsintnb)
        this.projectsubData[this.pushproductsid].products.push(this.productspushdata)
      }
      if (this.templatelistVisible === true) {
        this.productstemplatedata = JSON.parse(this.productspushdata.productsid)
        let matchingid = this.projectsubData[this.pushproductsid].products.length
        for (let i = 0; i < this.productstemplatedata.length; i++) {
          this.productstemplatedata[i].detail = this.jsondata.stringreplace_up(this.productstemplatedata[i].detail)
          this.productstemplatedata[i].content = this.jsondata.stringreplace_up(this.productstemplatedata[i].content)
          this.productstemplatedata[i].productsintnb = Number(this.productsintnb)
          this.productstemplatedata[i].Matchingid = matchingid + 1
          this.projectsubData[this.pushproductsid].products.push(this.productstemplatedata[i])
        }
      }
      this.serverproducts.products = JSON.stringify(this.projectsubData[this.pushproductsid].products)
      this.serverproducts.id = this.subData[this.pushproductsid].id
      this.modifyjson(this.projectsubData[this.pushproductsid].products, this.subData[this.pushproductsid].id)
    },
    pushproducts (row) {
      this.productspushdata = {}
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
    async getFormData () {
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
    async getdata () {
      this.total_money = 0
      this.form = await this.jsondata.getDataId('project', this.$route.params.id)
      this.projectsubData = await this.jsondata.getDataClass('projectsub', this.$route.params.id, 'projectid')
      this.subData = JSON.parse(JSON.stringify(this.projectsubData))
      this.subData = this.subData.sort(function (a, b) { return (a.projectclass + '').localeCompare(b.projectclass + '') }) // 重新排序
      this.subData = this.subData.sort(function (a, b) { return (a.name + '').localeCompare(b.name + '') })
      this.projectsubData = this.projectsubData.sort(function (a, b) { return (a.projectclass + '').localeCompare(b.projectclass + '') })
      this.projectsubData = this.projectsubData.sort(function (a, b) { return (a.name + '').localeCompare(b.name + '') })
      for (let i = 0; i < this.subData.length; i++) {
        this.subData[i].products = JSON.parse(this.subData[i].products)
        this.projectsubData[i].products = JSON.parse(this.projectsubData[i].products)
        this.subData[i].indexid = i
        this.projectsubData[i].indexid = i
        for (let is = 0; is < this.subData[i].products.length; is++) {
          // console.log(this.subData[i].products[is])
          if (this.subData[i].products[is].Matchingid) {
            this.subData[i].products[is].category += '-' + this.subData[i].products[is].Matchingid + '#'
          }
          this.subData[i].products[is].money = this.subData[i].products[is].price * this.subData[i].products[is].productsintnb
          this.total_money += this.subData[i].products[is].money
          this.subData[i].products[is].detail = this.jsondata.stringreplace_ld(this.subData[i].products[is].detail)// 格式化换行
          this.textarea1 = this.subData[i].products[is].detail
          this.subData[i].products[is].content = this.jsondata.stringreplace_ld(this.subData[i].products[is].content)// 格式化换行
          this.subData[i].products[is].money = this.jsondata.currency(this.subData[i].products[is].money, '￥', 2)
          // this.subData[i].products[is].price = this.jsondata.currency(this.subData[i].products[is].price, '￥', 2)
          // this.subData[i].products[is].cost = this.jsondata.currency(this.subData[i].products[is].cost, '￥', 2)
        }
      }
      for (let i = 0; i < this.subData.length; i++) {
        this.subData[i].showtitle = true
        this.subData[i].showsub = false
        if (i !== 0 && this.subData[i].name === this.subData[i - 1].name) {
          this.subData[i].showtitle = false
        }
        if (this.subData[i].projectclass !== '') {
          this.subData[i].showsub = true
        }
      }
      this.total_money = this.jsondata.currency(this.total_money, '￥', 2)
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
