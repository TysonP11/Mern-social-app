import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { follow, unFollow } from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileItem = ({
  profile: { user, followers, _id },
  follow,
  unFollow,
  auth,
  already,
}) => {
  return (
    <div className='profile bg-light'>
      <img src={user.avatar} alt='' className='round-img' />
      <div>
        <strong>{user.name}</strong>
        <span> {followers.length} follwers </span>
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
      </div>
    </div>
  );
};

ProfileItem.defaultProps = {
  already: false,
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  unFollow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { follow, unFollow })(
  withRouter(ProfileItem)
);
