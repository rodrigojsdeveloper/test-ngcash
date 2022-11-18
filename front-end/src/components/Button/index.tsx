import { Container } from "./style"
import React, { MouseEventHandler } from "react"


interface IButtonProps {
    children: React.ReactNode
    onClick?: MouseEventHandler
    disabled?: boolean | undefined
    type?: "button" | "submit" | "reset" | undefined
    buttonStyle: 'register' | 'home'
}

const Button = ({ children, onClick, type, disabled, buttonStyle }: IButtonProps) => {

    return (
        <Container buttonStyle={ buttonStyle } onClick={ onClick } type={ type } disabled={ disabled }>
            { children }
        </Container>
    )
}

export { Button }
