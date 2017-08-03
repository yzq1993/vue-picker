<template>
  <div id="app">
    <div @click=picker>picker</div>
    <div @click=datepicker>datepicker</div>
    <div @click=citypicker>citypicker</div>
    <div @click=multipicker>multipicker</div>
  </div>
</template>

<script>

export default {
	name: 'app',
	data(){
		return{
			city:[],
			time:[],
			m:[]
		}
	},
	created(){

	},
	methods:{
		picker(){
			this.$picker({
				//title:'请选择标题',
				//value:[2,3],
				option:[1,2,3,4,5,6,7,8,9,10],
				change:(e)=>{
					console.log(e)
				}
			}).then((e)=>{
				console.log(e)
			})
		},
		datepicker(){
			this.$datepicker({
				//title:'请选择日期时间',
				//type:'yearmonth',
				value:this.time,
				endYear:2020,
				change:(e)=>{
					console.log(e)
				}
			}).then((e)=>{
				this.time=e
				console.log(e)
			})
		},
		citypicker(){
			this.$citypicker({
				//title:'请选择'
				//type:1,
				value:this.city,
				change:(e)=>{
					console.log(e)
				}
			}).then((e)=>{
				this.city=e
				console.log(e)
			
			}).catch(()=>{
				
			})
		},
		multipicker(){
			this.$multipicker({
				value:this.m,
				option:[
					{name:'1',children:[
						{name:'1-1',children:[
							{name:'1-1-1',children:[
								{name:'1-1-1-1'},
								{name:'1-1-1-2'},
								{name:'1-1-1-3'},
							]},
							{name:'1-1-2'},
							{name:'1-1-3'},
							{name:'1-1-4',children:[
								{name:'1-1-4-1'},
								{name:'1-1-4-2'},
								{name:'1-1-4-3'},
							]},
						]},
						{name:'1-2',children:[
							{name:'1-2-1'},
							{name:'1-2-2'},
							{name:'1-2-3'},
						]},
						{name:'1-3',children:[
							{name:'1-3-1'},
							{name:'1-3-2'},
							{name:'1-3-3'},
						]},
						{name:'1-4'}
					]},
					{name:'2',children:[
						{name:'2-1',children:[
							{name:'2-1-1',children:[
								{name:'2-1-1-1'},
								{name:'2-1-1-2'},
								{name:'2-1-1-3'},
							]},
							{name:'2-1-2'},
							{name:'2-1-3'},
							{name:'2-1-4',children:[
								{name:'2-1-4-1'},
								{name:'2-1-4-2'},
								{name:'2-1-4-3'},
							]},
						]},
						{name:'2-2',children:[
							{name:'2-2-1'},
							{name:'2-2-2'},
							{name:'2-2-3'},
						]},
						{name:'2-3',children:[
							{name:'2-3-1'},
							{name:'2-3-2'},
							{name:'2-3-3'},
						]},
						{name:'2-4'}
					]},
					{name:'3',children:[
						{name:'3-1',children:[
							{name:'3-1-1'},
							{name:'3-1-2'},
							{name:'3-1-3'},
							{name:'3-1-4',children:[
								{name:'3-1-4-1'},
								{name:'3-1-4-2'},
								{name:'3-1-4-3'},
							]},
						]},
						{name:'3-2',children:[
							{name:'3-2-1'},
							{name:'3-2-2'},
							{name:'3-2-3'},
						]},
						{name:'3-3',children:[
							{name:'3-3-1'},
							{name:'3-3-2'},
							{name:'3-3-3'},
						]},
						{name:'3-4'}
					]},
					{name:'4',children:[
						{name:'4-1'},
						{name:'4-2'},
					]},
					{name:'5',children:[
						{name:'5-1'},
						{name:'5-2'},
						{name:'5-3'},
					]},
					{name:'6',children:[
						{name:'6-1'}
					]},
					{name:'7'},
				],
				change:(e)=>{
					//console.log(e)
				}
			}).then((e)=>{
				this.m=e
				console.log(e)
			})
		}
	}
}
</script>
<style>
#app div{
	height:40px;
	width:150px;
	background: #ff2d55;
	margin:50px auto;
	line-height: 40px;
	text-align: center;
	color:#fff;
}
</style>

