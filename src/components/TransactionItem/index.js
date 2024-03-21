import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deletedItem} = props
  const {title, amount, id, amountType} = transactionDetails

  const onClickDelete = () => {
    deletedItem(id)
  }
  return (
    <li className="history-list-item">
      <p className="transaction-title">{title}</p>
      <p className="transaction">Rs {amount}</p>

      <p className="transaction">{amountType}</p>
      <button
        type="button"
        data-testid="delete"
        className="delete-button"
        onClick={onClickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
