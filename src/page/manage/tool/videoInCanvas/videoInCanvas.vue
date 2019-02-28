<template>
    <div class="fill-contain">
        <el-row type="flex">
            <el-col>
                <video autoplay ref="video" width="400" height="300" id="video"
                       style="border: 1px dashed #ccc; border-radius: 5px;"></video>
            </el-col>
            <el-col>
                <el-button @click="screenShot" size="small" class="screen-shot-btn">拍照</el-button>
            </el-col>
        </el-row>


        <!--<img :src="imgSrc" width="400" height="300" v-if="imgSrc ===''?false:true">-->
        <canvas style="display:block;width: 600px" ref="canvas"></canvas>
    </div>
</template>

<script src="./videoInCanvas.component.js"></script>

<style scoped>

</style>