import { UPLOAD_URL } from './../../constant/index';
import { unknownType } from '@/utils/types';
import { onBeforeMount, ref } from 'vue';
import { FormItem } from '../schema';
export default function useIndex(props: { formItem: FormItem }, emit: Function) {
    // 图片的地址集合
    const fileList = ref<{}[]>([]);

    // 图片的地址
    const uploadValue = ref<string>('');

    /**
     * 读取图片后的处理函数
     * @param e index，name，flie
     */
    async function afterRead(e: { file: unknownType; name: string; index: number }) {
        let lists: unknownType = [].concat(e.file);
        let fileListLen = fileList.value.length;
        lists.map((item: unknownType) => {
            fileList.value.push({
                ...item,
                status: 'uploading',
                message: '上传中',
            });
        });

        for (let i = 0; i < lists.length; i++) {
            const result = await uploadFilePromise(lists[i].url);
            let item = fileList.value[fileListLen];
            fileList.value.splice(
                fileListLen,
                1,
                Object.assign(item, {
                    status: 'success',
                    message: '',
                    url: result,
                })
            );
            fileListLen++;
        }

        uploadValue.value = fileList.value.map((item: unknownType) => item.url).toString();
        emit('handleEmit', { value: uploadValue.value, formItem: props.formItem });
    }

    /**
     *
     * @param url 上传
     * @returns 返回的参数
     */
    async function uploadFilePromise(url: string) {
        return new Promise((resolve) => {
            uni.uploadFile({
                url: UPLOAD_URL,
                filePath: url,
                name: 'file',
                success: (res) => {
                    resolve(JSON.parse(res.data).data);
                },
                fail: (error) => {
                    console.log(error);
                    resolve(false);
                },
            });
        });
    }

    /**
     * 移除图片回调
     * @param e 当前项的index，name，flie
     */
    function deletePicture(e: unknownType) {
        fileList.value.splice(e.index, 1);
        uploadValue.value = fileList.value.map((item: unknownType) => item.url).toString();
        emit('handleEmit', { value: uploadValue.value, formItem: props.formItem });
    }

    /**
     * 用于处理表单赋值或者是默认值，将其转化为可渲染的数据
     * @param value 图片地址
     */
    function initFileList(value: unknownType) {
        fileList.value = value.split(',').map((item: { url: string }) => {
            return {
                url: item,
            };
        });

        uploadValue.value = fileList.value.map((item: unknownType) => item.url).toString();
        emit('handleEmit', { value: uploadValue.value, formItem: props.formItem });
    }

    onBeforeMount(() => {
        // 判断有无默认值
        if (!props.formItem.defaultValue) {
            return;
        }

        let value: unknownType = props.formItem.defaultValue;
        initFileList(value);
    });

    return {
        fileList,
        afterRead,
        deletePicture,
        initFileList,
    };
}
