<template>
	<div class="wrap">
		<p v-show="showTishi">{{tishi}}</p>
		<h3>用户名: {{name}}</h3>
		<input type="password" v-model="loginInfoVo.password0" placeholder="请输入旧密码" />
		<input type="password" v-model="loginInfoVo.password1" placeholder="请输入新密码" />
		<input type="password" v-model="loginInfoVo.password2" placeholder="请确定新密码" />
		<button v-on:click="change">修改密码</button>
		<div >
			<span @click="$router.back(-1)">返回</span>
		</div>
	</div>
</template>

<script>
	import {
		setCookie,
		getCookie
	} from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				loginInfoVo: {
					username: '',
					password0: '',
					password1: '',
					password2: '',
				},
				responseResult: [],
				showTishi: false,
				tishi: '',
				name: '',
			}
		},
		mounted() {
			/*页面挂载获取保存的cookie值，渲染到页面上*/
			let uname = getCookie('username')
			this.name = uname
			this.loginInfoVo.username = this.name
		},
		methods: {
			change() {
				if (this.loginInfoVo.password1 != this.loginInfoVo.password2) {
					this.tishi = "两次输入密码不同"
					this.showTishi = true
				} else {
					this.$axios
						.post('/changepswd', {
							username: this.loginInfoVo.username,
							old_password:this.loginInfoVo.password0,
							new_password: this.loginInfoVo.password1,
						})
						.then(successResponse => {
							this.responseResult = JSON.stringify(successResponse.data)
							if (successResponse.data.code === 200) {
								this.$router.push('/index')
							}else if (successResponse.data.code === 400) {
								this.tishi = "密码错误"
								this.showTishi = true
							}
						})
						.catch(failResponse => {})
				}

			}
		}
	}
</script>

<style>
	.wrap {
		text-align: center;
	}

	input {
		display: block;
		width: 250px;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		margin-bottom: 10px;
		outline: none;
		border: 1px solid #888;
		padding: 10px;
		box-sizing: border-box;
	}

	p {
		color: red;
	}

	button {
		display: block;
		width: 250px;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		border: none;
		background-color: #41b883;
		color: #fff;
		font-size: 16px;
		margin-bottom: 5px;
	}

	span {
		cursor: pointer;
	}

	span:hover {
		color: #41b883;
	}
</style>
