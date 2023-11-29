import Link from "next/link";
import AnimatedNavigation from "./animatedNavigation";

interface HeaderProps {
    className: {
        position: string,
        text: string,
        background: string,
        shadow:string
    }
}
export default function Header({ className }: HeaderProps) {
    return (
        <div className="flex flex-col">
            <header className={`${className.background} ${className.shadow} flex absolute top-0 z-[1] items-center h-20 w-full shadow-lg`}>
                <div className="flex flex-row justify-between w-full px-5">
                    <Link href={'/'}>
                        <div className="flex flex-row gap-1 justify-end text-orange-600 items-end">
                            <div className={`${className.text} font-dancing text-4xl tracking-wider`}>Sixteen</div>
                            <div className={`${className.text} font-dancing text-4xl tracking-wider`}>Gallery</div>
                        </div>
                    </Link>
                    {/* <nav className={`${className.text} flex flex-row gap-5 items-end text-black text-xl`}>
                        <Link href={"/Album"}>Album</Link>
                        <Link href={"/About"}>About</Link>
                        <Link href={"/Blog"}>Blog</Link>
                        <Link href={"/Contact"}>Contact</Link>
                        <div id="social" className="flex flex-row gap-2">
                            <Facebook />
                            <Youtube />
                            <Instagram />
                        </div>
                    </nav> */}
                </div>
            </header>
            <AnimatedNavigation />
        </div>)
}