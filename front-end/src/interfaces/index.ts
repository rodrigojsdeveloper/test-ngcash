import { Dispatch, MouseEventHandler, SetStateAction } from 'react'


export interface ITransactionProp {
    id: string
    value: number
    createdAt: string
}

export interface IAccountProp {
    id: string
    value: number
    createdAt: string
    creditedTransaction: ITransactionProp[]
    debitedTransaction: ITransactionProp[]
}

export interface IUserProp {
    id: string
    username: string
    password: string
    accountId: IAccountProp
}

export interface IFormProps {
    apiProp: string,
    historyProp: string
    titleProp: string
    textProp: string
    linkProp: string
    authentication: boolean
    setAuthentication: Dispatch<SetStateAction<boolean>>
}

export interface IButtonProps {
    children: React.ReactNode
    onClick?: MouseEventHandler
    disabled?: boolean | undefined
    type?: 'button' | 'submit' | 'reset' | undefined
    buttonStyle: 'register' | 'home'
}

export interface ISingup {
    authentication: boolean
    setAuthentication: Dispatch<SetStateAction<boolean>>
}

export interface IHome {
    setAuthentication: Dispatch<SetStateAction<boolean>>
}
