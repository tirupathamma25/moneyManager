import './index.css'

const MoneyDetails = props => {
  const {income, expenses, balance} = props
  return (
    <ul className="un-ordered-money-details">
      <li className="balance list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="icon"
        />
        <div>
          <p className="balance-text">Your Balance</p>
          <p className="balance-in-rupee" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </li>
      <li className="income list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="icon"
        />
        <div>
          <p className="balance-text">Your Income</p>
          <p className="balance-in-rupee" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </li>
      <li className="expenses list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="icon"
        />
        <div>
          <p className="balance-text">Your Expenses</p>
          <p className="balance-in-rupee" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </li>
    </ul>
  )
}

export default MoneyDetails
