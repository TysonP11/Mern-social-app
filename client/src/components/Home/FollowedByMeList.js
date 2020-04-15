import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFollowedProfiles } from '../../actions/profile';
import ProfileItem from '../profiles/ProfileItem';

const FollowedByMeList = ({
  profile: { profiles, loading },
  getFollowedProfiles,
}) => {
  useEffect(() => {
    getFollowedProfiles();
  }, [getFollowedProfiles]);

  return (
    <Fragment>
      {profiles === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>
            <p className='lead'>Click on profile to see their post</p>
          </div>

          <div className='profiles'>
            {profiles === null || loading ? (
              <Spinner />
            ) : profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem
                  key={profile._id}
                  profile={profile}
                  showActions={false}
                />
              ))
            ) : (
              <h4>No profiles found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

FollowedByMeList.propTypes = {
  profile: PropTypes.object.isRequired,
  getFollowedProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getFollowedProfiles })(
  FollowedByMeList
);
