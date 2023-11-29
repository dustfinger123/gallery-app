import { Button } from "antd"
import { useEffect, useState } from "react"

export default function Logo() {
    const [animate, setAnimate] = useState(false)
    useEffect(()=>{
        setAnimate(!animate)
    }, [])
    return (
        <div className="flex flex-row gap-2">
            <div className="flex flex-row h-min p-1 overflow-hidden">
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full'} transition-all duration-700 ease-in-out delay-0`}>S</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-full'} transition-all duration-700 ease-in-out delay-[50ms]`}>i</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full'} transition-all duration-700 ease-in-out delay-[100ms]`}>x</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-full'} transition-all duration-700 ease-in-out delay-[150ms]`}>t</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full'} transition-all duration-700 ease-in-out delay-[200ms]`}>e</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-full'} transition-all duration-700 ease-in-out delay-[250ms]`}>e</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full'} transition-all duration-700 ease-in-out delay-[300ms]`}>n</div>
            </div>
            <div className="flex flex-row h-min p-1 overflow-hidden" >
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-full'} transition-all duration-700 ease-in-out delay-[350ms]`}>G</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full'} transition-all duration-700 ease-in-out delay-[400ms]`}>a</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-full'} transition-all duration-700 ease-in-out delay-[450ms]`}>l</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full'} transition-all duration-700 ease-in-out delay-[500ms]`}>l</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-full'} transition-all duration-700 ease-in-out delay-[550ms]`}>e</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full'} transition-all duration-700 ease-in-out delay-[600ms]`}>r</div>
                <div className={`${animate ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-full'} transition-all duration-700 ease-in-out delay-[650ms]`}>y</div>
            </div>
        </div>
    )
}