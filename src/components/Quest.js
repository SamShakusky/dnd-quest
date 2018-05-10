import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
        <button className="quest-edit" onClick={this.onEdit}>edit</button>
        <h3 className="quest-title">{title}</h3>
        <p className="quest-description">{description}</p>
        <p className="quest-goal">{goal}</p>
      </div>
    );
  }
}
