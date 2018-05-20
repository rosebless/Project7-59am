import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import AddEmp from './AddEmp'; 
import Button from '@material-ui/core/Button'
import SearchEmp from './SearchEmp';
import './styles/ManageEmp.css';

const ManageEmp = ({ lng }) => (
  <div className="manage-emp-root">
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          <SearchEmp {...props} lng={lng} />
        )}
      />
      <Route
        path="/add-employee"
        render={props => (
          <AddEmp {...props} lng={lng} />
        )}
      />
    </Switch>
  </div> 
);

ManageEmp.propTypes = {
  lnt: PropTypes.oneOf(['en', 'th']),
};

ManageEmp.defaultProps = {
  lnt: 'en',
};

export default ManageEmp;
