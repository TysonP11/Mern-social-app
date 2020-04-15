import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { follow, unFollow } from '../../actions/profile';
import { connect } from 'react-redux';

const ProfileTop = ({
  profile: {
    website,
    social,
    user: { name, avatar },
    _id,
    followers,
  },
  auth,
  already,
  unFollow,
  follow,
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <span>{name} </span>
      <span>
        {!auth.loading &&
          followers.map((follower) =>
            follower.user === auth.user._id ? (already = true) : already
          )}
        {!already ? (
          <button
            onClick={(e) => follow(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up'> </i>
            Follow
          </button>
        ) : (
          <button
            onClick={(e) => unFollow(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down'></i>
            Unfollow
          </button>
        )}
      </span>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}

        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x' />
          </a>
        )}

        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x' />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x' />
          </a>
        )}
        {social && social.youtube && (
          <Link to={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x' />
          </Link>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x' />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.defaultProps = {
  already: false,
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired,
};

export default connect(null, { follow, unFollow })(ProfileTop);
