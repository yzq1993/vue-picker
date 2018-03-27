import Vue from 'vue';
import component from './picker.vue'
const picker=(options={})=>{
	return new Promise((resolve, reject)=>{
		let picker = Vue.extend(component);
		options.callback=(status,value)=>{
			if(status){
				resolve(value)
			}else{
				reject(value)
			}
		}
		
		if(typeof options.option[0] !='object'){
			let m=options.option
			options.option=[]
			options.option[0]=m
		}
		
		if(!options.value||options.value.length==0){
			options.value=[]
			options.option.forEach(function(value, index) {
				options.value[index]=value[0]
			});
		}

		let instance=new picker({
		    data: options
		});
		instance.$mount();
		document.body.appendChild(instance.$el);
	})
}

export default  picker

