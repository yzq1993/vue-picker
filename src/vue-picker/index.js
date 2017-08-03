import Vue from 'vue';

import picker from './picker'
import datepicker from './datepicker'
import citypicker from './citypicker'
import multipicker from './multipicker'

export default  (Vue,options)=>{
	Vue.use(picker)
	Vue.use(datepicker)
	Vue.use(citypicker)
	Vue.use(multipicker)
}

export {picker,datepicker,citypicker,multipicker}