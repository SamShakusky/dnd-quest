import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class Quest extends PureComponent {
  static propTypes = {
    title       : PropTypes.string.isRequired,
    description : PropTypes.string,
    goal        : PropTypes.string.isRequired,
    id          : PropTypes.string.isRequired,
    onEdit      : PropTypes.func.isRequired
  };

  static defaultProps = {
    description : ''
  };
  
  onEdit = () => {
    this.props.onEdit(this.props.id);
  }

  render() {
    const { title, description, goal } = this.props;

    return (
      <div className="quest">
        <Button
          className="quest-edit"
          label="edit"
          size="sm"
          shape="flat"
          onClick={this.onEdit}
        />
        <h3 className="quest-title">{title}</h3>
        <p className="quest-description">{description}</p>
        <p className="quest-goal">{goal}</p>
      </div>
    );
  }
}
