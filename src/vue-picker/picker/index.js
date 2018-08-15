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
		
		if(options.option[0].constructor!=Array){
			let m=options.option
			options.option=[]
			options.option[0]=m
		}
    	if(typeof options.value!='undefined'&&options.value.constructor!=Array){
			options.value=[options.value]
		}else if(typeof options.value==='undefined'||options.value.length==0){
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

