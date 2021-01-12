import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
const Photos = ({ isAuthenticated, user }) => {
  return (
    <div className=''>
      <Navbar />
    </div>
  );
};

Photos.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});
export default connect(mapStateToProps)(Photos);
