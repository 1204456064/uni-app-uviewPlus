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
            label: 'componentForm',
            value: 'componentForm',
            subMenu: [
                {
                    label: '动态表单',
                    value: '动态表单',
                    icon: 'order',
                    path: '/pages/component-form/index',
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
