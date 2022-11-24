<template>
    <view class="view-wrap menu">
        <view v-for="menu in menuList" :key="menu.label" class="menu__menu-item">
            <view class="menu__title"
                ><text>{{ menu.label }}</text></view
            >
            <view class="menu__menu-wrap">
                <view v-for="sub in menu.subMenu" :key="sub.label" class="menu__submenu" @click="navigateTo(sub)"
                    ><uni-icons
                        class="menu__icon"
                        color="#fff"
                        custom-prefix="iconfont"
                        :type="sub.icon"
                        size="60rpx"
                    ></uni-icons
                    ><view class="menu__sub-label">
                        <text>
                            {{ sub.label }}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script lang="ts" setup>
import useIndex from './useIndex';
const { menuList, navigateTo } = useIndex();
</script>
<style lang="scss" scoped>
.menu {
    &__menu-item {
        margin-bottom: 30rpx;
    }

    &__title {
        color: #2196f3;
        margin-bottom: 20rpx;
    }

    &__menu-wrap {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    &__submenu {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 160rpx;
        height: 190rpx;
        padding: 16rpx;
        margin: 16rpx;
        color: #fff;
        background: #2196f3;
        border-radius: 10rpx;
        box-shadow: 0 2px 12px 0 rgba(33, 150, 243, 0.1);
    }

    &__icon {
        font-size: 60rpx;
    }

    &__sub-label {
        margin-top: 10rpx;
        font-size: 24rpx;
    }
}
</style>
