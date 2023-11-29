'use client'
import GeneralImageUpload from "@/components/uploadIGeneralImage";
import { useEffect, useState } from "react";
import useSWR, { mutate } from 'swr';
import { Card, Empty, FloatButton, Image, Rate, Skeleton, Spin, Tooltip, Watermark, message } from "antd";
import { DeleteOutlined, ExclamationOutlined, FolderAddOutlined, HeartOutlined, LoadingOutlined, LockOutlined, SyncOutlined } from "@ant-design/icons";
import AlbumImageUpload from "@/components/uploadAlbumImage";
import CreateAlbum from "@/components/createAlbum";

export const revalidate = 2
export default function ViewerRight({ sharedChange }: any) {
    const [isProcessing, setIsProcessing] = useState<any>([])
    const { Meta } = Card;
    const [initPage, setInitPage] = useState<string>('home')
    useEffect(() => {
        setInitPage(sharedChange ? sharedChange : 'home');
    }, [sharedChange])

    const valuesToExclude = ['favourite', 'home', 'archive', 'locked folder', 'trash']
    const cleanedSharedChange = initPage?.trim().toLowerCase();

    let url = ''
    if (initPage?.trim().toLowerCase() === 'home') {
        url = '/api/generalImage/getGeneralImage'
    }
    if (initPage?.trim().toLowerCase() === 'favourite') {
        url = '/api/taggedImage/getFavouriteImage'
    }
    if (initPage?.trim().toLowerCase() === 'archive') {
        url = '/api/taggedImage/archiveImage/getArchiveImage'
    }
    if (initPage?.trim().toLowerCase() === 'locked folder') {
        url = '/api/taggedImage/lockedImage/getLockedImage'
    }
    if (initPage?.trim().toLowerCase() === 'trash') {
        url = '/api/taggedImage/getTrashImage'
    }
    if (valuesToExclude.every(value => !cleanedSharedChange?.includes(value))) {
        url = `/api/taggedImage/albumImage/getAlbumImage?query=${sharedChange}`
    }
    const fetcher = async (url: string) => {
        try {
            const response = await fetch(url, {
                cache: 'no-cache',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
    const handleArchiveClick = (arg: string) => {
        fetch('/api/taggedImage/archiveImage/imageAddToArchive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arg)
        }).then(res => res.json())
            .then((data) => {
                if (data.status === 200) {
                    message.success(data.message)
                    setIsProcessing('')
                }
                if (data.status === 500) {
                    message.error(data.message)
                }
            })
    }
    const handleLockedClick = (arg: string) => {
        fetch('/api/taggedImage/lockedImage/imageAddToLockedFolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(arg)
        }).then(res => res.json())
            .then((data) => {
                if (data.status === 200) {
                    message.success(data.message)
                    setIsProcessing('')
                }
                if (data.status === 500) {
                    message.error(data.message)
                }
            })
    }
    const handleDelete = (arg: string) => {
        // fetch('/api/deletion/deleteCldImage', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(arg)
        // })
        //     .then(res => res.json())
        //     .then((data) => {
        //         console.log(data)
        //         fetch('/api/deletion/deleteDbImage', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(data)
        //         })
        //             .then(res => res.json())
        //             .then((data) => {
        //                 if (data.status === 200) {
        //                     message.success(data.message)
        //                     setIsProcessing('')
        //                 }
        //                 if (data.status === 500) {
        //                     message.error(data.message)
        //                 }
        //             })
        //     })
        fetch('/api/deletion/toTrash', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(arg)
        })
            .then(res => res.json())
            .then((data) => {
                if (data.status === 200) {
                    message.success(data.message)
                    setIsProcessing('')
                }
                if (data.status === 500) {
                    message.error(data.message)
                }
            })

    }

    const { data, error, isLoading } = useSWR(url, fetcher)

    if (error)
        return (
            <div className="flex flex-col items-center justify-center h-4/5 w-3/4 absolute right-0 bottom-0 mr-6 mb-4 bg-transparent border overflow-auto scrollbar-none">
                <div className="flex flex-row items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded h-fll gap-1" role="alert">
                    <ExclamationOutlined className="text-5xl bg-red-200 rounded-full" />
                    <strong className="text-3xl font-bold">Oops! Something went wrong</strong>
                </div>
            </div>
        );
    if (isLoading)
        return (
            <div className="flex flex-col h-4/5 w-3/4 absolute right-0 bottom-0 mr-6 mb-4 bg-transparent border overflow-auto scrollbar-none">
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row gap-1 ">
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                    </div>
                    <div className="flex flex-row gap-1 ">
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                        <Skeleton.Image active style={{ width: 200, height: 265 }} />
                    </div>
                </div>
            </div >
        )

    if (!data || !data.data) return <div className="flex flex-col items-center justify-center h-4/5 w-3/4 absolute right-0 bottom-0 mr-6 mb-4 bg-transparent border overflow-auto scrollbar-none">
        <Empty description='No images to display.' />
    </div>

    const publicIdArray: string[] = [];
    const imageTitleArray: string[] = [];
    const dateStringArray: string[] = [];
    const userEmailArray: string[] = [];
    const secureUrlArray: string[] = [];
    const favouriteArray: number[] = []

    data.data.forEach((item: { date_string: string; imageTitle: string; public_id: string; secure_url: string; user_email: string; favourite: number }) => {
        const { date_string, imageTitle, public_id, secure_url, user_email, favourite } = item;
        publicIdArray.push(public_id);
        imageTitleArray.push(imageTitle);
        dateStringArray.push(date_string);
        userEmailArray.push(user_email);
        secureUrlArray.push(secure_url);
        favouriteArray.push(favourite);
    });

    const handleChange = (arg: string, arg2: number) => {
        const data = {
            secure_url: arg,
            favourite: arg2
        };

        fetch('/api/edit/favourite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .catch(error => {
                console.error('Error updating favorite:', error);
                // Optionally, provide user feedback about the error
            });
    };

    return (
        <div className="flex flex-col h-4/5 w-3/4 absolute right-0 bottom-0 mr-6 mb-4 bg-transparent border overflow-auto scrollbar-none">
            {
                url === `/api/taggedImage/albumImage/getAlbumImage?query=${sharedChange}` || initPage.trim().toLocaleLowerCase() === 'albums' ?
                    <div>
                        <CreateAlbum />
                        <AlbumImageUpload sharedChange={sharedChange as string} />
                    </div> : <GeneralImageUpload />
            }
            <Tooltip title="Refresh">
                <FloatButton aria-label="Refresh" icon={<SyncOutlined />} style={{ right: 70, bottom: 35 }} onClick={() => { mutate(url) }} />
            </Tooltip>
            {url === '/api/taggedImage/getTrashImage' ?
                <Watermark content={["Images moved to the trash will be", "automatically deleted after 7 days"]}>
                    <div className="flex flex-row flex-1 flex-wrap h-fit w-full gap-1">
                        {
                            publicIdArray?.length === 0 ?
                                (
                                    <div className="text-center w-full flex flex-col items-center justify-center">
                                        <Empty description='No images to display.' />
                                    </div>
                                ) :
                                (
                                    publicIdArray?.map((item, index) => (
                                        <Card key={item} hoverable
                                            style={{ width: 200, height: 265 }}
                                            cover={<Image alt="example" width={200} height={150} src={secureUrlArray[index]} />}

                                            actions={url === '/api/taggedImage/getTrashImage' ? [] :
                                                [
                                                    <Tooltip key='favourite' title='Favourite'>
                                                        <Rate count={1} character={<HeartOutlined className="text-base" key="favourite" />}
                                                            className='text-red-600'
                                                            defaultValue={favouriteArray[index]}
                                                            onChange={(value) => handleChange(secureUrlArray[index], value)} />
                                                    </Tooltip>,
                                                    ...(url === '/api/taggedImage/archiveImage/getArchiveImage'
                                                        ? []
                                                        : [
                                                            <Tooltip key='archive' title='Add to archive'>
                                                                <Spin className={`${isProcessing === secureUrlArray[index] ? '' : 'hidden'}`} indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                                                                <FolderAddOutlined className={`${isProcessing === secureUrlArray[index] ? 'hidden' : ''}`}
                                                                    onClick={() => {
                                                                        handleArchiveClick(secureUrlArray[index]);
                                                                        setIsProcessing(secureUrlArray[index])
                                                                    }} />
                                                            </Tooltip>
                                                        ]),
                                                    ...(url === '/api/taggedImage/lockedImage/getLockedImage'
                                                        ? []
                                                        : [
                                                            <Tooltip key='private' title='Add to private'>
                                                                <Spin className={`${isProcessing === `${secureUrlArray[index]}private` ? '' : 'hidden'}`} indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                                                                <LockOutlined className={`${isProcessing === `${secureUrlArray[index]}private` ? 'hidden' : ''}`}
                                                                    onClick={() => {
                                                                        handleLockedClick(secureUrlArray[index]);
                                                                        setIsProcessing(`${secureUrlArray[index]}private`)
                                                                    }} />
                                                            </Tooltip>
                                                        ]),
                                                    <Tooltip key="delete" title='Delete image'>
                                                        <Spin className={`${isProcessing === `${secureUrlArray[index]}delete` ? '' : 'hidden'}`} indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                                                        <DeleteOutlined className={`${isProcessing === `${secureUrlArray[index]}delete` ? 'hidden' : ''}`}
                                                            onClick={() => {
                                                                handleDelete(publicIdArray[index]);
                                                                setIsProcessing(`${secureUrlArray[index]}delete`)
                                                            }} />
                                                    </Tooltip>
                                                ]}>

                                            <Meta title={imageTitleArray[index]} />
                                        </Card>
                                    ))
                                )
                        }
                    </div>
                </Watermark> :
                <div className="flex flex-row flex-1 flex-wrap h-fit w-full gap-1">
                    {
                        publicIdArray?.length === 0 ?
                            (
                                <div className="text-center w-full flex flex-col items-center justify-center">
                                    <Empty description='No images to display.' />
                                </div>
                            ) :
                            (
                                publicIdArray?.map((item, index) => (
                                    <Card key={item} hoverable
                                        style={{ width: 200, height: 265 }}
                                        cover={<Image alt="example" width={200} height={150} src={secureUrlArray[index]} />}

                                        actions={url === '/api/taggedImage/getTrashImage' ? [] :
                                            [
                                                <Tooltip key='favourite' title='Favourite'>
                                                    <Rate count={1} character={<HeartOutlined className="text-base" key="favourite" />}
                                                        className='text-red-600'
                                                        defaultValue={favouriteArray[index]}
                                                        onChange={(value) => handleChange(secureUrlArray[index], value)} />
                                                </Tooltip>,
                                                ...(url === '/api/taggedImage/archiveImage/getArchiveImage'
                                                    ? []
                                                    : [
                                                        <Tooltip key='archive' title='Add to archive'>
                                                            <Spin className={`${isProcessing === secureUrlArray[index] ? '' : 'hidden'}`} indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                                                            <FolderAddOutlined className={`${isProcessing === secureUrlArray[index] ? 'hidden' : ''}`}
                                                                onClick={() => {
                                                                    handleArchiveClick(secureUrlArray[index]);
                                                                    setIsProcessing(secureUrlArray[index])
                                                                }} />
                                                        </Tooltip>
                                                    ]),
                                                ...(url === '/api/taggedImage/lockedImage/getLockedImage'
                                                    ? []
                                                    : [
                                                        <Tooltip key='private' title='Add to private'>
                                                            <Spin className={`${isProcessing === `${secureUrlArray[index]}private` ? '' : 'hidden'}`} indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                                                            <LockOutlined className={`${isProcessing === `${secureUrlArray[index]}private` ? 'hidden' : ''}`}
                                                                onClick={() => {
                                                                    handleLockedClick(secureUrlArray[index]);
                                                                    setIsProcessing(`${secureUrlArray[index]}private`)
                                                                }} />
                                                        </Tooltip>
                                                    ]),
                                                <Tooltip key="delete" title='Delete image'>
                                                    <Spin className={`${isProcessing === `${secureUrlArray[index]}delete` ? '' : 'hidden'}`} indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />} />
                                                    <DeleteOutlined className={`${isProcessing === `${secureUrlArray[index]}delete` ? 'hidden' : ''}`}
                                                        onClick={() => {
                                                            handleDelete(publicIdArray[index]);
                                                            setIsProcessing(`${secureUrlArray[index]}delete`)
                                                        }} />
                                                </Tooltip>
                                            ]}>

                                        <Meta title={imageTitleArray[index]} />
                                    </Card>
                                ))
                            )
                    }
                </div>
            }

        </div >
    )

}





