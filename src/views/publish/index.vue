<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button type="success" @click="handlePublish(false)">发布</el-button>
        <el-button type="primary" @click="handlePublish(true)">存入草稿</el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="16">
        <!-- 表单 -->
        <el-form ref="form" :model="articleForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <quill-editor v-model="articleForm.content"
              ref="myQuillEditor"
              :options="editorOption">
            </quill-editor>
          </el-form-item>
          <el-form-item label="封面">
            <!-- <el-radio-group>
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>-->
          </el-form-item>
          <el-form-item label="频道">
            <article-channel v-model="articleForm.channle_id"></article-channel>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
          </el-form-item>
        </el-form>
        <!-- /表单 -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './quill.user.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AppPublish',
  components: {
    ArticleChannel,
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        },
        editorOption: {}
      }
    }
  },
  created () {
    if (this.$route.name === 'publish-edit') {
      this.loadArticle()
    }
  },
  methods: {
    async loadArticle () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: `/articles/${this.$route.params.id}`
        })
        this.articleForm = data
      } catch (err) {
        console.log(err)
        this.$message.error('获取文章失败')
      }
    },
    async handlePublish (draft) {
      try {
        await this.$http({
          method: 'POST',
          url: '/articles',
          params: {
            draft
          },
          data: this.articleForm
        })
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      } catch (err) {
        this.$message.error('发布失败', err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
