import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBar from './app-bar';
import Table from './table';
import Button from './button';

import styles from '../css/admin-panel.css';

import {
  getUsers,
  getCampaigns,
  getParties,
  setTester,
  removeTesters,
} from '../actions/admin-actions';

class Admin extends PureComponent {
  static propTypes = {
    tableData     : PropTypes.arrayOf(PropTypes.shape({})),
    getUsers      : PropTypes.func.isRequired,
    getCampaigns  : PropTypes.func.isRequired,
    getParties    : PropTypes.func.isRequired,
    setTester     : PropTypes.func.isRequired,
    removeTesters : PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    tableData : null,
  }
  
  state = {
    value      : 'users',
    currentRow : {
      id     : null,
      tester : false,
    },
  };
  
  componentDidMount() {
    document.title = 'Admin – Adventure Companion';
    this.props.getUsers();
  }

  setTester = () => {
    const { currentRow } = this.state;
    
    this.props.setTester(currentRow.id, !currentRow.tester);
    this.setState({
      currentRow : {
        ...currentRow,
        tester : !currentRow.tester,
      },
    });
  }

  getRowData = (row) => {
    this.setState({
      currentRow : row,
    });
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
    const { value, currentRow } = this.state;
    const { tableData } = this.props;
    
    const id = currentRow.id || null;
    const status = (typeof currentRow.tester === 'boolean') ?
      currentRow.tester.toString()
      :
      null;
    
    return (
      <main styleName="admin" >
        <section>
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
          <div>
            <Table
              data={tableData}
              getRowData={this.getRowData}
            />
          </div>
        </section>
        <section styleName="admin__actions">
          <h3>Actions</h3>
          { value === 'parties' &&
            <div>
              <p>ID: <span>{id}</span></p>
              <p>Status: <span>{status}</span></p>
              <Button
                label="Change Status"
                onClick={this.setTester}
              />
              <Button
                label="Remove Testers"
                onClick={this.props.removeTesters}
                duty="danger"
              />
            </div>
           }
        </section>
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
  setTester,
  removeTesters,
})(Admin);
