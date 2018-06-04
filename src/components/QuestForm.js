import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';
import TextField from './TextField';
import Button from './Button';

import '../css/QuestForm.css';

const hiddenSubmit = {
  pointerEvents : 'none',
  opacity       : 0
};

export default class QuestForm extends PureComponent {
  static propTypes = {
    title         : PropTypes.string.isRequired,
    description   : PropTypes.string,
    goal          : PropTypes.string,
    reward        : PropTypes.shape({}),
    editing       : PropTypes.string,
    onSubmit      : PropTypes.func.isRequired,
    onChange      : PropTypes.func.isRequired,
    onChangeCoins : PropTypes.func.isRequired,
    onChangeItems : PropTypes.func.isRequired,
    onDelete      : PropTypes.func.isRequired,
    onClose       : PropTypes.func.isRequired,
    addItem       : PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    description : '',
    goal        : '',
    reward      : {},
    editing     : ''
  };
  
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
  }
  
  getItems = () => {
    const { reward, onChangeItems } = this.props;
    
    return (
      reward.items.map((item, i) => (
        <TextField
          key={i} // eslint-disable-line react/no-array-index-key
          label={`Item ${i + 1}`}
          name={`item_${i + 1}`}
          value={reward.items[i]}
          onChange={e => onChangeItems(e, i)}
        />
      ))
    );
  }
  
  render() {
    const {
      title,
      description,
      goal,
      reward,
      editing,
      onSubmit,
      onChange,
      onChangeCoins,
      onDelete,
      onClose,
      addItem,
    } = this.props;
    
    return (
      <Formsy onValidSubmit={onSubmit} styleName="quest-form">
        <div styleName="form-wrap">
          <div styleName="form_buttons">
            {(editing ?
              <Button icon="delete_outline" shape="flat" duty="danger" onClick={onDelete} sharp noActive />
              :
              <Button icon="close" shape="flat" duty="danger" onClick={onClose} sharp noActive />
            )}
          </div>
          <p styleName="form-label">Main</p>
          <TextField label="Title" name="title" value={title} onChange={onChange} required />
          <TextField label="Goal" name="goal" value={goal} onChange={onChange} />
          <TextField fieldType="textarea" label="Description" name="description" value={description} onChange={onChange} />
          <p styleName="form-label">Rewards</p>
          <div styleName="rewards">
            <div styleName="coins">
              <TextField label="Gold" name="gold" type="number" value={reward.gold} onChange={onChangeCoins} />
              <TextField label="Silver" name="silver" type="number" value={reward.silver} onChange={onChangeCoins} />
              <TextField label="Copper" name="copper" type="number" value={reward.copper} onChange={onChangeCoins} />
            </div>
            {reward.items && this.getItems()}
            <Button
              label="Add Item"
              shape="flat"
              duty="success"
              size="sm"
              onClick={addItem}
            />
          </div>
        </div>
        <button ref={this.submitRef} style={hiddenSubmit} />
      </Formsy>
    );
  }
}
