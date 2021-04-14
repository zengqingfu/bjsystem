import axios from 'axios'

const geturl = (geturlFn) => { // 环境变量,放到域名bigmind上
  if (window.location.href.match('localhost')) {
    geturlFn = 'http://localhost:3003'
  } else {
    geturlFn = ''
  }
  return geturlFn
}
// console.log(geturl())
export default {
  stringreplace_up (dataup) {
    return dataup.replace(/\n/g, '---').replace(/\r/g, '---') // 格式化换行
  },
  stringreplace_ld (datald) {
    return datald.replace(new RegExp('------', 'g'), '\n').replace(new RegExp('---', 'g'), '\n')
  },
  listjson () {
    let productsclass = [{
      value: '投影',
      label: '投影',
      children: [{
        value: '激光投影机',
        label: '激光投影机'
      }, {
        value: '激光投影机配件',
        label: '激光投影机配件'
      }, {
        value: 'DLP激光投影机',
        label: 'DLP激光投影机'
      }, {
        value: '3DLP激光投影机',
        label: '3DLP激光投影机'
      }, {
        value: 'DLP激光投影机配件',
        label: 'DLP激光投影机配件'
      }]
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
        }, {
          value: '配件',
          label: '配件'
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
      value: '线材',
      label: '线材'
    }, {
      value: '全息屏风扇',
      label: '全息屏风扇'
    }, {
      value: '灯具',
      label: '灯具',
      children: [{
        value: '埋地灯',
        label: '埋地灯'
      }, {
        value: '点光源',
        label: '点光源'
      }, {
        value: 'LED 软灯带',
        label: 'LED 软灯带'
      }, {
        value: 'LED 投光灯',
        label: 'LED 投光灯'
      }, {
        value: 'LED 线型洗墙灯',
        label: 'LED 线型洗墙灯'
      }, {
        value: 'LED 线型轮廓灯',
        label: 'LED 线型轮廓灯'
      }, {
        value: '壁灯',
        label: '壁灯'
      }, {
        value: '窗台灯',
        label: '窗台灯'
      }, {
        value: '水池灯',
        label: '水池灯'
      }, {
        value: '窗台灯',
        label: '窗台灯'
      }, {
        value: '射灯',
        label: '射灯'
      }, {
        value: '投影灯',
        label: '投影灯'
      }]
    }, {
      value: '音响系统',
      label: '音响系统'
    }, {
      value: '服务器',
      label: '服务器'
    }, {
      value: '沙盘模型',
      label: '沙盘模型'
    }, {
      value: '舞美灯光',
      label: '舞美灯光'
    }, {
      value: 'LED',
      label: 'LED',
      children: [{
        value: 'LED 屏幕',
        label: 'LED 屏幕'
      }, {
        value: 'LED 配件',
        label: 'LED 配件'
      }]
    }, {
      value: '互动设备',
      label: '互动设备'
    }, {
      value: '中控系统',
      label: '中控系统'
    }, {
      value: '网络系统',
      label: '网络系统'
    }, {
      value: '装修工程',
      label: '装修工程',
      children: [{
        value: '隔断基础',
        label: '隔断基础'
      }, {
        value: '隔断饰面',
        label: '隔断饰面'
      }, {
        value: '吊顶基础结构',
        label: '吊顶基础结构'
      }, {
        value: '吊顶饰面',
        label: '吊顶饰面'
      }, {
        value: '天花灯槽',
        label: '天花灯槽'
      }, {
        value: '天花灯槽饰面',
        label: '天花灯槽饰面'
      }, {
        value: '地面',
        label: '地面'
      }, {
        value: '门基础结构',
        label: '门基础结构'
      }, {
        value: '门饰面',
        label: '门饰面'
      }, {
        value: '门配件',
        label: '门配件'
      }]
    }, {
      value: '道具',
      label: '道具',
      children: [{
        value: '展柜',
        label: '展柜',
        children: [{
          value: '展柜基础',
          label: '展柜基础'
        }, {
          value: '展柜饰面',
          label: '展柜饰面'
        }]
      }, {
        value: '中岛台-沙盘底座',
        label: '中岛台-沙盘底座',
        children: [{
          value: '沙盘底座基础',
          label: '沙盘底座基础'
        }, {
          value: '沙盘底座饰面',
          label: '沙盘底座饰面'
        }]
      }]
    }, {
      value: '装置',
      label: '装置',
      children: [{
        value: '艺术装置',
        label: '艺术装置'
      }, {
        value: '新媒体艺术装置',
        label: '新媒体艺术装置'
      }]
    }, {
      value: '陈列品',
      label: '陈列品'
    }, {
      value: '广告物料',
      label: '广告物料',
      children: [{
        value: '灯箱',
        label: '灯箱'
      }, {
        value: '艺术字-画底座',
        label: '艺术字-画底座'
      }, {
        value: '广告画',
        label: '广告画'
      }]
    }, {
      value: '软装摆设',
      label: '软装摆设'
    }, {
      value: '软体制作',
      label: '软体制作',
      children: [{
        value: '数字影片制作费',
        label: '数字影片制作费'
      }, {
        value: '互动程序开发',
        label: '互动程序开发'
      }, {
        value: '后期维护',
        label: '后期维护'
      }]

    }]
    return productsclass
  },
  fordata (data1, data2, listclass1, listclass2) { // 循环函数
    for (let i = 0; i < data1.length; i++) {
      for (let is = 0; is < data2.length; is++) {
        if(data1[i].id == data2[is][listclass2]){ //eslint-disable-line
          data2[is][listclass2] = data1[i][listclass1]
        }
      }
    }
    return data2
  },
  getSpanArr (data, list) { // 合并表格数组生成
    this.spanArr = []
    for (var i = 0; i < data.length; i++) {
      if (i === 0) {
        this.spanArr.push(1)
        this.pos = 0
      } else {
        // 判断当前元素与上一个元素是否相同,因合并第一个所以[0]
        if (data[i][list] === data[i - 1][list]) {
          this.spanArr[this.pos] += 1
          this.spanArr.push(0)
        } else {
          this.spanArr.push(1)
          this.pos = i
        }
      }
    }
    return this.spanArr
  },
  postlogin (jsondata) { // 登录信息
    return axios({
      url: geturl() + '/loigndata/',
      method: 'POST',
      data: jsondata,
      dataType: 'JSON',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  async getDataId (form, listid) {
    try {
      const response = await axios({
        url: geturl() + '/getpost/' + form + '/' + listid + '/' + sessionStorage.getItem('Token'),
        method: 'GET',
        dataType: 'JSON',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      return response.data[0]
    } catch (error) {
      console.log(error)
      return 'error'
    }
  },
  async getData (form) {
    try {
      const responseprojectlist = await axios({
        url: geturl() + '/getposts/' + form + '/' + sessionStorage.getItem('Token'),
        method: 'GET',
        dataType: 'JSON',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      return responseprojectlist.data
    } catch (error) {
      console.log(error)
      return 'error'
    }
  },
  async getDataClass (form, id, dataclass) {
    try {
      const response = await axios({
        url: geturl() + '/getDataClass/' + form + '/' + id + '/' + dataclass + '/' + sessionStorage.getItem('Token'),
        method: 'GET',
        dataType: 'JSON',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
      return 'error'
    }
  },
  getDatalogin (token) { // token查询
    return axios({
      url: geturl() + '/getDatalogin/' + token,
      method: 'GET',
      dataType: 'JSON',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  async postData (form, jsondata) {
    try {
      const response = await axios({
        url: geturl() + '/postdata/' + form + '/' + sessionStorage.getItem('Token'),
        method: 'POST',
        data: jsondata,
        dataType: 'JSON',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      return response.statusText
    } catch (error) {
      console.log(error)
      return 'error'
    }
  },
  async deletepost (form, listid) { // 删除收款
    try {
      const response = await axios({
        url: geturl() + '/deletepost/' + form + '/' + listid + '/' + sessionStorage.getItem('user') + '/' + sessionStorage.getItem('Token'),
        method: 'GET',
        dataType: 'JSON',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
      return 'error'
    }
  },
  async updatpostData (form, jsondata) {
    try {
      const response = await axios({
        url: geturl() + '/updatpost/' + form + '/' + sessionStorage.getItem('Token'),
        method: 'POST',
        data: jsondata,
        dataType: 'JSON',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
      return 'error'
    }
  },
  currency (value, currency, decimals) { // 生成货币格式
    const digitsRE = /(\d{3})(?=\d)/g
    value = parseFloat(value).toFixed(2)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    currency = currency != null ? currency : '$'
    decimals = decimals != null ? decimals : 2
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals
      ? stringified.slice(0, -1 - decimals)
      : stringified
    var i = _int.length % 3
    var head = i > 0
      ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
      : ''
    var _float = decimals
      ? stringified.slice(-1 - decimals)
      : ''
    var sign = value < 0 ? '-' : ''
    return sign + currency + head +
      _int.slice(i).replace(digitsRE, '$1,') +
      _float
  },
  classstrog (data) {
    let dataend
    dataend = data.replace(/"([^"]*)"/g, '$1')
    dataend = dataend.replace(/,/g, '/')
    dataend = dataend.replace(/\[/g, '')
    dataend = dataend.replace(/\]/g, '')
    return dataend
  },
  getSummaries (param) { // 统计行数据生成
    const { columns, data } = param
    const sums = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      if (index !== 7) {
        sums[index] = 'N/A'
        return
      }
      const values = data.map(item => item[column.property])
      for (let is = 0; is < values.length; is++) {
        if (values[is] != '' && values[is] != undefined) { //eslint-disable-line
          values[is] = Number(values[is].replace(/,|￥/g, ''))
          if (isNaN(values[is])) { //eslint-disable-line
            values[is] = 0
          }
        } else {
          values[is] = Number(values[is])
        }
        // console.log(values[is])
      }
      if (!values.every(value => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr)
          // console.log(Number(curr))
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
      } else {
        sums[index] = 'N/A'
      }
    })
    for (let ins in sums) { // eslint-disable-line0
      if (sums[ins] > 0 || sums[ins] < 0) {
        // console.log(sums[ins])
        sums[ins] = this.jsondata.currency(sums[ins], '￥', 2)
      }
      if (sums[ins] === 0) {
        sums[ins] = 'N/A'
      }
    }
    return sums
  }
}
