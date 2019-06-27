<template>
  <div>

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>一共有xxx条数据</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-table
        class="article-list"
        :data="articles"
        style="width: 100%"
        v-loading="articleLoading"
        >
        <el-table-column
          label="封面"
          width="180">
          <template slot-scope="scope">
            <img
              width="20"
              v-for="item in scope.row.cover.images"
              :key="item"
              :src="item"
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">
              {{ statTypes[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <el-button size="mini" type="primary" plain>修改</el-button>
            <el-button size="mini" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        :disabled="articleLoading"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      pageSize: 10, // 每页大小
      totalCount: 0, // 总数据量
      page: 1, // 当前页码
      articleLoading: false // 加载中
    }
  },
  created () {
    this.loadArticles()
  },

  methods: {
    async loadArticles () {
      this.articleLoading = true
      const data = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page,
          per_page: this.pageSize
        }
      })
      this.articles = data.results
      this.totalCount = data.total_count
      this.articleLoading = false
    },
    handleCurrentChange (page) {
      this.page = page
      this.loadArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 15px;
}
.article-list {
  margin-bottom: 30px;
}
</style>
