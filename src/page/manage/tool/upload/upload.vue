<template>
    <div class="upload-page page-container">
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
        <el-row :gutter="20">
            <el-col :span="10">
                <ul class="upload-pic-list">
                    <li v-for="(img,index) in uploadPicList" class="flex">
                        <a :href="'http://vue.xiehao.xin'+img.path" target="_blank" class="flex justify-content-start">
                            <img :src="'http://vue.xiehao.xin'+img.path" alt="" width="100" height="100">
                        </a>
                        <div class="flex align-items-center justify-content-center column">
                            <p class="">{{img.name}}</p>
                        </div>
                    </li>
                </ul>
                <el-pagination class="flex justify-content-center "
                               @current-change="handleCurrentChange"
                               layout="prev, pager, next"
                               background
                               :page-size="pagination.pageSize"
                               :current-page="pagination.currentPage"
                               :total="pagination.total">
                </el-pagination>
            </el-col>
            <el-col :span="14">
                <el-collapse v-model="activeNames" accordion>
                    <el-collapse-item title="node-formidable" name="node-formidable">
                        <p>A node.js module for parsing form data, especially file uploads.</p>
                        <p>github地址：<a href="https://github.com/felixge/node-formidable" target="_blank">https://github.com/felixge/node-formidable</a>
                        </p>
                        <pre>
                            <code>
                                <div v-html="formidableHtml"></div>
                            </code>
                        </pre>
                    </el-collapse-item>
                    <el-collapse-item title="highlight.js" name="highlightjs">
                        <p>Highlight.js is a syntax highlighter written in JavaScript. It works in the browser as well as on the server. It works with pretty much any markup, doesn’t depend on any framework, and has automatic language detection.</p>
                        <p>github地址：<a href="https://github.com/highlightjs/highlight.js" target="_blank">https://github.com/highlightjs/highlight.js</a>
                        </p>
                        <pre>
                            <code>
                                <div v-html="hljHtml"></div>
                            </code>
                        </pre>
                    </el-collapse-item>
                </el-collapse>

            </el-col>
        </el-row>
    </div>
</template>

<script src="./upload.component.js"></script>
<style  lang="scss">
    .el-collapse-item__content{
        line-height: 1.5;
    }
    pre{
        margin: -40px 0;
        padding: 0;
    }
    .hljs{
        margin: 0;
        padding: 0;
        div{
            margin: 0;
            padding: 0;
        }
    }
    .upload-pic-list {
        width: 400px;
        margin: 10px 0 30px;
        li {
            margin: 10px 0;
            border: 1px solid #359EE8;
            border-radius: 10px;
            img {
                margin: 5px;
            }
        }
    }
</style>