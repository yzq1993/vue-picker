import Vue from 'vue';
import picker from '../picker'
import area from './city.json'
let citypicker = (options={})=>{
	let option,city,districts,type=options.type,hasValue=options.value&&options.value.length!=0

	if(type==1){
		option=[provinces()]
		if(hasValue&&typeof options.value!='object'){
			options.value=[options.value]
		}
	}else if(type==2){
		if(!hasValue){
			options.value=[area[0].name,area[0].sub[0].name]
		}
		city=getCity(findprovinces(options.value[0]))
		option=[provinces(),city]
	}else{
		if(!hasValue){
			options.value=[area[0].name,area[0].sub[0].name]
		}
		city=getCity(findprovinces(options.value[0]))
 		districts=getDistricts(findprovinces(options.value[0]),findCity(options.value[0],options.value[1]))
 		option=[provinces(),city,districts]
	}

	return new Promise((resolve, reject)=>{

		Vue.prototype.$picker({
			title:options.title||'请选择',
			value:options.value,
			option:option,
			shadeClose:options.shadeClose,
			change:(value,index,_this)=>{
				if(type!=1){
					if(index==0){
						city=getCity(findprovinces(value[0]))
						option.splice(1,1,city)
						_this.scrollTop(1,city[0])
						if(type!=2){
							districts=getDistricts(findprovinces(value[0]),findCity(value[0]))
							option.splice(2,1,districts)
							_this.scrollTop(2,districts[0])
						}
					}else if(type!=2&&index==1){
						districts=getDistricts(findprovinces(value[0]),findCity(value[0],value[1]))
						option.splice(2,1,districts)
						_this.scrollTop(2,districts[0])
					}
				}
				if(typeof options.change =='function'){
					
					if(value.length==3&&typeof value[2]=='undefined'){
						value.splice(2,1)
					}
					options.change(value,index,_this)
					
				}
			}
		}).then((e)=>{
			if(e.length==3&&typeof e[2]=='undefined'){
				e.splice(2,1)
			}
			resolve(e)
			
		}).catch((e)=>{
			reject(e)
		})
	})
}

export default citypicker

function provinces(){
	let arr=[]
	area.forEach((value,index)=>{
		arr.push(value.name)
	})
	return arr
}
function findprovinces(name){
	let m
	area.forEach((value,index)=>{
		if(value.name==name){
			m=index
		}
	})
	return m
}

function getCity(index){
	let arr=[]
	area[index].sub.forEach((value,index)=>{
		arr.push(value.name)
	})
	return arr
}
function findCity(p,c){
	let m=0,n
	if(c){
		area.forEach((value,index)=>{
			if(value.name==p){
				n=index
			}
		})
		area[n].sub.forEach((value,index)=>{
			if(value.name==c){
				m=index
			}
		})
	}
	return m
}

function getDistricts (p,c){
	let arr=[],city=area[p].sub[c].sub
	if(city){
		city.forEach((value,index)=>{
			arr.push(value.name)
		})
	}
	return arr
}