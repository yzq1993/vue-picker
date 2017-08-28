import Vue from 'vue';
import picker from '../picker'
let multipicker=(options={})=>{
	let option=getOption(options.option,getIndex(options.option,options.value)),
		hasValue=options.value&&options.value.length!=0,len
	return new Promise((resolve, reject)=>{
		picker({
			title:options.title||'请选择',
			value:options.value,
			option:option,
			shadeClose:options.shadeClose,
			change:(value,index,_this)=>{
				let newOption=changeOption(options.option,value)
				option.splice(++index,value.length-index,...newOption)
				options.value.splice(index,value.length-index)
				newOption.forEach((m)=>{
					_this.scrollTop(index++,m[0])
				})
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

export default  multipicker



function getOption(options,value,arr=[]){
	let len=arr.length,index=value[len]||0
	arr[len]=[]
	options.forEach((m)=>{
		arr[len].push(m.name)
	})
	if(options[index].children){
		return getOption(options[index].children,value,arr)
	}else{
	 	return arr
	}
}
function changeOption(options,value,arr=[],index=getIndex(options,value)){
	if(index.length){
		if(index.length==1){
			arr=addOption(options,index[0])
		}
		let m=index.splice(0,1)[0]
		return changeOption(options[m].children,value,arr,index)
	}else{
		return arr
	}
}
function addOption(options,index,arr=[]){
	let len=arr.length
	if(options[index].children){
		arr[len]=[]
		options[index].children.forEach((m)=>{
			arr[len].push(m.name)
		})
		return addOption(options[index].children,0,arr)
	}else{
		return arr
	}
}
function getIndex(options,value,arr=[]){
	let len=arr.length
	options.forEach((m,index)=>{
		if(m.name==value[len]){
			arr[len]=index
		}
	})
	
	if(arr.length>len&&options[arr[len]].children){
		return getIndex(options[arr[len]].children,value,arr)
	}else{
	 	return arr
	}
}