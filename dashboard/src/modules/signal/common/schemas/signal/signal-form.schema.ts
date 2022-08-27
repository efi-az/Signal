import type { FormSchema } from '@/common/types/form-schema.type';

export const signalForm: FormSchema[] = [
    {
        rows: [
            {
                name: 'targetPoints',
                type: 'Empty',
            },
            {
                name: 'stopLoss',
                type: 'Input',
                label: 'حد ضرر',
                grid: {
                    md: 3
                },
                options: {
                    type: 'number'
                }
            },
            {
                name: 'leverage',
                type: 'Input',
                label: 'leverage',
                grid: {
                    md: 3
                },
                options: {
                    type: 'number'
                }
            },
        ],
    },
    {
        rows: [
            {
                name: 'marketId',
                type: 'Select',
                label: 'مارکت',
                grid: {
                    md: 3
                }
            },
            {
                name: 'bargin',
                type: 'Select',
                label: 'نوع معامله',
                grid: {
                    md: 3
                }
            },
            {
                name: 'status',
                type: 'Select',
                label: 'وضعیت',
                grid: {
                    md: 3
                }
            },
        ]
    },
    {
        rows: [
            {
                name: 'entryPrice',
                type: 'Input',
                label: 'نقطه ورود',
                grid: {
                    md: 3
                },
                options: {
                    type: 'number'
                }
            },
            {
                name: 'risk',
                type: 'Input',
                label: 'درصد ریسک',
                grid: {
                    md: 3
                },
                options: {
                    type: 'number'
                }
            },
            {
                name: 'market',
                type: 'Select',
                label: 'ارز',
                grid: {
                    md: 3
                }
            },
        ]
    },
    {
        rows: [
            {
                name: 'description',
                type: 'Input',
                label: 'توضیحات',
                grid: {
                    md: 3
                },
                options: {
                    rows: 6,
                    type: 'textarea'
                }
            },
            {
                name: 'imageId',
                type: 'ImageUpload',
                label: 'تصویر',
                grid: {
                    md: 3
                },
                options: {
                    url: '/signal/image'
                }
            },
        ]
    }
]