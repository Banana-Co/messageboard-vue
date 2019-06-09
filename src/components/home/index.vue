<template>
    <div>
        <h3>欢迎 {{name}}</h3>
		<p>注册时间:{{time}}</p>
		<br />
        <a href="#" @click="quit">注销登录</a>
		<br />
		<a href="#" v-on:click="ToChange">改变密码</a>
		<br />
		<a href="#" v-on:click="ToMessage">留言</a>
		<div >
			<span @click="$router.back(-1)">返回</span>
		</div>
    </div>
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