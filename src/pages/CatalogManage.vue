<template>
    <div class="wrapper">
        <el-button type="primary" @click="openAddDialog" style="width: 100px;">添加标签</el-button>
        <el-table :data="catalogList" style="width: 1000px">
            <el-table-column prop="id" label="ID" width="350" />
            <el-table-column prop="tagname" label="标签名" width="200" />
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="removeTag(scope.row.id)">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加标签" v-model="addDialogVisible" @close="() => {addTagModel.tagname = undefined}">
            <el-form>
                <el-form-item label="标签名">
                    <el-input v-model="addTagModel.tagname" placeholder="请输入标签名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addTag">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { list,add,remove} from '../api/catagory.js'
const catalogList = ref([]);
const addDialogVisible = ref(false);

const addTagModel = ref({
    tagname: undefined
})
const getCatalogList = async () => {
    const res = await list();
    if (res.code === 0) {
        catalogList.value = res.data;
    }
}

const openAddDialog = () => {
    addDialogVisible.value = true;
}

const addTag = async () => {
    if (!addTagModel.value.tagname) {
        return;
    }
    const res = await add({tagname: addTagModel.value.tagname});
    if (res.code === 0) {
        getCatalogList();
        addDialogVisible.value = false;
    }
}

const removeTag = async (id) => {
    const res = await remove({id});
    if (res.code === 0) {
        getCatalogList();
    }
}
onMounted(() => {
    getCatalogList();
})
</script>

