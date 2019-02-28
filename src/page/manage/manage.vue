<template>
    <el-container class="fill-contain">
        <el-header>
            <head-top @clickMenuIcon="clickMenuIcon"></head-top>
        </el-header>
        <el-container class="fill-contain">
            <side-nav :is-collapse = 'isCollapse'></side-nav>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script src="./manage.component.js"></script>
<style lang="scss" src="./manage.scss"></style>
