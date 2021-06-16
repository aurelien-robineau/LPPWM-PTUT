import CardTip from "../CardTips"

const ConsumpIdeas = () => {
    const cards = [
        {
            id: 1,
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita incidunt repellendus dolor vel dolorem animi amet dolores.",
        },
        {
            id: 2,
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita incidunt repellendus dolor vel dolorem animi amet dolores.",
        },
        {
            id: 3,
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita incidunt repellendus dolor vel dolorem animi amet dolores.",
        },
        {
            id: 4,
            content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius expedita incidunt repellendus dolor vel dolorem animi amet dolores.",
        },
    ]

    return (
        <section className="tips">
            <div className="tips__container">
                <h2>Mes astuces</h2>
                <div className="tips__cards">
                    {cards.map(({ content, id }) => (
                        <CardTip key={id.toString()} content={content} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ConsumpIdeas
