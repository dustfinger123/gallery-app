import { Button, Modal } from "antd"
import { Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Hamburger from "./hamBurgerBtn"
import React from 'react';
import { Avatar, Space, Dropdown, MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'




export default function AnimationdNavigation() {
    const router = useRouter()
    const [logOutModalVisibility, setLogOutModalVisibility] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [animation, setAnimation] = useState<boolean>(false)
    const [hoveredElement, setHoveredElement] = useState<string>('leave')
    const [rcvdUserData, setRcvdUserData] = useState<{
        name: string,
        email: string,
        phone: number,
        gender: string,
        prefix: string,
        folderPassword: string
    }>({
        name: '',
        email: '',
        phone: 0,
        gender: '',
        prefix: '',
        folderPassword: ''
    })
    const[isClicked, setIsClicked]=useState<boolean>()

    useEffect(() => {
        fetch('/api/currentUser', {
            method: 'GET'
        }).then(res => res.json())
            .then((res) => {
                if (res.status === 200) {
                    const { email, name, prefix, phone, gender, folderPassword } = res.data;
                    setRcvdUserData({
                        name: name,
                        email: email,
                        phone: phone,
                        gender: gender,
                        prefix: prefix,
                        folderPassword: folderPassword
                    })
                }
            })
    }, [])

    const logOutModal = () => {
        setLogOutModalVisibility(!logOutModalVisibility)
    }
    const logOut = () => {
        setLoading(!loading)
        fetch('/api/deleteCookies', {
            method: 'POST'
        })
            .then(res => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setLoading(!loading)
                    router.push('/logIn');
                } else {
                    setLoading(!loading)
                    console.error('Failed to delete cookies:', data.error); // Log the error
                }
            })
            .catch((error) => {
                setLoading(!loading)
                console.error('Error during fetch:', error); // Log fetch errors
            });
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Profile
                </a>
            ),
            icon: <UserOutlined />
        },
        {
            key: '2',
            label: (
                <div onClick={logOutModal}>
                    Logout
                </div>),
            icon: <LogoutOutlined onClick={logOutModal} />
        },
    ];

    const divRightFirst = `h-full w-[15vw] -skew-x-[20deg] transition-all duration-500 ease-in-out ${animation ? 'bg-yellow-400 -translate-x-28' : 'bg-[#facc1591] -translate-x-64'}`
    const divRightSecond = `${animation ? 'opacity-90 translate-x-28 ' : '-translate-x-full'} transition-all duration-500 ease-in-out bg-blue-400 w-[70vw]  h-full origin-left absolue top-0 left-0`

    const divLeftFirst = `h-full w-[15vw] -skew-x-[20deg] transition-all duration-500 ease-in-out ${animation ? 'bg-orange-400 translate-x-28' : 'bg-[#fb923c94]  translate-x-64'}`
    const divLeftSecond = `${animation ? '-translate-x-28 opacity-90' : 'translate-x-full'} transition-all duration-500 ease-in-out bg-orange-500 w-[30vw] h-full origin-left absolute top-0 right-0`

    const handleClick = () => {
        setAnimation(!animation);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setHoveredElement(e.currentTarget.id)
    }

    const handleMouseLeave = () => {
        setHoveredElement('leave')
    }
    return (
        <div className="z-20">
            <Button className="absolute w-12 h-10 p-0 top-5 right-5 z-30 flex items-center justify-center"
                onClick={handleClick}>
                <Hamburger navMenuClick={isClicked}/>
            </Button>

            <div className="absolute top-5 right-36 text-4xl text-[#2d4588] font-dancing tracking-wide">
                {rcvdUserData.name.toUpperCase()}
            </div>
            <Dropdown className="absolute top-3 right-20 " menu={{ items }} placement="bottom">
                <a onClick={(e) => e.preventDefault()}>
                    <Space size={26} wrap>
                        <Avatar className="flex flex-row justify-center items-center pb-1 text-3xl w-14 h-14 text-center bg-[#fde3cf] text-[#f56a00]">{rcvdUserData.name.slice(0, 2).toUpperCase()}</Avatar>
                    </Space>
                </a>
            </Dropdown>

            <div className={`${animation ? 'pointer-events-auto' : 'pointer-events-none'} flex flex-row justify-between absolute top-0 z-[2] w-screen h-screen overflow-hidden`}>
                <div className={divRightFirst}>
                    <div className={divRightSecond}>
                        <Link href={'/'} onClick={()=>setIsClicked(false)}>
                            <div className={`${hoveredElement === 'leave' ? 'flex' : 'hidden'} flex-row items-center justify-center border h-full w-full text-teal-400 text-8xl font-bold font-moirai`}
                                onClick={handleClick}>
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-row h-min p-1 overflow-hidden">
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-0' : 'opacity-0 -translate-x-full'} `}>S</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[800ms]' : 'opacity-0 -translate-x-full'} `}>i</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[900ms]' : 'opacity-0 -translate-x-full'} `}>x</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1000ms]' : 'opacity-0 -translate-x-full'} `}>t</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1100ms]' : 'opacity-0 -translate-x-full'} `}>e</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1200ms]' : 'opacity-0 -translate-x-full'} `}>e</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1300ms]' : 'opacity-0 -translate-x-full'} `}>n</div>
                                    </div>
                                    <div className="flex flex-row h-min p-1 overflow-hidden" >
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1400ms]' : 'opacity-0 -translate-x-full'} `}>G</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1500ms]' : 'opacity-0 -translate-x-full'} `}>a</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1600ms]' : 'opacity-0 -translate-x-full'} `}>l</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1700ms]' : 'opacity-0 -translate-x-full'} `}>l</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1800ms]' : 'opacity-0 -translate-x-full'} `}>e</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[1900ms]' : 'opacity-0 -translate-x-full'} `}>r</div>
                                        <div className={`${animation ? 'translate-x-0 opacity-100 transition-all duration-500 ease-in-out delay-[2000ms]' : 'opacity-0 -translate-x-full'} `}>y</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className={`absolute flex flex-row items-center justify-center border h-full w-full text-8xl font-bold tracking-widest font-moirai text-teal-300`}>
                            <div className={`${hoveredElement.includes('album') ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>Al</div>
                            <div className={`${hoveredElement.includes('album') ? 'translate-y-0 opacity-100' : '-translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>b</div>
                            <div className={`${hoveredElement.includes('album') ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>um</div>
                        </div>

                        <div className={`absolute flex flex-row items-center justify-center border h-full w-full text-8xl font-bold tracking-widest font-moirai text-teal-300`}>
                            <div className={`${hoveredElement === 'blog' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>Bl</div>
                            <div className={`${hoveredElement === 'blog' ? 'translate-y-0 opacity-100' : '-translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>og</div>
                        </div>

                        <div className={`absolute flex flex-row items-center justify-center border h-full w-full text-8xl font-bold tracking-widest font-moirai text-teal-300`}>
                            <div className={`${hoveredElement === 'about' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>Ab</div>
                            <div className={`${hoveredElement === 'about' ? 'translate-y-0 opacity-100' : '-translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>o</div>
                            <div className={`${hoveredElement === 'about' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>ut</div>
                        </div>

                        <div className={`absolute flex flex-row items-center justify-center border h-full w-full text-8xl font-bold tracking-widest font-moirai text-teal-300`}>
                            <div className={`${hoveredElement === 'contact' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>Co</div>
                            <div className={`${hoveredElement === 'contact' ? 'translate-y-0 opacity-100' : '-translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>nta</div>
                            <div className={`${hoveredElement === 'contact' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>ct</div>
                        </div>

                        <div className={`absolute flex flex-row items-center justify-center border h-full w-full text-8xl font-bold tracking-widest font-moirai text-teal-300`}>
                            <div className={`${hoveredElement === 'facebook' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>Fac</div>
                            <div className={`${hoveredElement === 'facebook' ? 'translate-y-0 opacity-100' : '-translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>eb</div>
                            <div className={`${hoveredElement === 'facebook' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>ook</div>
                        </div>

                        <div className={`absolute flex flex-row items-center justify-center border h-full w-full text-8xl font-bold tracking-widest font-moirai text-teal-300`}>
                            <div className={`${hoveredElement === 'instagram' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>Ins</div>
                            <div className={`${hoveredElement === 'instagram' ? 'translate-y-0 opacity-100' : '-translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>tag</div>
                            <div className={`${hoveredElement === 'instagram' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>ram</div>
                        </div>

                        <div className={`absolute flex flex-row items-center justify-center border h-full w-full text-8xl font-bold tracking-widest font-moirai text-teal-300`}>
                            <div className={`${hoveredElement === 'youtube' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>Yo</div>
                            <div className={`${hoveredElement === 'youtube' ? 'translate-y-0 opacity-100' : '-translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>utu</div>
                            <div className={`${hoveredElement === 'youtube' ? 'translate-y-0 opacity-100' : 'translate-y-9 opacity-0'} transform transition-all duration-300 ease-linear`}>be</div>
                        </div>

                    </div>
                </div>

                <div className={divLeftFirst}>
                    <div className={divLeftSecond}>
                        <div className="flex flex-col gap-2 items-center justify-center bg-green-400 h-full w-full text-4xl font-playball tracking-widest">

                            <Link className="flex justify-center items-center w-full" href={'/album'}  onClick={()=>setIsClicked(false)}>
                                <div id="album" className="flex justify-center w-full transform hover:scale-150 hover:text-blue-700 transition-all duration-300 ease-linear skew-x-[20deg]"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClick}>Album</div>
                            </Link>

                            {/* <Link className="flex justify-center items-center w-full" href={'/blog'}  onClick={()=>setIsClicked(false)}>
                                <div id="blog" className="flex justify-center w-full transform hover:scale-150 hover:text-blue-700 transition-all duration-300 ease-linear skew-x-[20deg]"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClick}>Blog</div>
                            </Link> */}

                            <Link className="flex justify-center items-center w-full" href={'/about'}  onClick={()=>setIsClicked(false)}>
                                <div id="about" className="flex justify-center w-full transform hover:scale-150 hover:text-blue-700 transition-all duration-300 ease-linear skew-x-[20deg]"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClick}>About</div>
                            </Link>

                            <Link className="flex justify-center items-center w-full" href={'/contact'}  onClick={()=>setIsClicked(false)}>
                                <div id="contact" className="flex justify-center w-full transform hover:scale-150 hover:text-blue-700 transition-all duration-300 ease-linear skew-x-[20deg]"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClick}>Contact</div>
                            </Link>

                            <div className="skew-x-[20deg] flex flex-row justify-center items-center mt-3">

                                <Link href={'https://www.facebook.com'}>
                                    <div id="facebook" className=" flex justify-center items-center transform hover:scale-150 hover:text-blue-700 transition-all duration-300 ease-linear w-12 h-12"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleClick}><Facebook className="w-10 h-10" /></div>
                                </Link>

                                <Link href={'https://www.instagram.com'}>
                                    <div id="instagram" className=" flex justify-center items-center transform hover:scale-150 hover:text-blue-700 transition-all duration-300 ease-linear w-12 h-12"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleClick}><Instagram className="w-10 h-10" /></div>
                                </Link>

                                <Link href={'https://www.youtube.com'}>
                                    <div id="youtube" className=" flex justify-center items-center transform hover:scale-150 hover:text-blue-700 transition-all duration-300 ease-linear w-12 h-12"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={handleClick}><Youtube className="w-10 h-10" /></div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <Modal confirmLoading={loading} open={logOutModalVisibility} okText='Confirm' okType="default" onOk={logOut} onCancel={() => setLogOutModalVisibility(!logOutModalVisibility)}>
                <div className="flex flex-col gap-2 ">
                    <p className="font-megrim mb-4 text-4xl font-semibold text-green-950">{rcvdUserData.name}</p>
                    <p className="text-lg font-semibold">Are you sure you want to logout?</p>
                </div>
            </Modal>
        </div>
    )
}







