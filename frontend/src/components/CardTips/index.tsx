import IconLogo from "../Icons/Logo"

const CardTip = ({ content }: { content: string }) => {
    return (
        <div className="tips__card card">
            <div className="card__container">
                <IconLogo />
                <p>{content}</p>
            </div>
        </div>
    )
}

export default CardTip
