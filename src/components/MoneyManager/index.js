import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,

    title: '',
    amount: '',
    activeType: transactionTypeOptions[0].optionId,
    transactionHistory: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  renderTitle = () => {
    const {title} = this.state
    return (
      <div className="input-card">
        <label htmlFor="title" className="label">
          TITLE
        </label>
        <input
          type="text"
          placeholder="TITLE"
          className="input-element"
          value={title}
          onChange={this.onChangeTitle}
          id="title"
        />
      </div>
    )
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  renderAmount = () => {
    const {amount} = this.state
    return (
      <div className="input-card">
        <label htmlFor="amount" className="label">
          AMOUNT
        </label>
        <input
          type="text"
          placeholder="AMOUNT"
          className="input-element"
          value={amount}
          onChange={this.onChangeAmount}
          id="amount"
        />
      </div>
    )
  }

  onChangeType = event => {
    this.setState({activeType: event.target.value})
  }

  renderType = () => {
    const {activeType} = this.state
    return (
      <div className="input-card">
        <label htmlFor="type" className="label">
          TYPE
        </label>
        <select
          onChange={this.onChangeType}
          id="type"
          value={activeType}
          className="input-element"
        >
          {transactionTypeOptions.map(eachItem => (
            <option key={eachItem.optionId} value={eachItem.optionId}>
              {eachItem.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, activeType, income, expenses} = this.state

    if (activeType === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
      }))
    }

    const moneyType = transactionTypeOptions.find(
      eachAmount => eachAmount.optionId === activeType,
    )

    const amountType = moneyType.displayText

    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      isFavorite: false,
      amountType,
      activeType,
      income,
      expenses,
    }
    this.setState(prevState => ({
      transactionHistory: [...prevState.transactionHistory, newTransaction],
      title: '',
      amount: '',
      activeType: transactionTypeOptions[0].optionId,
    }))
  }

  deletedItem = id => {
    const {transactionHistory} = this.state
    this.setState(prevState => ({
      transactionHistory: prevState.transactionHistory.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    }))

    const deletedMoneyType = transactionHistory.find(
      eachAmount => eachAmount.id === id,
    )

    const deletedAmountType = deletedMoneyType.activeType
    const deletedAmount = deletedMoneyType.amount

    if (deletedAmountType === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income - parseInt(deletedAmount),
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses - parseInt(deletedAmount),
      }))
    }
  }

  render() {
    const {income, expenses, transactionHistory} = this.state
    const balance = income - expenses

    return (
      <div className="main-container">
        <div className="heading-card">
          <h1 className="heading">Hi, Richard</h1>
          <p className="paragraph">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <MoneyDetails income={income} expenses={expenses} balance={balance} />
        <div className="form-history-card">
          <form className="form-card" onSubmit={this.onAddTransaction}>
            <h1 className="transaction-h1">Add Transaction</h1>
            <div>{this.renderTitle()}</div>
            <div>{this.renderAmount()}</div>
            <div>{this.renderType()}</div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <ul className="ordered-history">
            <h1 className="transaction-h1">History</h1>
            <li className="history-list">
              <p className="title">Title</p>
              <p className="title">Amount</p>
              <p className="title">Type</p>
            </li>
            <ul className="un-ordered-history">
              {transactionHistory.map(eachHistory => (
                <TransactionItem
                  transactionDetails={eachHistory}
                  key={eachHistory.id}
                  deletedItem={this.deletedItem}
                />
              ))}
            </ul>
          </ul>
        </div>
      </div>
    )
  }
}
export default MoneyManager
