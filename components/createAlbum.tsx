import React, { useState } from 'react';
import { Modal, Tooltip, Input, Button, message, FloatButton } from "antd";
import { Plus } from 'lucide-react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

export default function CreateAlbum() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [albumTitle, setAlbumTitle] = useState('')

    const handleOk = () => {
        // uploadImage();
        fetch('/api/album/createAlbum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(albumTitle)
        })
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.status === 200) {
                        setLoading(prev => !prev);
                        setIsModalOpen(false);
                        message.success(data.message)
                    }
                    if (data.status === 409) {
                        setLoading(prev => !prev);
                        setIsModalOpen(false);
                        message.warning(data.message)
                    }
                    if (data.status === 500) {
                        setLoading(prev => !prev);
                        setIsModalOpen(false);
                        message.error(data.message)
                    }
                })
            .catch(err => {
                console.log(err),
                    message.error('Error creating album!. Please try again')
            })
        setLoading(prev => !prev)
    };

    const showUpldModal = () => {
        setIsModalOpen(true);
    };
    const handleUpldCancel = () => {
        setIsModalOpen(false);
        setLoading(false)

    };

    return (
        <div>
            <Modal
                okType='default'
                title="Create Album"
                confirmLoading={loading}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleUpldCancel}>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-col gap-1' aria-label='Category:'>
                        <div>Title:</div>
                        <Input
                            style={{ width: 300 }}
                            onBlur={(e: any) => {
                                setAlbumTitle(e.target.value)
                            }} />
                    </div>
                </div>
            </Modal>

            <Tooltip title="Create Album">
                <FloatButton aria-label="Create Album" icon={<PlusOutlined />} style={{ right: 160, bottom: 35 }} onClick={showUpldModal} />
            </Tooltip>
        </div>
    )
}













