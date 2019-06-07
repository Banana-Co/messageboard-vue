<template>
<div id="app" class="all">

<div style="height:15px">
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>我的合同</el-breadcrumb-item>
</el-breadcrumb>
<el-divider></el-divider>
</div>


<el-container margin-top="">
   <el-header align="right">
          <el-button type="plain" @click="dialogFormVisible = true"> 新建合同 </el-button>
   </el-header>

  <el-container>
      <el-card>
      <el-aside>
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1">
            <span slot="title">查看已签署合同</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
            <span>查看未签署合同</span>
            </template>
            <el-menu-item index="2-1">我（甲方）未签署</el-menu-item>
            <el-menu-item index="2-2">我（乙方）未签署</el-menu-item>
            <el-menu-item index="2-3">对方（乙方）未签署</el-menu-item>
          </el-submenu>  
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
        </el-main>
      </el-container>

      </el-card>
  </el-container>

</el-container>

 <el-dialog title="合同信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="乙方用户名" :label-width="formLabelWidth">
      <el-autocomplete class="inline-input" v-model="form.name" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
    </el-form-item>
    <el-form-item label="合同标题" :label-width="formLabelWidth">
      <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 1}" placeholder="请输入合同标题" v-model="form.title"> </el-input>
    </el-form-item>
    <el-form-item label="合同内容" :label-width="formLabelWidth">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" placeholder="请输入合同内容" v-model="form.content"> </el-input>
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">关 闭</el-button>
    <el-button type="primary" @click="addContract" :disabled="saveButtonDisabled">保 存</el-button>
  </div>
</el-dialog>
</div>
</template>

<style>
  .all {
    margin-left: 120px;
    margin-right: 120px;
  }
  
</style>

<script>
export default {
  name: 'MyContract',
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      saveButtonDisabled: false,
      form: {
        name: '',
        title: '',
        content: ''
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    querySearch(queryString, cb) {
        result = this.$axios
          .post('/getUsersByPrefix', {prefix: queryString});
        cb(results)
    },
    addContract() {
      this.$axios
        .post('/addContract', {
          partyB: this.form.name,
          title: this.form.title,
          content: this.form.content
        })
        .then(res => {
          if (res.data === 1) {
            this.dialogFormVisible = false
            this.$alert('您的合同已保存', '成功', {
              confirmButtonText: '确定', 
            })
            this.form.name = ''
            this.form.title = ''
            this.form.content = ''
          }
        })
    }
  }
}
</script>