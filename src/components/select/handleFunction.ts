import { FormItem } from '@/components/schema';
export function handleSlots(formItem: FormItem, textContent: string, renderSuffix: boolean) {
    if (formItem.slots?.slotType === 'suffix') {
        renderSuffix = true;
    }

    if (formItem.slots?.renderType === 'text') {
        textContent = formItem.slots.content;
    }
}
