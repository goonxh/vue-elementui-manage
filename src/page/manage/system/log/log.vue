<template>
    <div class="page-container">
        <div>
            <el-button size="small" type="primary" @click="refreshTable">刷新列表</el-button>
        </div>
        <el-table
                v-loading="loading"
                ref="logTable"
                :data="tableData"
                tooltip-effect="dark"
                @row-click="rowClick"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    prop="user"
                    label="用户"
                    align="center"
                    fixed>
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="时间"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="action"
                    label="动作"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ip"
                    label="IP"
                    align="center">
            </el-table-column>
        </el-table>
        <el-pagination class="flex justify-content-center "
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-sizes="[10, 20, 30, 40]"
                       layout="sizes, prev, pager, next"
                       background
                       :page-size="pagination.pageSize"
                       :current-page="pagination.currentPage"
                       :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script src="./log.component.js"></script>
<style scoped lang="scss">
    .el-table{
        margin-top: 15px;
    }
    .el-form-item {
        margin-bottom: 15px;
    }
    .el-pagination{
        margin-top: 15px;
    }
</style>