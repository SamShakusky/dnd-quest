import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import AppBar from './app-bar';
import Table from './table';
import Button from './button';
import TextField from './text-field';

import styles from '../css/admin-panel.css';

import {
  getUsers,
  getCampaigns,
  getParties,
  setTester,
  setManyTesters,
  removeTesters,
  createAdventures,
} from '../actions/admin-actions';

class Admin extends PureComponent {
  static propTypes = {
    tableData        : PropTypes.arrayOf(PropTypes.shape({})),
    log              : PropTypes.arrayOf(PropTypes.string),
    getUsers         : PropTypes.func.isRequired,
    getCampaigns     : PropTypes.func.isRequired,
    getParties       : PropTypes.func.isRequired,
    setTester        : PropTypes.func.isRequired,
    setManyTesters   : PropTypes.func.isRequired,
    removeTesters    : PropTypes.func.isRequired,
    createAdventures : PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    tableData : null,
    log       : [],
  }
  
  state = {
    value      : 'users',
    amount     : 10,
    currentRow : {
      id     : null,
      tester : false,
    },
    filterTesters : false,
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

  handleFilter = () => {
    const { filterTesters } = this.state;
    
    this.props.getParties(!filterTesters);
    this.setState({ filterTesters : !filterTesters });
  }

  handleAmount = (event) => {
    const { target } = event;
    const { name } = target;
    
    this.setState({
      [name] : target.value
    });
  }
  
  handleTesters = (data) => {
    this.props.setManyTesters(+data.amount);
  }

  render() {
    const { value, currentRow, amount } = this.state;
    const { tableData, log } = this.props;
    
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
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={this.handleFilter}
                    />
                  }
                  label="Filter by Testers"
                />
              </FormGroup>
              <Button
                label="Change Status"
                onClick={this.setTester}
              />
              <Button
                label="Remove Testers"
                onClick={this.props.removeTesters}
                duty="danger"
              />
              <Formsy styleName="random" onSubmit={this.handleTesters}>
                <TextField type="number" name="amount" value={amount} onChange={this.handleAmount} />
                <Button
                  label="Random"
                  type="submit"
                />
              </Formsy>
              <Button
                label="Create Adventures"
                onClick={this.props.createAdventures}
              />
              <p>New Adventurers: <span>{log[0]}</span></p>
              <p>New Campaigns: <span>{log[1]}</span></p>
              <p>New Errors: <span>{log[2]}</span></p>
            </div>
           }
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  tableData : state.admin.tableData,
  log       : state.admin.log,
});

export default connect(mapStateToProps, {
  getUsers,
  getCampaigns,
  getParties,
  setTester,
  setManyTesters,
  removeTesters,
  createAdventures,
})(Admin);
