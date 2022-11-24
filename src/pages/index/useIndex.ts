import { ref } from 'vue';

interface subMneuItem {
    label: string;
    value: string;
    icon: string;
    path: string;
}

interface menuItem {
    label: string;
    value: string;
    subMenu: subMneuItem[];
}

export default function useIndex() {
    // 菜单demo
    // 为了更直观了解菜单数据结构，在数据结构上，直接copy了完整项目昊华的菜单作为例子
    const menuList = ref<menuItem[]>([
        {
            label: 'XForm',
            value: 'XForm',
            subMenu: [
                {
                    label: '普通表单',
                    value: 'phase_xprc',
                    icon: 'x-mart-inflow',
                    path: '/pages/demo/x-form/ordinary-form/index',
                },
                {
                    label: '表单联动',
                    value: 'phase_njrc',
                    icon: 'x-mart-inflow',
                    path: '/pages/demo/x-form/form-linkage/index',
                },
            ],
        },
        {
            label: 'XInspection',
            value: 'XInspection',
            subMenu: [
                {
                    label: '检测项',
                    value: 'phase_sffx',
                    icon: 'x-mart-water',
                    path: '/pages/demo/x-inspection/index',
                },
                {
                    label: 'demo',
                    value: 'phase_sffx',
                    icon: 'x-mart-water',
                    path: '/pages/demo/x-inspection/demo',
                },
            ],
        },
        {
            label: '无限滚动',
            value: '无限滚动',
            subMenu: [
                {
                    label: '无限滚动',
                    value: 'phase_sffx',
                    icon: 'x-mart-water',
                    path: '/pages/demo/infinite-scroll/index',
                },
            ],
        },
        {
            label: 'XDialog',
            value: 'XDialog',
            subMenu: [
                {
                    label: '检测项异常',
                    value: 'phase_cprk',
                    icon: 'x-mart-inflow',
                    path: '/pages/demo/x-dialog/x-inspection-error/index',
                },
                {
                    label: '年检异常',
                    value: 'phase_cpbz',
                    icon: 'x-mart-packing',
                    path: '/pages/demo/x-dialog/x-yearly-check-error/index',
                },
            ],
        },
        {
            label: 'XConfirm',
            value: 'XConfirm',
            subMenu: [
                {
                    label: '二次确认弹框',
                    value: 'phase_cprk',
                    icon: 'x-mart-inflow',
                    path: '/pages/demo/x-confirm/index',
                },
            ],
        },
    ]);
    // 导航至
    function navigateTo(subMenu: subMneuItem) {
        uni.navigateTo({
            url: subMenu.path,
        });
    }
    return {
        menuList,
        navigateTo,
    };
}
