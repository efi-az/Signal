import type { FormSchema } from '@/common/types/form-schema.type';

export const articleForm: FormSchema[] = [
    {
        rows: [
            {
                name: 'slug',
                type: 'Input',
                label: 'اسلاگ',
                grid: {
                    md: 3
                }
            },
            {
                name: 'title',
                type: 'Input',
                label: 'عنوان',
                grid: {
                    md: 3
                }
            },
            {
                name: 'summary',
                type: 'Input',
                label: 'توضیحات کوتاه',
                grid: {
                    md: 3
                }
            },
        ],
    },
    {
        rows: [
            {
                name: 'readingTime',
                type: 'Input',
                label: 'تایم مطالعه',
                grid: {
                    md: 3
                },
                options: {
                    type: 'number'
                }
            },
            {
                name: 'metaKey',
                type: 'Input',
                label: 'متا',
                grid: {
                    md: 3
                }
            },
            {
                name: 'metaDescription',
                type: 'Input',
                label: 'متا توضیحات',
                grid: {
                    md: 3
                }
            },
        ]
    },
    {
        rows: [
            {
                name: 'status',
                type: 'Select',
                label: 'وضعیت',
                grid: {
                    md: 3
                },
                options: {
                    options: [
                        { label: 'فعال', value: 'Active' },
                        { label: 'غیرفعال', value: 'Passive' },
                    ],
                }
            },
            {
                name: 'category',
                type: 'Empty',
                options: {
                    multiple: true
                }
            },
            {
                name: 'tags',
                type: 'Empty',
                options: {
                    multiple: true,
                }
            }
        ]
    },
    {
        rows: [
            {
                name: 'description',
                type: 'Input',
                label: 'توضیحات',
                grid: {
                    md: 7
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
                    url: '/article/image'
                }
            },
        ]
    },
    {
        rows: [
            {
                name: 'pin_status',
                type: 'Checkbox',
                label: 'پین شده',
                grid: {
                    md: 3
                },
                options: {
                    name: 'pinned'
                }
            },
        ]
    }
]