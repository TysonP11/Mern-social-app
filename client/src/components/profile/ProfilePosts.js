import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../Posts/PostItem';

const Posts = ({ posts }) => {
  return (
    <Fragment>
      <div className='posts__photos'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(null, {})(Posts);
