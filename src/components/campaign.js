import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from './button';

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
    ownerId     : PropTypes.string.isRequired,
    userId      : PropTypes.string.isRequired,
    history     : PropTypes.shape({
      push : PropTypes.func.isRequired,
    }).isRequired,
  };
  
  onEdit = (e) => {
    e.preventDefault();
    
    this.props.onEdit(this.props.id);
  }
  
  onClick = (e) => {
    e.preventDefault();
    const campaignId = e.currentTarget.pathname.substring(1);
    
    this.props.setCampaign(campaignId);
    this.props.history.push('/manager');
  }
  
  render() {
    const {
      title,
      id,
      ownerId,
      userId,
    } = this.props;
    
    return (
      <div styleName="campaign__card">
        <a onClick={this.onClick} href={`${id}`}>{title}</a>
        { userId === ownerId &&
          <Button
            label="edit"
            size="sm"
            shape="flat"
            onClick={this.onEdit}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId : state.user.credentials.userId,
});

export default withRouter(connect(mapStateToProps, { setCampaign })(Campaign));
