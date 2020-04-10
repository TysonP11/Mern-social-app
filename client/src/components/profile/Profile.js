import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { getPostsById } from '../../actions/post';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfilePosts from './ProfilePosts';

const Profile = ({
  match,
  auth,
  getProfileById,
  getPostsById,
  profile: { profile, loading },
  post: { posts },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getPostsById(match.params.id);
  }, [getProfileById, getPostsById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          <ProfilePosts posts={posts} />
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPostsById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getProfileById, getPostsById })(
  Profile
);
