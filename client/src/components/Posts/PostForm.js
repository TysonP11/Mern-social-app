import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    text: '',
    address: '',
    lat: 10,
    lng: 10,
  });

  const { text, address } = formData;

  const onSubmit = (e) => {
    e.preventDefault(e);
    addPost(formData, history);
  };

  return (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Write a Review</h3>
        </div>
        <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              name='address'
              value={address}
              placeholder='Address'
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></input>
          </div>

          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Say something'
            value={text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
