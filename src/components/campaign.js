import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';

import {
  setCampaign,
} from '../actions/campaign-actions';

import '../css/campaign.css';

class Campaign extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    id          : PropTypes.string.isRequired,
    onEdit      : PropTypes.func.isRequired,
    setCampaign : PropTypes.func.isRequired,
  };
  
  onEdit = (e) => {
    e.preventDefault();
    
    this.props.onEdit(this.props.id);
  }
  
  onClick = (e) => {
    e.preventDefault();
    const campaignId = e.currentTarget.pathname.substring(1);
    
    this.props.setCampaign(campaignId);
  }
  
  render() {
    const {
      title,
      id
    } = this.props;
    
    return (
      <div styleName="campaign__card">
        <a onClick={this.onClick} href={`${id}`}>{title}</a>
        <Button
          label="edit"
          size="sm"
          shape="flat"
          onClick={this.onEdit}
        />
      </div>
    );
  }
}

export default connect(null, { setCampaign })(Campaign);
