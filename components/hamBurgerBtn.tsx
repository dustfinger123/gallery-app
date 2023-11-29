import { useEffect, useState } from "react"

export default function Hamburger({ navMenuClick }: any) {
    const [animateHam, setAnimateHam] = useState(false)

    const commonCSS = `border-black transition-all duration-300 ease-linear border-2 w-full`

    useEffect(() => {
        setAnimateHam(navMenuClick)
        console.log(navMenuClick)
    }, [navMenuClick])
    const handleClick = () => {
        setAnimateHam((prevAnimation) => !prevAnimation)
    }
    return (
        <div className="p-1 flex flex-col items-center justify-center gap-1 w-full h-full"
            onClick={handleClick}>
            <div className={`${animateHam ? 'rotate-45 translate-y-2' : ''} ${commonCSS}`}></div>
            <div className={`${animateHam ? '-translate-x-full opacity-0' : ''} ${commonCSS}`}></div>
            <div className={`${animateHam ? '-rotate-45 -translate-y-2' : ''} ${commonCSS}`}></div>
        </div>
    )
}