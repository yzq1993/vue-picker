<template>
  <div class="am-picker" v-if="show">
  	<div class="am-shade" @click.prevent=close></div>
  	<div class="am-box" :class="activeClass">
  		<div class="am-head">
  			<input type="button" :value=closetext @click.prevent=close>
  			<h2>{{title}}</h2>
  			<input type="button" :value=oktext @click.prevent=success>
  		</div>
  		<div class="am-ul">
  			<div class="am-item" v-for="(item,m) in option" @touchmove.prevent=touchmove @touchstart.prevent=touchstart @touchend.prevent=touchend :index=m>
				<ul :style="'transform: translate3d(0px, '+topStyle[m]+'px, 0px)'" :index=m :class=endClass[m]>
					<li v-for="key in item" :class="key==value[m]?'active':''">{{key}}</li>
				</ul>
			</div>
			<div class="am-high"></div>
		</div>
  	</div>
  </div>
</template>
<script>
export default {
	data(){
		return{
			show:true,
			title:'请选择',
			value:[],
			option:[],
			activeClass:null,
			closetext:'关 闭',
			oktext:'确 定',
			topStyle:[],
			start:{
				top:'',
				style:'',
				move:'',
				value:''
			},
			flag:true,
			endClass:[],
			height:35
		}
	},
	created(){
		document.body.style.overflowY = 'hidden'
		this.initTop()
	},
	mounted(){
		setTimeout(()=>{
			this.activeClass='active'
		},0)
	},
	methods:{
		initTop(){
			let m;
			this.value.forEach( (value, index) =>{
				if(!this.option[index]){return false}
				m=this.option[index].indexOf(value)
				if(m==-1){console.log('默认值设置错误');return false}
				this.topStyle[index]=-m*this.height
			});
		},
		success(){
			this.end(true)
		},
		close(){
			this.end(false)
		},
		end(status){
			document.body.style.overflowY = 'auto'
			this.show=false;
			if(this.value.length==1){
				this.callback(status,this.value[0])
			}else{
				this.callback(status,this.value)
			}
		},
		touchstart(event){
			let index=event.target.parentNode.getAttribute("index")||event.target.getAttribute("index")
			this.endClass[index]=''
			this.start.top=event.targetTouches[0].pageY
			this.start.style=-this.topStyle[index]
			this.start.value=this.value[index]
		},
		touchmove(event){
			if(!this.flag){return false}
			this.flag=false;
			setTimeout(()=>{
				let index=event.target.parentNode.getAttribute("index")||event.target.getAttribute("index")
				this.start.move=event.targetTouches[0].pageY
				this.topStyle.splice(index, 1, -(this.start.style+this.start.top-this.start.move))
				this.flag=true
			},15)
		},
		touchend(event){
			let index=event.target.parentNode.getAttribute("index")||event.target.getAttribute("index")
			this.endClass[index]='end'
			setTimeout(()=>{
				let h=-this.topStyle[index],len=this.option[index].length-1
				if(h<=0){
					this.topStyle.splice(index, 1, 0)
					this.value.splice(index,1,this.option[index][0])
				}else if(h>this.height*len){
					this.topStyle.splice(index, 1, -this.height*len)
					this.value.splice(index,1,this.option[index][len])
				}else{
					let m;
					if(h%this.height>=this.height/2){
						m=Math.ceil(h/this.height)
					}else{
						m=Math.floor(h/this.height)
					}
					this.topStyle.splice(index, 1, -this.height*m)
					this.value.splice(index,1,this.option[index][m])
				}
				if(this.start.value!=this.value[index]&&typeof this.change =='function'){
					if(this.value.length==1){
						this.change(this.value[0],Number(index),this)
					}else{
						this.change(this.value,Number(index),this)
					}
				}
			},20)
		},
		scrollTop(index,value){
			let m=this.option[index].indexOf(value)
			this.topStyle.splice(index, 1, -this.height*m)
			this.value.splice(index,1,value)
		}
	}
}

</script>

<style>
.am-picker{
	position: fixed;top:0;left:0;
	z-index:100000;
	height:100%;width:100%;
	line-height: 35px;
	font-size: 16px;
	color:#999;
}
.am-picker .am-shade{
	position: fixed;height:100%;width:100%;
	background: rgba(0,0,0,0.3);
	-webkit-backdrop-filter:saturate(180%) blur(4px) brightness(2)
}

.am-picker .am-box{
	width:100%;
	background: #fff;
	position: absolute;bottom:-280px;left:0;
	transition: bottom 0.2s;
	text-align: center;
	height:280px;
	display: flex;
	flex-direction: column;

}
.am-picker .am-box.active{
	bottom:0;
} 

.am-picker .am-head{
	display: flex;
	height:40px;line-height: 40px;
	background: #fff;
	border-bottom:1px solid #eee;
}
.am-picker .am-head input{
	appearance: none;
	border:none;
	outline: none;
	background: none;
	font-size:14px;
	padding:0 20px;
	color:#26a2ff;
	width:72px;
}
.am-picker .am-head h2{
	font-size:16px;
	flex:1;
	margin:0;
	font-weight: normal;
	color:#333;
}
.am-picker .am-ul{
	display: flex;
	flex:1;
	-webkit-mask-box-image:linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);
	position: relative;
}
.am-picker  .am-item{
	flex:1;
	overflow: hidden;
}
.am-picker .am-ul ul{
	padding: 0;
	margin:0;
	list-style: none;
	margin-top:90px;
}
.am-picker .am-ul ul.end{
	transition :transform 0.2s;
}
.am-picker .am-ul li{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.am-picker .am-ul li.active{
	color:#333;
}
.am-picker .am-high{
	position: absolute;top:90px;left:0;
	width:100%;height:35px;
	box-sizing: border-box;
	border: 1px solid #eee;
	border-left:0;
	border-right: 0;
	z-index: -1
}
</style>
