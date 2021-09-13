import { cardStyles } from "./card.styles"

type CardProp = { children: React.ReactNode }
const Card = ({ children }: CardProp) =>{

    const {card} = cardStyles;
    return(
        <section role="card" className={card}>{children}</section>
    )
}

export default Card