<template>
    <div class="page-container">
        <el-upload
                :action="uploadAction"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :headers="uploadHeader"
                name="upload_img"
                :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import {baseUrl} from "../../../../config/utils";

    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                uploadHeader: {'Authorization': `${window.sessionStorage.getItem('token')}`},
                uploadAction: `${baseUrl}/upload`
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
    }
</script>

<style scoped>

</style>