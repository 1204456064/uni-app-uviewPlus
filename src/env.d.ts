/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare type Recordable<T = any> = Record<string, T>;
declare module 'uview-plus' {
    export function install(): void;

    interface test {
        /** 邮箱格式校验 */
        email(email: string): boolean;
    }
    interface $u {
        test: test;
        config: any;
    }

    global {
        interface Uni {
            $u: $u;
        }
    }
}
