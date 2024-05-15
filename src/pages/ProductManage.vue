<template>
    <div class="wrapper">
        <el-form :inline="true">
            <el-form-item label="商品名称">
                <el-input placeholder="请输入商品名称"></el-input>
            </el-form-item>
        </el-form>
        <el-table :data="productList" style="width: 100%">
            <el-table-column prop="uid" label="ID" width="350"></el-table-column>
            <el-table-column prop="seller" label="发布方" width="350"></el-table-column>
            <el-table-column prop="price" label="价格" width="100"></el-table-column>
            <el-table-column label="商品描述" width="200">
                <template  #default="{row}">
                  <el-tooltip :content="row.description" placement="top" :disabled="row.description.length < 20">
                    <div class="truncate">{{ row.description.length > 20 ? row.description.slice(0,20) + '...' : row.description }}</div>
                  </el-tooltip>
                </template>
              </el-table-column>
            <el-table-column label="标签" width="300">
                <template #default="{row}">
                    <el-tag v-for="tag in row.tags" :key="tag" type="success">{{tag.tagname}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template #default="{row}">
                    <el-tag v-if="row.display === 1" type="success">已上架</el-tag>
                    <el-tag v-else type="danger">已下架</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleHide(scope.row.id)"
                        v-if="scope.row.display === 1">
                        下架
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,prev, pager, next" :total="paginationConfig.count"></el-pagination>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { list,hide } from '../api/product.js'
    const productList = ref([]);
    const paginationConfig = ref({
        count: 0,
        pageSize: 10,
        currentPage: 1
    });
    const qureyParams = {
        id: undefined,
    }

    const getProductList = async () => {
        const params = {
            pageSize: paginationConfig.value.pageSize,
            pageNum: paginationConfig.value.currentPage,
            ...qureyParams
        }

        const res = await list(params);
        if (res.code === 0) {
            productList.value = res.data.data;
            paginationConfig.value.count = res.data.count;
        }
    }

    const handleHide = async (id) => {
        const res = await hide({id: id});
        if (res.code === 0) {
            getProductList();
        }
    }

    const isTextOverflow = (text) => {
    const el = document.createElement('div');
    el.style.whiteSpace = 'nowrap';
    el.style.overflow = 'hidden';
    el.style.textOverflow = 'ellipsis';
    el.style.width = '100%';
    el.innerText = text;
    document.body.appendChild(el);
    const isOverflowing = el.scrollWidth > el.clientWidth;
    document.body.removeChild(el);
    console.log(isOverflowing);
    return isOverflowing;
  }

    onMounted(() => {
        getProductList()
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