<template>
    <view class="content">
        <uni-row class="cell">
            <uni-col :span="8"> <view class="cell-left">用户名</view></uni-col>
            <uni-col :span="16">
                <view class="cell-right">{{ userInfo.userName }}</view></uni-col
            >
        </uni-row>
        <uni-row class="cell">
            <uni-col :span="8"> <view class="cell-left">账号</view></uni-col>
            <uni-col :span="16">
                <view class="cell-right">{{ userInfo.account }}</view></uni-col
            >
        </uni-row>
        <uni-row class="cell">
            <uni-col :span="8"> <view class="cell-left">角色</view></uni-col>
            <uni-col :span="16">
                <view class="cell-right">{{ userInfo.roles }}</view></uni-col
            >
        </uni-row>
        <uni-row class="cell" @click="toChangePassword">
            <uni-col :span="8"> <view class="cell-left">修改密码</view></uni-col>
            <uni-col :offset="14" :span="2">
                <view class="cell-right"
                    ><uni-icons type="forward" color="rgb(214, 215, 217)" size="30"></uni-icons></view
            ></uni-col>
        </uni-row>
        <uni-row class="cell">
            <uni-col :span="8"> <view class="info-title">应用信息</view></uni-col>
        </uni-row>
        <uni-row class="cell">
            <uni-col :span="8"> <view class="cell-left" @click="checkUpdate">更新版本</view></uni-col>
        </uni-row>
        <uni-row class="cell">
            <uni-col :span="8"> <view class="cell-left">应用版本</view></uni-col>
        </uni-row>
        <uni-popup ref="popupRef" type="dialog">
            <uni-popup-dialog
                mode="base"
                :content="content"
                title="温馨提示"
                :before-close="true"
                type="success"
                @close="close"
                @confirm="confirm"
            ></uni-popup-dialog>
        </uni-popup>
        <button class="action-button" type="warn" @click="showLogout">退出登录</button>
    </view>
</template>

<script lang="ts" setup>
import useIndex from './useIndex';
const { userInfo, content, showLogout, checkUpdate, toChangePassword, popupRef, confirm, close } = useIndex();
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
