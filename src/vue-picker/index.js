import Vue from 'vue';

import picker from './picker'
import datepicker from './datepicker'
import citypicker from './citypicker'
import multipicker from './multipicker'

export default  (Vue,options)=>{

	Vue.prototype.$picker = picker
	Vue.prototype.$datepicker = datepicker
	Vue.prototype.$citypicker = citypicker
	Vue.prototype.$multipicker = multipicker
}

export {picker,datepicker,citypicker,multipicker}