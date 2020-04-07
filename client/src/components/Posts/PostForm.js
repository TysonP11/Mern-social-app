import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Redirect } from 'react-router-dom';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState({});

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Write a Review</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text, photo });
          setText('');
          setPhoto({});
          return <Redirect to='/posts' />;
        }}
      >
        <div className='preview-containter'>
          <div className='preview'>
            <label>Photo</label>
            <input
              type='file'
              name='photo'
              //value={photo}
              className='filepond'
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Say something'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
