import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBar from './app-bar';
import Table from './table';

import styles from '../css/admin-panel.css';

import {
  getUsers,
  getCampaigns,
  getParties,
} from '../actions/admin-actions';

class Admin extends PureComponent {
  static propTypes = {
    tableData    : PropTypes.arrayOf(PropTypes.shape({})),
    getUsers     : PropTypes.func.isRequired,
    getCampaigns : PropTypes.func.isRequired,
    getParties   : PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    tableData : null,
  }
  
  state = {
    value : 'users',
  };
  
  componentDidMount() {
    document.title = 'Admin – Adventure Companion';
    this.props.getUsers();
  }

  handleChange = (event, value) => {
    if (value === 'users') {
      this.props.getUsers();
    }
    if (value === 'campaigns') {
      this.props.getCampaigns();
    }
    if (value === 'parties') {
      this.props.getParties();
    }
    this.setState({ value });
  };
  
  render() {
    const { value } = this.state;
    const { tableData } = this.props;
    
    return (
      <main styleName="admin" >
        <AppBar title="Admin Panel" />
        <div styleName="tabs-panel">
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{ indicator : styles['tabs-indicator'] }}
          >
            <Tab value="users" disableRipple label="Users" />
            <Tab value="campaigns" disableRipple label="Campaigns" />
            <Tab value="parties" disableRipple label="Parties" />
          </Tabs>
        </div>
        <div styleName="table">
          <Table data={tableData} />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  tableData : state.admin.tableData
});

export default connect(mapStateToProps, {
  getUsers,
  getCampaigns,
  getParties,
})(Admin);
