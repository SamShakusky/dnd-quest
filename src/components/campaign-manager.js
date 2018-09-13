import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SlidingPanel from './sliding-panel';
import FloatingButton from './floating-button';
import AppBar from './app-bar';
import CampaignList from './campaign-list';
import CampaignForm from './campaign-form';

import '../css/campaign.css';

import {
  readCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign
} from '../actions/campaign-actions';

const scrollMap = {
  true  : 'hidden',
  false : 'auto'
};

class CampaignManager extends PureComponent {
  static propTypes = {
    campaigns      : PropTypes.arrayOf(PropTypes.shape({})),
    createCampaign : PropTypes.func.isRequired,
    readCampaigns  : PropTypes.func.isRequired,
    updateCampaign : PropTypes.func.isRequired,
    deleteCampaign : PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    campaigns : [],
  };
  
  constructor(props) {
    super(props);
    
    this.state = {
      title       : '',
      membersFull : [],
      editing     : '',
    };
    
    this.formRef = React.createRef();
  }
  
  componentDidMount() {
    this.props.readCampaigns();
  }
  
  onChange = (event) => {
    const { target } = event;
    const { name } = target;
    
    this.setState({
      [name] : target.value
    });
  }
  
  onSubmit = () => {
    const {
      title,
      editing,
    } = this.state;
    
    const { campaigns } = this.props;
    
    const campaign = {
      title,
      id : editing || null,
    };
    
    if (editing) {
      this.props.updateCampaign(campaign, campaigns);
    } else {
      this.props.createCampaign(campaign);
    }
    this.closeForm();
  }
  
  onEdit = (id) => {
    const data = this.props.campaigns.find(x => x.id === id);
    
    this.setState({
      title       : data.title,
      membersFull : data.membersFull,
      editing     : id,
    });
    this.openForm();
  }
  
  deleteCampaign = (event) => {
    if (event) event.preventDefault();
    const { editing } = this.state;
    const { campaigns } = this.props;
    
    this.props.deleteCampaign(editing, campaigns);
    this.closeForm();
  }
  
  openForm = () => {
    this.setState({
      formVisibility : true
    }, this.toggleScroll(true));
  }
  
  closeForm = () => {
    let inputs;
    
    if (this.state.editing !== null) {
      inputs = {
        title       : '',
        description : '',
        editing     : ''
      };
    }
    this.setState({
      formVisibility : false,
      ...inputs
    }, this.toggleScroll(false));
  }
  
  toggleScroll = (bool) => {
    document.body.style.overflow = scrollMap[bool];
  }
  
  fabSubmit = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this.formRef.current.submitRef.current);
    node.click();
  }
  
  render() {
    const { formVisibility } = this.state;
    
    return (
      <main styleName="campaign__page" >
        <AppBar title="Campaigns" />
        <SlidingPanel
          isShown={this.state.formVisibility}
          onClose={this.closeForm}
          side="right"
        >
          <CampaignForm
            title={this.state.title}
            members={this.state.membersFull}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onDelete={this.deleteCampaign}
            onClose={this.closeForm}
            editing={this.state.editing}
            ref={this.formRef}
          />
        </SlidingPanel>
        <CampaignList
          items={this.props.campaigns}
          onEdit={this.onEdit}
        />
        {
          formVisibility && <FloatingButton
            onClick={this.fabSubmit}
            icon="save"
          />
        }
        {
          !formVisibility && <FloatingButton
            onClick={this.openForm}
            icon="add"
          />
        }
      </main>
    );
  }
}

const mapStateToProps = state => ({
  campaigns : state.campaigns.items
});

export default connect(mapStateToProps, {
  readCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign
})(CampaignManager);
