# vue-picker
基于vue2的移动端picker组件，提供了日期选择，时间选择 ，省市区选择，多级联动

[demo](http://www.yzqroom.cn/vue-picker/index.html)

```

import vuePicker form 'vue-picker'
Vue.use(vuePicker)
//也可以单独引入
import {picker,datepicker,citypicker,multipicker} form 'vue-picker'
Vue.use(picker)
Vue.use(datepicker)
Vue.use(citypicker)
Vue.use(multipicker)


this.$picker({
  value:1//默认值
  title:'请选择数字',//默认为'请选择'
  option:[1,2,3,4,5]//选择项，也可以多重选择 [[1,2,3,4],[1,2,3,4,5,6]],多重选择时，默认值为数组
  change:(value)=>{
    console.log(value)//值改变时调用
 }
}).then((value)=>{
  console.log(value)
})

this.$datepicker({
  value:[2015,10,28],
  title:'请选择',
  type:'date'//date选择日期，time选择时间，datetime选择日期+时间，year选择年份，yearmonth选择年月，默认为date
  endYear:2020,//结束的年份，默认为今年
  startYear:1950,//开始的年份，默认为1900
  change:(value)=>{
    console.log(value)
  }
}).then((value)=>{})

this.$citypicker({
  value:['浙江','杭州','西湖区'],
  title:'请选择省市区',
  type:3,//1选择省，2选择省市，3选择省市区，默认为3
  change:(value)=>{
    console.log(value)
  }
}).then((value)=>{})

this.$multipicker({
  value:[],
  title:'请选择',
  option:[
    {name:1,children:[{name:'1-1'},{name:'1-2'},{name:'1-3'}]},
    {name:2,children:[{name:'2-1'},{name:'2-2'},{name:'2-3'}]},
    {name:3}
  ],//可以多级嵌套
  change:(value)=>{
    console.log(value)
  }
}).then((value)=>{})

```
