import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TableUi from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import '../css/table.css';

export default class Table extends PureComponent {
  static propTypes = {
    data       : PropTypes.arrayOf(PropTypes.shape({})),
    getRowData : PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    data : null,
  }
  
  state = {
    page        : 0,
    rowsPerPage : 25,
  }
  
  getTable = () => {
    const { data } = this.props;
    const { page, rowsPerPage } = this.state;
    
    if (!data) return false;
    
    const titles = Object.keys(data[0]);
    
    return (
      <React.Fragment>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100, 500]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label' : 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label' : 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          styleName="table__pagination"
        />
        <TableUi styleName="table">
          <TableHead>
            <TableRow>
              <TableCell key="row-index" />
              { titles.map(title => (
                <TableCell key={title} >{title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { data
              .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow key={row.id} onClick={() => this.handleRowClick(row)}>
                  {/* eslint-disable react/no-array-index-key */}
                  <TableCell key={`cell-${rowIndex}`}>{rowIndex + 1}</TableCell>
                  {Object.values(row).map((value, i) => {
                    let newValue = value;
                    if (typeof value === 'boolean') {
                      newValue = +value;
                    }
                    if (Array.isArray(value)) {
                      newValue = value.map(arrayVal => (
                        <p>{arrayVal}</p>
                      ));
                    }
                    
                    const key = `${Object.keys(row)[i]}-${newValue}`;
                    
                    return (<TableCell key={key} >{newValue}</TableCell>);
                  })}
                </TableRow>
            ))}
          </TableBody>
        </TableUi>
      </React.Fragment>
    );
  }
  
  handleRowClick = (row) => {
    this.props.getRowData(row);
  }
  
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage : event.target.value });
  };
  
  render() {
    return (
      this.getTable()
    );
  }
}
