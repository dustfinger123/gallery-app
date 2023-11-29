

import React, { useState } from 'react';
import { UploadOutlined } from "@ant-design/icons";
import { FloatButton, Modal, Tooltip, Input, message } from "antd";
import axios from 'axios';

export default function AlbumImageUpload({ sharedChange }: { sharedChange: string }) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [imageTitle, setImageTitle] = useState<string>('')
    const [albumTitle] = useState<string>(sharedChange)
    const [imageFile, setImageFile] = useState<any>()

    const uploadImage = () => {
        const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const fd = new FormData()
        fd.append('file', imageFile)
        fd.append('upload_preset', 'general')
        fd.append('tags', imageTitle)

        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, fd)
            .then((res) => {

                const data = {
                    ...res,
                    album_title: albumTitle
                }
                fetch('/api/taggedImage/albumImage/uploadAlbumImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then((data) => {
                        if (data.status === 200) {
                            message.success(data.message);
                            setLoading((prev) => !prev);
                            setIsModalOpen(!isModalOpen)
                        }
                        if (data.status === 500) {
                            message.error(data.message);
                            setLoading(prev => !prev);
                            setIsModalOpen(!isModalOpen)
                        }
                    }).catch((err) => {
                        message.error('Image Uploading Failed');
                        setLoading(prev => !prev);
                        setIsModalOpen(!isModalOpen);
                        console.log(err)
                    })

            })
            .catch((error) => {
                setLoading(prev => !prev);
                setIsModalOpen(!isModalOpen);
                message.error('Image Uploading Failed')
                console.log(error)
            });

    }

    return (
        <div>
            <Modal
                okType='default'
                title="Upload Photo"
                confirmLoading={loading}
                open={isModalOpen}
                onOk={() => {
                    setLoading(prev => !prev);
                    uploadImage()
                }}
                onCancel={() => {
                    setLoading(false);
                    setIsModalOpen(!isModalOpen)
                }}>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-col gap-1' aria-label='Title'>
                        <div>Album Title:</div>
                        <Input
                            // placeholder="Album Title"
                            defaultValue={sharedChange}
                            style={{ width: 300 }}
                        />
                    </div>
                    <div className='flex flex-col gap-1' aria-label='Title'>
                        <div>Image Title:</div>
                        <Input
                            placeholder="Image Title"
                            style={{ width: 300 }}
                            allowClear={true}
                            onBlur={(e: any) => {
                                setImageTitle(e.target.value)
                            }} />
                    </div>
                </div>
                <Input
                    className='mt-4 w-[300px]'
                    type='file'
                    name='image'
                    allowClear={true}
                    onChange={(e: any) => {
                        setImageFile(e.target.files[0])
                    }}>
                </Input>
            </Modal>

            <Tooltip title="Album Photo">
                <FloatButton aria-label="Album Photo" icon={<UploadOutlined />} style={{ right: 115, bottom: 35 }} onClick={() => { setIsModalOpen(prev => !prev) }} />
            </Tooltip>

        </div >
    )
}