import ProgressRing from "./ProgressRing"
import { useState, useEffect } from "react"

const TrackerSvg = () => {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(progress + 10)
            if (progress >= 100) clearInterval(interval)
        }, 1000)
    }, [])
    return (
        <div>
            Tracker Version svg
            <ProgressRing radius={60} stroke={4} progress={progress} />
        </div>
    )
}

export default TrackerSvg
