import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { follow, unFollow } from '../../actions/profile';
import { connect } from 'react-redux';

import { getMorePostsById, removePostById } from '../../actions/post';

const ProfileItem = ({
  profile: { user, followers, _id },
  follow,
  unFollow,
  auth,
  already,
  showActions,
  showPosts,
  getMorePostsById,
  removePostById,
}) => {
  const [showing, toggleShowing] = useState(false);

  console.log(user)

  return (
    <div className='profile bg-light'>
      <Link to={`/profile/${user._id}`}>
        <img className='round-img' src={user.avatar} alt='' />
      </Link>
      <div>
        <strong>{user.name}</strong>
        <p> {followers.length} follwers </p>
        {showActions && (
          <Fragment>
            <p>
              <Link to={`/profile/${user._id}`} className='btn btn-primary'>
                View Profile
              </Link>
              {!auth.loading &&
                followers.map((follower) =>
                  follower.user === auth.user._id ? (already = true) : already
                )}
              {!already ? (
                <button
                  onClick={(e) => follow(_id)}
                  type='button'
                  className='btn btn-primary'
                >
                  <i className='fas fa-thumbs-up'></i>
                  Follow
                </button>
              ) : (
                <button
                  onClick={(e) => unFollow(_id)}
                  type='button'
                  className='btn btn-primary'
                >
                  <i className='fas fa-thumbs-down'></i>
                  Unfollow
                </button>
              )}
            </p>
          </Fragment>
        )}
      </div>

      {showPosts &&
        (!showing ? (
          <Fragment>
            <button
              onClick={(e) => {
                getMorePostsById(user._id);
                toggleShowing(!showing);
              }}
              type='button'
              className='btn btn-primary'
            >
              See places
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button
              onClick={(e) => {
                removePostById(user._id);
                toggleShowing(!showing);
              }}
              type='button'
              className='btn btn-primary'
            >
              Unsee places
            </button>
          </Fragment>
        ))}
    </div>
  );
};

ProfileItem.defaultProps = {
  already: false,
  showActions: true,
  showPosts: true,
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  unFollow: PropTypes.func.isRequired,
  getMorePostsById: PropTypes.func.isRequired,
  already: PropTypes.bool,
  showActions: PropTypes.bool,
  removePostById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  follow,
  unFollow,
  getMorePostsById,
  removePostById,
})(withRouter(ProfileItem));
