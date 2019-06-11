<template>
  <div class="message-detail">
	<h3>欢迎 {{LikeInfoVo.user_name}}</h3>
		<br />
		<p>信息号:{{LikeInfoVo.message_id}}</p>
		<br />
  <el-row>
    <el-col :span="6">
    <el-button type="plain" @click="handleClickReturn"> 返回 </el-button> 
    </el-col>
		<el-col :span="6" >
		<el-button type="plain" @click="like" > 点赞<!-- <img src="@/assets/dis/dislike.png" height="15px" v-show="show_dislike"> --> <!-- <img src="@/assets/like/like.png" height="15px" > --></el-button>
		 
		</el-col>
	</el-row>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span> {{title}} </span>
      <!--
      <el-卡片名称button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      -->
    </div>
    <div class="text item">
      {{ content }}
    </div>
  </el-card>

  </div>
</template>

<style>
  .message-detail {
    margin-left: 220px;
    margin-right: 220px
  }

  .box-card {
    margin-top: 30px;
  }

  .text {
    font-size: 18px;
    text-align: left;
    line-height: 2
  }

  .item {
    margin-top: 18px;
    margin-left: 60px;
    margin-right: 60px;
    margin-bottom: 18px;
  }

  .clearfix {
    line-height: 50px;
    font-size: 30px
  }
</style>

<script>
	import {
		setCookie,
		getCookie,
		delCookie
	} from '../../assets/js/cookie.js'
  export default {
    name: "MessageDetail",
    data () {
      return {
        title: '',
        content: '',
				LikeInfoVo: {
					user_name: getCookie('username'),
					message_id: this.$route.params.id
				},
				// show_like:false,
				// show_dislike:true
      }
    },
		// mounted(){
		//     /*页面挂载获取保存的cookie值，渲染到页面上*/
		//     if(getCookie('like/${this.$route.params.id}')){
		// 			this.show_like=true,
		// 			this.show_dislike=false
		// 		}else{
		// 			this.show_like=false,
		// 			this.show_dislike=true
		// 		}
		// },
		
    methods: {
			
			// like() {
			// 	if(this.show_dislike==true){
			// 		this.show_dislike=false;
			// 		this.show_like=true;
			// 		setCookie('like/${this.$route.params.id}', true, 1000 * 60);
			// 		this.$axios
			// 		  .post(`/addLike/${this.$route.params.id}`)
			// 		  .catch(function (error) {
			// 		    console.log(error);
			// 		  })
			// 	}else{
			// 		this.show_dislike=true;
			// 		this.show_like=false;
			// 		delCookie('like/${this.$route.params.id}');
			// 		this.$axios
			// 		  .post(`/addDislike/${this.$route.params.id}`)
			// 		  .catch(function (error) {
			// 		    console.log(error);
			// 		  })
			// 	}
			// },
			like() {
					this.$axios
					  .post('/addLike', {
					    user_name: this.LikeInfoVo.user_name,
					    message_id: this.LikeInfoVo.message_id,
					  })
						.then(successResponse => {
							this.responseResult = JSON.stringify(successResponse.data)
							if (successResponse.data.code === 200) {
								alert("点赞成功")
							} else if (successResponse.data.code === 400) {
								alert("已点赞过该留言")
							}
						})
						.catch(failResponse => {})
				
			},
      getMessageDetail() {
        this.$axios
          .get(`/getMessage/${this.$route.params.id}`)
          .then(successResponse => {
              this.responseResult = JSON.stringify(successResponse.data);
              this.title = successResponse.data.title;
              this.content = successResponse.data.content;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      handleClickReturn() {
        this.$router.push({path: "/messageFlow"})
      }
    },
    created: function() {
      this.getMessageDetail()
    }
  }
	
</script>