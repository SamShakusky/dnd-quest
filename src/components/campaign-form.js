import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import TextField from './TextField';
import Button from './Button';

import '../css/form.css';

const hiddenSubmit = {
  pointerEvents : 'none',
  opacity       : 0
};

const memberShape = {
  username : PropTypes.string,
  id       : PropTypes.string,
};

export default class CampaignForm extends PureComponent {
  static propTypes = {
    title    : PropTypes.string.isRequired,
    members  : PropTypes.arrayOf(PropTypes.shape(memberShape)),
    editing  : PropTypes.string,
    onSubmit : PropTypes.func.isRequired,
    onChange : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired,
    onClose  : PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    editing : '',
    members : []
  };
  
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
  }
  
  get items() {
    const { members } = this.props;
    return (
      members.map((item, i) => (
        <div
          styleName="member"
          key={members[i].id} // eslint-disable-line react/no-array-index-key
        >
          {members[i].username}
        </div>
      ))
    );
  }
  
  render() {
    const {
      title,
      members,
      editing,
      onSubmit,
      onChange,
      onDelete,
      onClose,
    } = this.props;
    
    return (
      <Formsy onValidSubmit={onSubmit} styleName="quest-form">
        <div styleName="form-wrap">
          <div styleName="form_buttons">
            {(editing ?
              <Button icon="delete_outline" iconSize={24} shape="flat" duty="danger" onClick={onDelete} sharp noActive />
              :
              <Button icon="close" iconSize={24} shape="flat" duty="danger" onClick={onClose} sharp noActive />
            )}
          </div>
          <p styleName="form-label">Main</p>
          <TextField label="Title" name="title" value={title} onChange={onChange} required />
          <p styleName="form-label">Members</p>
          <div styleName="members">
            {members && this.items}
            <Button
              label="Add Item"
              shape="flat"
              duty="success"
              size="sm"
              // onClick={addItem}
            />
          </div>
        </div>
        <button ref={this.submitRef} style={hiddenSubmit} />
      </Formsy>
    );
  }
}
