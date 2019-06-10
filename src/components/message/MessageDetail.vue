<template>
  <div class="message-detail">

  <el-row>
    <el-col :span="6">
    <el-button type="plain" @click="handleClickReturn"> 返回 </el-button> 
    </el-col>
		<el-col :span="6" >
		<el-button type="plain" @click="like" > <img src="@/assets/dis/dislike.png" height="15px" v-show="show_dislike"> <img src="@/assets/like/like.png" height="15px" v-show="show_like"></el-button>
		 
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
  export default {
    name: "MessageDetail",
    data () {
      return {
        title: '',
        content: '',
				show_like:false,
				show_dislike:true,
      }
    },
    methods: {
			
			like() {
				if(this.show_dislike==true){
					this.show_dislike=false;
					this.show_like=true;
				}else{
					this.show_dislike=true;
					this.show_like=false;
				}
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