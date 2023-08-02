import DeletePost from "./DeletePost"
import RenamePost from "./RenamePost";
import ReportPost from "./ReportPost";
import Modal from "../Modal"
import { auth } from "../../firebase";


const ActionModal = (props) => {

  let form = <></>;

  switch (props.option) {
    case 'RENAME':
      form = <RenamePost 
      src={props.src} 
      title={props.title} 
      user={auth.currentUser} 
      creatorId={props.creatorId} 
      postId={props.postId}
      onClose={props.onClose}
      />
      break;
    case 'REPORT':
      form = <ReportPost 
      postId={props.postId}
      user={auth.currentUser} 
      creatorId={props.creatorId}
      createdBy={props.createdBy}
      src={props.src} 
      title={props.title} 
      onClose={props.onClose}
      />
      break;
    case 'DELETE':
      form = <DeletePost
      user={auth.currentUser}
      creatorId={props.creatorId}
      postId={props.postId}
      onClose={props.onClose}
         />
      break;
    default:
      props.onClose();
}
  

  return (
    <Modal onClose={props.onClose}>
      {form}
    </Modal>
  )
}

export default ActionModal