<template>
    <div class="wrapper">
        <el-form :inline="true">
            <el-form-item label="ID">
                <el-input placeholder="请输入ID"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="级别" :style="{width: '200px'}"> <!-- 设置 el-form-item 的宽度 -->
                <el-select placeholder="请选择级别"> <!-- el-select 组件 -->
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="普通用户" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getUserList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="userList" style="width: 1000px">
            <el-table-column fixed prop="id" label="ID" width="350" />
            <el-table-column prop="username" label="用户名" width="200" />
            <el-table-column prop="state" label="状态" width="120">
                <template #default="{row}">
                    <el-tag v-if="row.enable === 1" type="success">启用</el-tag>
                    <el-tag v-else type="danger">禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="level" label="级别" width="120" />
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="disableUser(scope.row.id)"
                        v-if="scope.row.enable === 1">
                        禁用
                    </el-button>
                    <el-button link type="primary" size="small" @click="enableUser(scope.row.id)" v-else>
                        启用
                    </el-button>
                    <el-button link type="primary" size="small" @click="handleRefreshPwd(scope.row.id)">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,prev, pager, next" :total="paginationConfig.count"></el-pagination>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { list, disable, enable, refreshPwd } from '../api/user.js'
    const userList = ref([]);
    const paginationConfig = ref({
        count: 0,
        pageSize: 10,
        currentPage: 1
    });
    const qureyParams = {
        id: '',
        username: '',
        level: '',
        enable: ''
    }
    const getUserList = async () => {
        const params = {
            pageSize: paginationConfig.value.pageSize,
            currentPage: paginationConfig.value.currentPage,
            ...qureyParams
        };
        const res = await list(params);
        if (res.code === 0) {
            userList.value = res.data.users;
            paginationConfig.value.count = res.data.count;
        }
        console.log(userList.value);
    }

    const disableUser = async (id) => {
        const res = await disable({ id: id });
        if (res.code === 0) {
            getUserList();
        }
    }

    const enableUser = async (id) => {
        const res = await enable({ id: id });
        if (res.code === 0) {
            getUserList();
        }
    }

    const handleRefreshPwd = async (id) => {
        const res = await refreshPwd({ id: id });
        if (res.code === 0) {
            getUserList();
        }
    }
    onMounted(() => {
        getUserList();
    })
</script>


<style>
    .wrapper {
        height: 800px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
    }
</style>