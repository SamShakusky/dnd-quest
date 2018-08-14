import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import Button from './Button';

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
  
  onEdit = () => {
    this.props.onEdit(this.props.id);
  }
  
  render() {
    const {
      title,
      description,
    } = this.props;
    
    return (
      // <div styleName="campaign">
      //   <div styleName="campaign-edit">
      //     <Button
      //       label="edit"
      //       size="sm"
      //       shape="flat"
      //       onClick={this.onEdit}
      //     />
      //   </div>
      //   <h3 styleName="campaign-title">{title}</h3>
      //   <p styleName="campaign-description">{description}</p>
      // </div>
      <a href="/" styleName="campaign__card">
        <h3>{title}</h3>
        <p>{description}</p>
      </a>
    );
  }
}
