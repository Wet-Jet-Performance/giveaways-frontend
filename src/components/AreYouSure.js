import { useRef } from "react";

const AreYouSure = ({areYouSureDialogRef, itemType, itemId, itemName, deleteItemCallback, callbackArgs}) => {

  
  const submitForm = (event) => {
    areYouSureDialogRef.current.close();
    if (callbackArgs) {
      deleteItemCallback(event, true, ...callbackArgs)
    } else {
      deleteItemCallback(event, true)
    }
  }

  return (
    <dialog ref={areYouSureDialogRef}>
      <header> Are You Sure? </header>
      <form method='dialog' onSubmit={submitForm}>
        <p> Do you really want to delete {itemType} #{itemId} - {itemName}?</p>
        <div className='dialog-buttons'>
          <button className='dialog-button' type='button' onClick={() => areYouSureDialogRef.current.close()}>No</button>
          <button className='dialog-button' type='submit'>Yes, Delete {itemType}</button>
        </div>
      </form>
    </dialog>
  )
}

export default AreYouSure;
