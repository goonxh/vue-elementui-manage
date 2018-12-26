<template>
    <div class="markdown-to-html fill-contain">
        <p>markdown语法：<a href="https://www.appinn.com/markdown/">https://www.appinn.com/markdown/</a></p>
        <el-row :gutter="20">
            <el-col :span="12">
                <editable-div v-model="markdownText" :placeholder="'输入markdown'"></editable-div>
            </el-col>
            <el-col :span="12">
                <editable-div class="result-div" v-model="compiledMarkdown" :contenteditable="false"></editable-div>
                <editable-div class="result-div" v-html="compiledMarkdown" :contenteditable="false"></editable-div>
            </el-col>
        </el-row>
    </div>
</template>

<script src="./markdown2html.component.js"></script>

<style scoped lang="scss">
    .markdown-to-html{
        p{
            line-height: 32px;
        }
        .el-row{
            height: 90%;
            .el-col{
                height: 90%;
                .result-div{
                    height: 50%;
                    padding: 2px;
                }
            }
        }
    }

</style>