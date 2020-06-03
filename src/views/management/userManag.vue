<template>
  <div class="userManag-container">
    <div>
      <el-button type="primary" @click="addMember">新增</el-button>
    </div>
    <div class="userManag-mainBox">
      <el-table v-loading="listLoading" :data="userInfoList" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="#" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="用户名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户手机号" width="220" align="center">
          <template slot-scope="scope">
            {{ scope.row.userPhone }}
          </template>
        </el-table-column>
        <el-table-column label="用户邮箱" width="260" align="center">
          <template slot-scope="scope">
            {{ scope.row.userEmail }}
          </template>
        </el-table-column>
        <el-table-column label="最后登陆时间" width="220" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
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
    <!--弹框-->
    <el-dialog width="480px" :visible.sync="dialogTableVisible" :title="dialogTitle" @dragDialog="handleDrag">
      <el-form ref="userManagItem" :rules="userRules" :model="userManagItem" label-width="120px">
        <el-form-item label="用户名称：" prop="userName">
          <el-input v-model="userManagItem.userName" />
        </el-form-item>
        <el-form-item label="手机号码：" prop="userPhone">
          <el-input v-model="userManagItem.userPhone" />
        </el-form-item>
        <el-form-item label="邮箱地址：" prop="userEmail">
          <el-input v-model="userManagItem.userEmail" />
        </el-form-item>
        <el-form-item label="单位地址：" prop="address">
          <el-input v-model="userManagItem.address" />
        </el-form-item>
        <el-form-item label="用户密码：" prop="pwd">
          <el-input v-model="userManagItem.pwd" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addData('userManagItem')">保存</el-button>

        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { validEmail, validatePhone } from '@/utils/validate'
import { getUserList, modifyUserInfo, deleteUserInfo, addUser } from '@/api/management'
export default {
  name: 'UserManag',
  data () {
    const validEmails = (rule, value, callback) => {
      console.log(rule, value, '验证邮箱')
      if (!validEmail(value)) {
        callback(new Error('请填写正确的邮箱'))
      } else {
        callback()
      }
    }
    const valisPhone = (rule, value, callback) => {
      console.log(rule, value, '验证手机号')
      if (!validatePhone(value)) {
        callback(new Error('请填写正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      'title': '用户管理',
      listLoading: 'true',
      userInfoList: [],
      dialogTableVisible: false,
      dialogTitle: '新增用户',
      saveType: '',
      userManagItem: {

      },
      userRules: {
        userName: [
          { message: '请输入用户名称', required: true, trigger: 'blur' }
        ],
        userPhone: [
          { validator: valisPhone, message: '手机号格式不正确', trigger: 'blur' }
        ],
        userEmail: [
          { validator: validEmails, required: true, type: 'email', message: '请填写电子邮箱', trigger: ['blur', 'change'] }
        ],
        address: [
          { message: '请输入用户地址', required: true, trigger: 'blur' }
        ],
        pwd: [
          { message: '请输入密码', required: true, trigger: 'blur' }
        ]

      }
    }
  },
  created () {
    this.getlist(1)
  },
  methods: {
    // 获取用户列表信息
    getlist (page) {
      const data = {
        page: page
      }
      this.listLoading = true
      getUserList(data).then(response => {
        console.log(response.data, '获取用户列表信息')
        this.userInfoList = response.data
        this.listLoading = false
      })
    },
    // handleInput(e) {
    //   console.log(e.target.value, handleInput)
    //   this.$emit('input', e.target.value)
    // },

    // 新增
    addMember () {
      this.saveType = '1'
      this.dialogTableVisible = true
      this.dialogTitle = '新增用户'
      this.userManagItem = {}
    },

    // 重置密码
    // resetPassword(userId) {

    // },
    // 删除角色
    deleteRole (row, index) {
      const data = {
        'userId': row.userId
      }
      deleteUserInfo(data).then(res => {
        this.$notify({
          title: 'Success',
          message: '成功删除角色',
          type: 'success',
          duration: 2000
        })
        this.userInfoList.splice(index, 1)
      })
    },
    // 修改角色
    modifyRole (row, index) {
      console.log(row.userId, index, '修改角色')
      this.dialogTableVisible = true
      this.dialogTitle = '修改角色'
      this.userManagItem = row
      this.saveType == '2'
    },
    // 选择角色
    selectRole () {

    },
    // 保存用户信息
    addData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.saveType == '1') {
            addUser(this.userManagItem).then(res => {
              this.dialogTableVisible = false

              this.getlist(1)
            })
          } else if (this.saveType == '2') {
            modifyUserInfo(this.userManagItem).then(res => {
              this.dialogTableVisible = false
              this.getlist(1)
            })
          }
        }
      })
    },
    handleDrag () {
      this.$refs.select.blur()
    }

  }
}
</script>
<style lang="scss" scoped>
.userManag {
  &-container {
    margin: 15px;
  }
  .color_red {
    color: #f55555;
  }
  &-mainBox {
    margin-top: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
