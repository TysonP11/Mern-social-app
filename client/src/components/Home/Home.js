import React, { Fragment } from 'react';
import FollowedByMeList from './FollowedByMeList';
import Map from './Map';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = ({ post: { posts } }) => {
  var markers = posts;
  function addMarkers(map, links) {
    links.forEach((link, index) => {
      const coords = { lat: link.lat, lng: link.lng };

      new window.google.maps.Marker({
        map,
        position: coords,
        label: `${index + 1}`,
        title: link.title,
      });
    });
  }

  var mapProps = {
    options: { center: { lat: 21.0278, lng: 105.8342 }, zoom: 13 },
    onMount: addMarkers,
    onMountProps: markers,
  };

  return (
    <Fragment>
      <div className='homepage'>
        <div>
          <Map {...mapProps} />
        </div>
        <div>
          <FollowedByMeList />
        </div>
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {})(Home);
