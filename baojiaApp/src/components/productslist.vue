 <template>
  <el-main style="text-align:left; line-height: 1.8em;">
    <h3 style="color:#333">
      <span  @click="goToHome" style="cursor: pointer;color:#409EFF">{{this.projectName}}</span>配件列表
      <el-button type="primary" style="float: right;" @click="dialogFormVisible = true">添加配件</el-button>
      <el-button style="float: right;margin-right:20px" onclick="exportExcel('#expenditureContractlist')">点击导出</el-button>
      <el-input v-model="inputData" placeholder="请输入搜索内容" @input="play(inputData)" style="width:200px;float: right;;margin-right:0px"></el-input>
    </h3>
    <el-dialog title="添加配件" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules"  label-width="80px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="form.brand" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="参数" prop="detail">
          <el-input type="textarea" v-model="form.detail" ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input type="number"  v-model="form.price" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="单位" prop="company">
            <el-select v-model="form.company" placeholder="请选择" style="width:46%" >
            <el-option label="平米" value="平米"></el-option>
            <el-option label="单个" value="单个"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="class">
          <el-cascader
            v-model="form.class"
            :options="productsclass"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            clearable
            filterable
            style="width:46%;">
          </el-cascader>
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
      <el-form ref="formModify" :model="formModify" :rules="rules"  label-width="80px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formModify.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-input v-model="formModify.brand" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="参数" prop="detail">
          <el-input type="textarea" v-model="formModify.detail" ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input type="number"  v-model="formModify.price" style="width:46%" ></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="formModify.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="单位" prop="company">
            <el-select v-model="formModify.company" placeholder="请选择" style="width:46%" >
            <el-option label="平米" value="平米"></el-option>
            <el-option label="单个" value="单个"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="分类" prop="class">
          <el-cascader
            v-model="formModify.class"
            :options="productsclass"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
            clearable
            filterable
            style="width:46%;">
          </el-cascader>
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
    <el-table :data="tableData_s" @row-click="handle" border :summary-method="jsondata.getSummaries" id="expenditureContractlist" height='90%' style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="brand" label="品牌" ></el-table-column>
      <el-table-column prop="detail" label="参数" ></el-table-column>
      <el-table-column prop="price" label="价格" sortable></el-table-column>
      <el-table-column prop="company" label="单位" ></el-table-column>
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
      form: {
        name: '',
        company: '',
        date: '',
        content: '',
        class: '',
        brand: '',
        detail: '',
        price: ''
      },
      productsclassvalue: [],
      productsclass: [{
        value: '指南',
        label: '指南',
        children: [{
          value: '设计原则',
          label: '设计原则',
          children: [{
            value: '一致',
            label: '一致'
          }, {
            value: '反馈',
            label: '反馈'
          }, {
            value: '效率',
            label: '效率'
          }, {
            value: '可控',
            label: '可控'
          }]
        }, {
          value: '导航',
          label: '导航',
          children: [{
            value: '侧向导航',
            label: '侧向导航'
          }, {
            value: '顶部导航',
            label: '顶部导航'
          }]
        }]
      }, {
        value: '组件',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout 布局',
            label: 'Layout 布局'
          }, {
            value: 'color 色彩',
            label: 'Color 色彩'
          }, {
            value: 'typography 字体',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
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
      formTransactionCon: '',
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
        price: [
          { required: true, message: '填写价格', trigger: 'blur' }
        ],
        company: [
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
      if (await this.jsondata.postData('products', this.form) === 'OK') {
        this.dialogFormVisible = false
        this.getdata()
        this.resetForm('form')
      }
    },
    async getdata () {
      this.tableData = await this.jsondata.getData('products')
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].class = this.tableData[i].class.replace(/"([^"]*)"/g, '$1')
        this.tableData[i].class = this.tableData[i].class.replace(/,/g, '/')
        this.tableData[i].class = this.tableData[i].class.replace(/\[/g, '')
        this.tableData[i].class = this.tableData[i].class.replace(/\]/g, '')
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
      this.formModify = await this.jsondata.getDataId('products', row.id)
    },
    goToHome () {
      this.$router.push('/projectdetails/' + this.$route.params.id)
    },
    play (input) {
      let _this = this
      _this.table = _this.tableData.filter(Val => {
        if (Val.name.includes(input)) {
          _this.table.push(Val)
          return _this.table
        }
      })
      this.tableData_s = _this.table
    }
  }
}
</script>
