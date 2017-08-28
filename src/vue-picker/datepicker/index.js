import Vue from 'vue';
import picker from '../picker'
let datepicker=(options={})=>{
	let option
	options.type=options.type||'date'

	if(options.type=='time'){
		option=[setHour(),setMinute()]
	}else if(options.type=='datetime'){
		option=[setYear(options.startYear,options.endYear),setMonth(),setDay(options.value?options.value[0]:'',options.value?options.value[1]:''),setHour(),setMinute()]
	}else if(options.type=='yearmonth'){
		option=[setYear(options.startYear,options.endYear),setMonth()]
	}else if(options.type=='year'){
		option=[setYear(options.startYear,options.endYear)]
	}else if(options.type=='date'){
		option=[setYear(options.startYear,options.endYear),setMonth(),setDay(options.value?options.value[0]:'',options.value?options.value[1]:'')]
	}

	if(!options.value||options.value.length==0){
		let now=new Date()
		if(options.type=='time'){
			options.value=[now.getHours(),now.getMinutes()]
		}else if(options.type=='datetime'){
			options.value=[now.getFullYear(),now.getMonth()+1,now.getDate(),now.getHours(),now.getMinutes()]
		}else if(options.type=='yearmonth'){
			options.value=[now.getFullYear(),now.getMonth()+1]
		}else if(options.type=='year'){
			options.value=[now.getFullYear()]
		}else if(options.type=='date'){
			options.value=[now.getFullYear(),now.getMonth()+1,now.getDate()]
		}
	}
	if(options.value&&option.length!=options.value.length){
		console.log('默认值错误或类型错误')
	}
	options.value=options.value.map((value)=>{
		if(typeof value =='number'){
			return value<10?'0'+value:value
		}else{
			return value
		}
		
	})
	return new Promise((resolve, reject)=>{
		picker({
			title:options.title||'请选择',
			value:options.value,
			option:option,
			shadeClose:options.shadeClose,
			change:(value,index,_this)=>{
				if((options.type=='date'||options.type=='datetime')&&(index==0||index==1)){
					let day=setDay(value[0],value[1])
					option.splice(2,1,day)
					if(value[2]>day[day.length-1]){
						_this.scrollTop(2,day[day.length-1])
					}
				}
				if(typeof options.change =='function'){
					options.change(value,index,_this)
				}
			}
		}).then((e)=>{
			resolve(e)
		}).catch((e)=>{
			reject(e)
		})
	})
}

export default  datepicker


function setYear(start=1900,end){
	let now=new Date()
	end=end||now.getFullYear()
	let i,arr=[];
	for (i=start;i<end+1;i++){
		arr.push(i)
	}
	return arr
}

function setMonth(){
	let i,arr=[];
	for (i=1;i<13;i++){
		arr.push(i<10?'0'+i:i)
	}
	return arr
}

function setDay(year,month){
	let now=new Date()
	year=year||now.getFullYear()
	month=month||now.getMonth()
	console.log()
	let i=0,arr=[],day
	if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
		day=31
	}else if(month==4||month==6||month==9||month==11){
		day=30
	}else{
		if(year%4==0&&year%100!=0||year%400==0){
			day=29
		}else{
			day=28
		}
	}
	for (i=1;i<day+1;i++){
		arr.push(i<10?'0'+i:i)
	}
	return arr
}

function setHour(){
	let i=0,arr=[];
	for (i;i<24;i++){
		arr.push(i<10?'0'+i:i)
	}
	return arr
}

function setMinute(){
	let i=0,arr=[];
	for (i;i<60;i++){
		arr.push(i<10?'0'+i:i)
	}
	return arr
}