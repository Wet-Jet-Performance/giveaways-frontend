import { useRef, useState } from 'react';

const AddPhotoForm = ({ addPhotoFormRef, updatedGiveawayData, createPhotoCallback }) => {

  const [newPhoto, setNewPhoto] = useState('');
  const photoUploadRef = useRef(null);

  const updateForm = (event) => {
    setNewPhoto(event.target.files[0])
  }

  const submitForm = (event) => {
    createPhotoCallback(newPhoto, updatedGiveawayData.id);
    setNewPhoto('');
    photoUploadRef.current.value = null;
  }

  const resetAndCloseForm = () => {
    addPhotoFormRef.current.close()
    setNewPhoto('');
    photoUploadRef.current.value = null;
  }


  return (
    <dialog ref={addPhotoFormRef}>
      <button className='close-dialog' type='button' onClick={resetAndCloseForm}>x</button>
      <header>Add Photo</header>
      <form method='dialog' onSubmit={submitForm}>
        <label htmlFor='giveaway_photos'> Upload Photo </label>
        <p> Note: Photos must be 10mb or smaller. </p>
        <input type='file' id='giveaway_photos' name='giveaway_photos' accept='image/*' onChange={updateForm} ref={photoUploadRef} />
        <button className='dialog-button' type='submit'>Submit</button>
      </form>
    </dialog>

  );
};

export default AddPhotoForm;