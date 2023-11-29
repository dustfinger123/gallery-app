'use client'
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons"
import { Dropdown, Form, Input, MenuProps, Modal, Space, message } from "antd"
import { Album, Archive, FolderLock, Home, Star, Trash2 } from "lucide-react"
import React from "react"
import { useEffect, useState } from "react"
export const revalidate = 2

export default function ViewerLeft({ onChange }: any) {
    const [isClicked, setIsClcked] = useState<string>('')
    const handleClick = (e: string) => {
        const value = e
        onChange(value)
        setIsClcked(value as string)
    }
    const [albumList, setAlbumList] = useState<string[]>()
    const [lockedFolderPassword, setLockedFolderPassword] = useState()
    const [folderPassword, setFolderPassword] = useState(false)
    const [enterFolderPassword, setEnterFolderPassword] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [form] = Form.useForm();

    useEffect(() => {
        fetch('/api/album/getAlbum', {
            method: 'GET',
            cache: 'no-store',
            next: { revalidate: 2 }
        })
            .then(res => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setAlbumList(data.albumList)
                } else if (data.status === 404) {
                    console.log('Not Found:', data.message);
                } else {
                    console.log('Unexpected Status:', data.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        fetch('/api/currentUser')
            .then(res => res.json())
            .then((data) => {
                setLockedFolderPassword(data.data.folderPassword)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const items: MenuProps['items'] = albumList?.map((item, index) => {
        return {
            key: index,
            label: (
                <div onClick={() => handleClick(item)}>
                    {item}
                </div>
            ),
        }
    })

    const handleModalView = () => {
        setIsModalOpen(prev => !prev)
        if (lockedFolderPassword === '') {
            setFolderPassword(true)
        } else {
            setEnterFolderPassword(true)
        }
    }

    const handleNewPassword = () => {
        setIsLoading(true)
        form
            .validateFields()
            .then((values) => {
                fetch('/api/edit/signUpData', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                })
                    .then(response => response.json())
                    .then(data => {
                        setIsLoading(false)
                        setLockedFolderPassword(data.updatedData.folderPassword)
                        setFolderPassword(false)
                        setEnterFolderPassword(true)
                    })
                    .catch(error => {
                        // Handle errors
                        console.error('Error:', error);
                    });
                form.resetFields();
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    }

    const handleSubmitPassword = () => {
        setIsLoading(true)
        form
            .validateFields()
            .then((values) => {
                fetch('/api/login&signup/lockedFolder', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === 200) {
                            message.success(data.message)
                            setIsLoading(false)
                            setIsModalOpen(false);
                            handleClick('locked folder')
                        }
                        if (data.status === 401) {
                            message.error(data.message)
                        }
                    })
                    .catch(error => console.error(error))
                form.resetFields();
            })
            .catch(error => { console.error('Error:', error) })
    }

    const handleCancel = () => {
        setIsLoading(false)
        form.resetFields();
        setIsModalOpen(false);
    };


    return (
        <div className="h-4/5 w-1/5 absolute left-0 bottom-0 ml-6 mb-4">
            <div className="flex flex-col gap-2 ml-6">
                <div className="text-sm text-gray-500 font-poppins">Library</div>
                <div className="flex flex-col gap-3">
                    <div className={`flex flex-row gap-4 items-center font-poppins text-gray-600 font-bold text-sm hover:cursor-pointer hover:bg-slate-300 h-10 w-fit p-4 pl-2 rounded-3xl transition-all duration-500 ease-in-out hover:text-blue-600
                    ${isClicked.trim().toLocaleLowerCase() === 'home' ? "text-green-700 hover:text-green-700" : ""}`} onClick={() => handleClick('home')}>
                        <div>
                            <Home />
                        </div>
                        <div>Home</div>
                    </div>
                    <div className={`flex flex-row gap-4 items-center font-poppins text-gray-600 font-bold text-sm hover:cursor-pointer hover:bg-slate-300 h-10 w-fit p-4 pl-2 rounded-3xl transition-all duration-500 ease-in-out hover:text-blue-600
                    ${isClicked.trim().toLocaleLowerCase() === 'favourite' ? "text-green-700 hover:text-green-700" : ""}`} onClick={() => handleClick('favourite')}>
                        <div>
                            <Star />
                        </div>
                        <div>Favourite</div>
                    </div>
                    <div className={`flex flex-row gap-4 items-center font-poppins text-gray-600 font-bold text-sm hover:cursor-pointer hover:bg-slate-300 h-10 w-fit p-4 pl-2 rounded-3xl transition-all duration-500 ease-in-out hover:text-blue-600
                    ${isClicked.trim().toLocaleLowerCase() === 'albums' ? "text-green-700 hover:text-green-700" : ""}`}>
                        <div>
                            <Album />
                        </div>
                        <Dropdown overlayStyle={{ overflow: "auto", height: '200px' }}
                            className={`${items ? 'cursor-pointer' : 'pointer-events-none'}`}
                            menu={{ items }}>
                            <Space onClick={() => handleClick('albums')}>
                                <a onClick={(e) => { e.preventDefault() }}>
                                    Albums
                                </a>
                            </Space>
                        </Dropdown>
                    </div>
                    <div className={`flex flex-row gap-4 items-center font-poppins text-gray-600 font-bold text-sm hover:cursor-pointer hover:bg-slate-300 h-10 w-fit p-4 pl-2 rounded-3xl transition-all duration-500 ease-in-out hover:text-blue-600
                    ${isClicked.trim().toLocaleLowerCase() === 'archive' ? "text-green-700 hover:text-green-700" : ""}`} onClick={() => handleClick('archive')}>
                        <div>
                            <Archive />
                        </div>
                        <div>Archive</div>
                    </div>
                    <div className={`flex flex-row gap-4 items-center font-poppins text-gray-600 font-bold text-sm hover:cursor-pointer hover:bg-slate-300 h-10 w-fit p-4 pl-2 rounded-3xl transition-all duration-500 ease-in-out hover:text-blue-600
                    ${isClicked.trim().toLocaleLowerCase() === 'locked folder' ? "text-green-700 hover:text-green-700" : ""}`} onClick={() => (isClicked === 'locked folder' ? '' : handleModalView())}>
                        <div>
                            <FolderLock />
                        </div>
                        <div>Locked Folder</div>
                    </div>
                    <div className={`flex flex-row gap-4 items-center font-poppins text-gray-600 font-bold text-sm hover:cursor-pointer hover:bg-slate-300 h-10 w-fit p-4 pl-2 rounded-3xl transition-all duration-500 ease-in-out hover:text-blue-600
                    ${isClicked.trim().toLocaleLowerCase() === 'trash' ? "text-green-700 hover:text-green-700" : ""}`} onClick={() => handleClick('trash')}>
                        <div>
                            <Trash2 />
                        </div>
                        <div>Trash</div>
                    </div>
                </div>
            </div>

            <Modal
                title={`${folderPassword ? 'Please create new password' : 'Enter Password'}`}
                open={isModalOpen}
                onOk={() => (folderPassword ? handleNewPassword() : handleSubmitPassword())}
                onCancel={handleCancel} okType="default" confirmLoading={isLoading} >
                {folderPassword &&
                    <Form form={form}>
                        <Space className="w-full" direction="vertical">
                            <Form.Item
                                noStyle
                                name='password'
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback>
                                <Input.Password
                                    placeholder="New password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>
                            <Form.Item
                                noStyle

                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Confirm password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            </Form.Item>
                        </Space>
                    </Form>
                }
                {enterFolderPassword &&
                    <Form
                        form={form}>
                        <Form.Item
                            noStyle
                            name='password'
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback>
                            <Input.Password
                                placeholder="Enter password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                    </Form>}
            </Modal>

        </div >
    )
}