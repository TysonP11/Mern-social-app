import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
}) => {
  return (
    <div className='posts__photo_single'>
      <img src={avatar} alt='' />
      <div>
        <button
          onClick={(e) => addLike(_id)}
          type='button'
          className='btn btn-primary'
        >
          <i className='fas fa-thumbs-up'></i>
          {likes.length > 0 && <span> {likes.length}</span>}
        </button>
        <button
          onClick={(e) => removeLike(_id)}
          type='button'
          className='btn btn-dark'
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
      </div>
      <div className='post__info'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='' />
          </Link>
        </div>
        <div>
          <Link to={`/profile/${user}`}>
            <strong>{name} </strong>
          </Link>
          <span>{text}</span>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>{' '}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

PostItem.defaultProps = {
  //showActions: true
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
