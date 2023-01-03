import { accountRepository } from "../repositories/account.repository";
import { NotFoundError } from "../errors/notFound.error";

class AccountsServices {
  async specific(id: string): Promise<{ balance: number }> {
    const account = await accountRepository.findOneBy({ id });

    if (!account) {
      throw new NotFoundError("Account");
    }

    return { balance: account!.balance };
  }
}

export { AccountsServices };
