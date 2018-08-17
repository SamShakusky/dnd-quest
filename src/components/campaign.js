import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import '../css/campaign.css';

export default class Campaign extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    description : PropTypes.string,
    id          : PropTypes.string.isRequired,
    onEdit      : PropTypes.func.isRequired
  };

  static defaultProps = {
    description : '',
  };
  
  onEdit = (e) => {
    e.preventDefault();
    
    this.props.onEdit(this.props.id);
  }
  
  render() {
    const {
      title,
      description,
    } = this.props;
    
    return (
      <a href="/" styleName="campaign__card">
        <h3>{title}</h3>
        <p>{description}</p>
        <Button
          label="edit"
          size="sm"
          shape="flat"
          onClick={this.onEdit}
        />
      </a>
    );
  }
}
