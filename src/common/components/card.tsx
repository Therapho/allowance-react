type CardProp = { children: React.ReactNode }
const Card = ({ children }: CardProp) =>{

    return(
        <div className='card'>{children}</div>
    )
}
export default Card