<template>
	<center>
	<el-card class="box-card">
	  <div slot="header" class="clearfix">
	    <center><span>你好!</span></center>
	  </div>
	  <div>
		<span><br/>用户名:<br/>{{name}}</span><br/><br/>
		<span>注册时间:<br/>{{time}}</span>
		</div>
		<br/><br/>
		<div>
		<button type="text" @click="ToChange">更改密码</button>
		<button type="text" @click="ToChange">注销</button>
		</div>
		<center><el-button type="plain" @click="$router.back(-1)"> 返回 </el-button></center>
		
	</el-card>
	</center>
</template>

<script>
/*引入公共方法*/
import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
    export default{
        data(){
            return{
                name: '',
				time:'',
				VueUserNameVo:{username:''}
            }
        },
        mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            this.name = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.$router.replace('/')
            }
			this.$axios.post('/time',{
						username: this.name,
					}).then((res)=>{
			    this.time = res.data
			})
        },
        methods:{
			ToMessage() {
				this.$router.push(
					'/messageFlow'
				)
			},
			ToChange() {
				this.$router.push(
					'/change'
				)
			},
            quit(){
                /*删除cookie*/
                delCookie('username')
				this.$router.replace('/')
            }
        }
    }
</script>



<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>