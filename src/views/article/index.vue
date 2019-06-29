<template>
  <div>

    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
       <el-form ref="form" :model="filterParams" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label="">全部</el-radio>
            <el-radio
              v-for="(item, index) in statTypes"
              :key="item.label"
              :label="index"
            >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select  v-model="filterParams.channel_id" clearable>
            <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-format="yyyy-MM-dd"
            v-model="range_date"
            @change="handleDateChange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
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
      articleLoading: false, // 加载中
      filterParams: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      range_date: '',
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },

  methods: {
    handleDateChange (value) {
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
    },
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        this.channels = data.channels
      } catch (err) {
        console.log(err)
        this.$message.error('获取频道失败')
      }
    },
    onSubmit () {},
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
