import DeletePost from "./DeletePost"
import Modal from "../Modal"

const ActionModal = (props) => {
  
  return (
    <Modal onClose={props.onClose}>
      <DeletePost onClose={props.onClose}/>
    </Modal>
  )
}

export default ActionModal