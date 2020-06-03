<template>
  <div class="roleManag-container">
    <div>
      <el-button type="primary" @click="addrole">新增</el-button>
    </div>
    <div class="roleManag-mainBox">
      <el-table v-loading="listLoading" :data="roleList" element-loading-text="Loading" border fit highlight-current-row style="width: 900px">
        <el-table-column align="center" label="#" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="	角色名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作" align="center">
          <template slot-scope="{row,$index}">
            <el-button size="mini" type="text" @click="modifyRole(row,$index)">
              修改
            </el-button>
            <el-button size="mini" type="text" @click="selectRole(scope.row.userId)">
              选择角色
            </el-button>
            <el-button size="mini" type="text" style="color: #f55555" @click="deleteRole(row,$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getroleList, deleteUserInfo } from '@/api/management'
export default {
  name: 'RoleManag',
  data () {
    return {
      'title': '角色管理',
      roleList: [],
      listLoading: true
    }
  },
  created () {
    this.getList(1)
  },
  methods: {
    // 获取角色列表信息
    getList (page) {
      const data = {
        page: page
      }
      this.listLoading = true
      getroleList(data).then(response => {
        console.log(response.data, '获取角色列表信息')
        this.roleList = response.data
        this.listLoading = false
      })
    },
    // 新增角色
    addrole () {
      console.log(1111)
    },
    // 删除角色
    deleteRole (row, index) {
      const data = {
        'userId': row.userId
      }
      // deleteUserInfo(data).then(res => {
      //   this.$notify({
      //     title: 'Success',
      //     message: '成功删除角色',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   this.userInfoList.splice(index, 1)
      // })
    },
    // 修改角色
    modifyRole (row, index) {
      // console.log(row.userId, index, '修改角色')
      // this.dialogTableVisible = true
      // this.dialogTitle = '修改角色'
      // this.userManagItem = row
    },
    // 选择角色
    selectRole () {

    }
  }
}
</script>
<style lang="scss" scoped>
.roleManag {
  &-container {
    margin: 15px;
  }
  &-mainBox {
    margin-top: 15px;
  }
}
</style>
