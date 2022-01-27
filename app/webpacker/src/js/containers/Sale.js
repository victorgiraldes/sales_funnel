import React from "react"
import { connect } from "react-redux"
import Modal from "../components/Modal"
import { invokeModal } from "../actions"

const Sale = (props) => {
  <Modal
    props={props.sale}
  />
}

const mapSaleStateToProps = ({modal}) => (
  {
    sale: {
      product: modal.product,
      customer: modal.customer,
      amount: modal.amount,
      stages: modal.stages
    }
  }
)

const mapSaleDispatchsToProps = dispatch => (
  {
    onClickCard: () => dispatch(invokeModal()),
  }
)

export default connect(
  mapSaleStateToProps,
  mapSaleDispatchsToProps
)(React.memo(Sale))
