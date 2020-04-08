import React, { Fragment } from 'react';
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
    <div className='posts__photo'>
      <img src={avatar} alt='' />
      <Link to={`/profile/${user}`}>
        <strong>{name} </strong>
      </Link>
      <span>{text}</span>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      <div className='posts__photo-overlay'>
        <span className='overlay__item'>
          <button type='button' onClick={(e) => addLike(_id)}>
            <i className='fas fa-heart'></i>
            <span>{likes.length}</span>
          </button>
        </span>
        <span className='overlay__item'>
          <button type='button' onClick={(e) => removeLike(_id)}>
            <i className='fas fa-heart-broken'></i>
          </button>
        </span>
        <span className='overlay__item'>
          <Link to={`/post/${_id}`}>
            <button type='button'>
              <i className='fas fa-comment'></i>
              <span>{comments.length}</span>
            </button>
          </Link>
        </span>
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
