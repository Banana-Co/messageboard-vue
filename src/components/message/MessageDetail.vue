<template>
  <div class="message-detail">
  <el-row :gutter="20">
    <el-col :span="4">
    <el-button type="plain" @click="handleClickReturn"> 返回 </el-button> 
    </el-col>
		<el-col :span="4" :offset="18">
		<el-button type="plain" @click="like" > 点赞<!-- <img src="@/assets/dis/dislike.png" height="15px" v-show="show_dislike"> --> <!-- <img src="@/assets/like/like.png" height="15px" > --></el-button>
		</el-col>
	</el-row>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span> {{title}} </span>
      
    </div>
    <div class="text item">
      {{ content }}
    </div>
  </el-card>

  </div>
</template>

<style>
	.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
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
		
    methods: {
			
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