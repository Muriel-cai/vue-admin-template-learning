<template>
  <div class="resource-container">
    <!-- <h1>{{ title }}</h1> -->
    <div class="resource-leftBox">
      <el-tree ref="managList" :data="managList" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree" default-expand-all @node-click="handleNodeClick" />
    </div>
    <div class="resource-rightBox">
      <el-form ref="resourceItem" :model="resourceItem" label-width="120px">
        <el-form-item label="资源名称：">
          <el-input v-model="resourceItem.label" />
        </el-form-item>
        <el-form-item label="资源路径：">
          <el-input v-model="resourceItem.path" />
        </el-form-item>
        <el-form-item label="资源描述：">
          <el-input v-model="resourceItem.description" />
        </el-form-item>
        <el-form-item label="资源排序：">
          <el-input v-model="resourceItem.priority" />
        </el-form-item>
        <el-form-item label="资源图标：">
          <el-input v-model="resourceItem.iconCls" />
        </el-form-item>
      </el-form>
      <div class="resource-btnBox">
        <el-button type="primary" @click="saveData">保存</el-button>
        <el-button type="primary" @click="addChildNodesBtbn">添加子节点</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getmanagment, saveManag, addChildNodes } from '@/api/management'
export default {
  name: 'ResourceManag',
  data() {
    return {
      'title': '资源管理',
      managList: null,
      listLoading: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      resourceItem: {

      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getmanagment().then(response => {
        console.log(response.data, '资源管理的返回结果')
        this.managList = response.data
        this.listLoading = false
      })
    },
    handleNodeClick(data) {
      console.log(data, 'handleNodeClick')
      this.resourceItem = data
    },
    filterNode(value, data) {
      console.log(value, data, '对根节点的操作')
      // if (!value) return true;
      // return data.label.indexOf(value) !== -1;
    },
    // 保存修改
    saveData() {
      saveManag(this.resourceItem).then(res => {
        console.log(res)
      })
      console.log('保存按钮')
    },
    // 添加子节点
    addChildNodesBtbn() {
      this.resourceItem.parentId = this.resourceItem.id
      console.log(this.resourceItem, '添加子节点')
      addChildNodes(this.resourceItem).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.resource {
  &-container {
    margin: 15px;
    position: relative;
    height: auto;
  }
  &-leftBox {
    position: absolute;
    width: 300px;
    height: auto;

    left: 0;
    top: 0;
  }
  &-rightBox {
    position: relative;
    width: 100%;
    height: auto;
    margin-left: 320px;
    width: 350px;
  }
  &-btnBox {
    position: relative;
    padding-left: 120px;
  }
}
</style>
