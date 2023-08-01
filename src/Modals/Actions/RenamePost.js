import React from 'react'

const RenamePost = () => {
  return (
    <form onSubmit={deletePostHandler} >
      <h3>Are you sure you want to sign out?</h3>
      <div className={classes['button-row']}>
        <Button type="submit" className={classes.formButton}>Yes</Button>
        <Button onClick={props.onClose} className={classes.formButton}>No</Button>
      </div>
    </form>
  )
}

export default RenamePost