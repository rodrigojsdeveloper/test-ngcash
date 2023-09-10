import { TransactionContext } from "../../contexts/transaction.context";
import { FormTransaction } from "../../components/FormTransaction";
import React, { useContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Transaction } from "../../components/Transaction";
import { ITransactionProps } from "../../interfaces";
import logout from "../../assets/outline-logout.svg";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { Container } from "./style";

const Dashboard = () => {
  const {
    token,
    transactions,
    setTransactions,
    transactionsCashIn,
    setTransactionsCashIn,
    transactionsCashOut,
    setTransactionsCashOut,
    transactionsDate,
    setTransactionsDate,
    transactionsBoolean,
    setTransactionsBoolean,
    transactionsCashInBoolean,
    setTransactionsCashInBoolean,
    transactionsCashOutBoolean,
    setTransactionsCashOutBoolean,
    transactionsDateBoolean,
    setTransactionsDateBoolean,
  } = useContext(TransactionContext);

  const navigate = useNavigate();

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        api
          .get(`/accounts/${res.data.accountId.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => setBalance(res.data.balance))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [token]);

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet title="Dashboard | NG.CASH" />
      </HelmetProvider>
      <Container>
        <div>
          <img
            src={logout}
            alt="log out"
            onClick={() => {
              toast.success("Check back often!");

              navigate("/signin");

              sessionStorage.removeItem("Project NG.CASH: token");
            }}
          />
          <h1>BALANCE</h1>
          <p>$ {balance.toFixed(2)}</p>
          <h2>CASH OUT</h2>

          <FormTransaction />
        </div>

        <main>
          <h2>All transactions</h2>
          <h3>Cash-in, cash-out and date transactions</h3>

          <menu>
            {transactionsBoolean &&
              transactions.map((transaction: ITransactionProps) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            {transactionsCashInBoolean &&
              transactionsCashIn.map((transaction: ITransactionProps) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            {transactionsCashOutBoolean &&
              transactionsCashOut.map((transaction: ITransactionProps) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            {transactionsDateBoolean &&
              transactionsDate.map((transaction: ITransactionProps) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
          </menu>

          <div>
            <Button
              buttonStyle="dashboard"
              onClick={() => {
                setTransactionsBoolean(true);
                setTransactionsCashInBoolean(false);
                setTransactionsCashOutBoolean(false);
                setTransactionsDateBoolean(false);

                api
                  .get("/transactions", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => setTransactions(res.data))
                  .catch((err) => console.error(err));
              }}
            >
              Todos
            </Button>

            <Button
              buttonStyle="dashboard"
              onClick={() => {
                setTransactionsBoolean(false);
                setTransactionsCashInBoolean(true);
                setTransactionsCashOutBoolean(false);
                setTransactionsDateBoolean(false);

                api
                  .get("/transactions/cash-in", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => setTransactionsCashIn(res.data))
                  .catch((_) =>
                    toast.error("transaction does not exist or not found")
                  );
              }}
            >
              Cash in
            </Button>

            <Button
              buttonStyle="dashboard"
              onClick={() => {
                setTransactionsBoolean(false);
                setTransactionsCashInBoolean(false);
                setTransactionsCashOutBoolean(true);
                setTransactionsDateBoolean(false);

                api
                  .get("/transactions/cash-out", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => setTransactionsCashOut(res.data))
                  .catch((_) =>
                    toast.error("transaction does not exist or not found")
                  );
              }}
            >
              Cash out
            </Button>

            <input
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTransactionsBoolean(false);
                setTransactionsCashInBoolean(false);
                setTransactionsCashOutBoolean(false);
                setTransactionsDateBoolean(true);

                api
                  .get(`/transactions/${e.target.value}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => setTransactionsDate(res.data))
                  .catch((_) =>
                    toast.error("transaction does not exist or not found")
                  );
              }}
            />
          </div>
        </main>
      </Container>
    </React.Fragment>
  );
};

export { Dashboard };