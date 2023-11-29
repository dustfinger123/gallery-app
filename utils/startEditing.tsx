// @ts-nocheck

export default function startEditing(publicId: any) {
    const myEditor = cloudinary.mediaEditor();
    myEditor.update({
        // mode: 'inline',
        publicIds: [publicId],
        cloudName: process.env.NEXT_PUBLIC_cloud_name,
        image: {
            steps: [
                'resizeAndCrop',
                'imageOverlay',
                'textOverlays',
                'export'
            ],
            resizeAndCrop: {
                toggleAspectRatio: true,
                aspectRatioLock: true,
                flip: true,
                rotate: true,
                presets: [
                    'original',
                    'square',
                    'landscape-16:9',
                    'landscape-4:3',
                    'portrait-3:4',
                    'portrait-9:16'
                ]
            },
            imageOverlay: {
                overlays: [
                    {
                        publicId: 'Nature_and_Landscapes/z7ivhl9zuhbg1cclli3u',
                        label: '01',
                        transformation: [],
                        placementOptions: [
                            'top_left',
                            'top_right',
                            'bottom_left',
                            'bottom_right',
                            'middle'
                        ]
                    },
                    {
                        publicId: 'Nature_and_Landscapes/z7ivhl9zuhbg1cclli3u',
                        label: '02',
                        transformation: [],
                        placementOptions: [
                            'top_left',
                            'top_right',
                            'bottom_left',
                            'bottom_right',
                            'middle'
                        ]
                    },
                    {
                        publicId: 'Nature_and_Landscapes/z7ivhl9zuhbg1cclli3u',
                        label: '03',
                        transformation: [],
                        placementOptions: [
                            'top_left',
                            'top_right',
                            'bottom_left',
                            'bottom_right',
                            'middle'
                        ]
                    },
                    {
                        publicId: 'Nature_and_Landscapes/z7ivhl9zuhbg1cclli3u',
                        label: '04',
                        transformation: [],
                        placementOptions: [
                            'top_left',
                            'top_right',
                            'bottom_left',
                            'bottom_right',
                            'middle'
                        ]
                    }
                ]
            },
            textOverlays: {
                presets: [
                    'heading',
                    'subtitle',
                    'body',
                    'caption'
                ]
            },
            export: {
                quality: [
                    'auto',
                    'best',
                    'good',
                    'eco',
                    'low'
                ],
                formats: [
                    'jpg',
                    'png',
                    'webp'
                ],
                download: true,
                share: true
            }
        },
        theme: {
            logo: 'https://res.cloudinary.com/product-demos/image/upload//mew/Travel/logos/02'
        }
    });
    myEditor.show();
    myEditor.on('export', function (data) {
        console.log(data);
    });
}

