import { useEffect } from "react"

const ProgressRing = ({
    radius,
    stroke,
    progress,
}: {
    radius: number
    stroke: number
    progress: number
}) => {
    let normalizedRadius = 0
    let circumference = 0
    let strokeDashoffset = 0
    useEffect(() => {
        normalizedRadius = radius - stroke * 2
        console.log({ normalizedRadius })
        circumference = normalizedRadius * 2 * Math.PI
        strokeDashoffset = circumference - (progress / 100) * circumference
    }, [])

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="white"
                fill="transparent"
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    )
}

export default ProgressRing
