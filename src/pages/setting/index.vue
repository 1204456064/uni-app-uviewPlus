<template>
    <view class="content">
        <u-row class="cell">
            <u-col :span="4"> <view class="cell-left">用户名</view></u-col>
            <u-col :span="8">
                <view class="cell-right">{{ userInfo.userName }}</view></u-col
            >
        </u-row>
        <u-row class="cell">
            <u-col :span="4"> <view class="cell-left">账号</view></u-col>
            <u-col :span="8">
                <view class="cell-right">{{ userInfo.account }}</view></u-col
            >
        </u-row>
        <u-row class="cell">
            <u-col :span="4"> <view class="cell-left">角色</view></u-col>
            <u-col :span="8">
                <view class="cell-right">{{ userInfo.roles }}</view></u-col
            >
        </u-row>
        <u-row class="cell" @click="toChangePassword">
            <u-col :span="4"> <view class="cell-left">修改密码</view></u-col>
            <u-col :offset="7" :span="1">
                <view class="cell-right"
                    ><uni-icons type="forward" color="rgb(214, 215, 217)" size="30"></uni-icons></view
            ></u-col>
        </u-row>
        <u-row class="cell">
            <u-col :span="4"> <view class="info-title">应用信息</view></u-col>
        </u-row>
        <u-row class="cell">
            <u-col :span="4"> <view class="cell-left" @click="checkUpdate">更新版本</view></u-col>
        </u-row>
        <u-row class="cell">
            <u-col :span="4"> <view class="cell-left">应用版本</view></u-col>
        </u-row>

        <u-button class="action-button" type="error" @click="showLogout">退出登录</u-button>
    </view>
</template>

<script lang="ts" setup>
import useIndex from './useIndex';
const { userInfo, content, showLogout, checkUpdate, toChangePassword } = useIndex();
</script>

<style lang="scss" scoped>
.content {
    margin-left: 30rpx;
    margin-right: 30rpx;
}

.cell {
    border-bottom: 1px rgb(214, 215, 217) solid;
}

.cell-left {
    height: 100rpx;
    display: flex;
    align-items: center;
}

.cell-right {
    height: 100rpx;
    line-height: 100rpx;
    text-align: right;
}

.info-title {
    margin-bottom: 30rpx;
    color: #3c9cff;
}
</style>
