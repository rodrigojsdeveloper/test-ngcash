import { ITransactionRequest } from '../../interfaces/transactions'
import { Transaction } from '../../entities/transactions'
import { AppDataSource } from '../../data-source'
import { Account } from '../../entities/accounts'
import { User } from '../../entities/users'
import { AppError } from '../../errors'


const createTransactionService = async (debitedId: string, { value, username }: ITransactionRequest): Promise<Transaction> => {

    const transactionsRepository = AppDataSource.getRepository(Transaction)

    const accountRepository = AppDataSource.getRepository(Account)

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({ username })

    if(!user) {

        throw new AppError('User not found', 404)
    }

    const accountDebited = await accountRepository.findOneBy({ id: debitedId })

    const accountCredited = await accountRepository.findOneBy({ id: user.accountId.id })

    if(value > Number(accountDebited?.balance)) {

        throw new AppError('insufficient debt')
    }

    accountCredited!.balance = accountCredited!.balance + value
    accountDebited!.balance = accountDebited!.balance - value

    await accountRepository.save(accountCredited!)
    await accountRepository.save(accountDebited!)

    const transaction = new Transaction()
    transaction.creditedAccountId = accountCredited!.id
    transaction.debitedAccountId = debitedId
    transaction.value = value

    transactionsRepository.create(transaction)
    await transactionsRepository.save(transaction)

    return transaction
}

export { createTransactionService }