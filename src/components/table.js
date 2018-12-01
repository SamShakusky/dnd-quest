import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TableUi from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import '../css/table.css';

export default class Table extends PureComponent {
  static propTypes = {
    data : PropTypes.arrayOf(PropTypes.shape({})),
  };
  
  static defaultProps = {
    data : null,
  }
  
  getTable = () => {
    const { data } = this.props;
    if (!data) return false;
    
    const titles = Object.keys(data[0]);
    
    return (
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
          { data.map((row, rowIndex) => (
            <TableRow key={row.id}>
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
    );
  }
  
  render() {
    return (
      this.getTable()
    );
  }
}
