import React from 'react';
import PropTypes from 'prop-types';

import '../css/link.css';

const Link = props => (
  <a
    href={props.href}
    onClick={props.onClick}
    styleName="link"
  >
    {props.text}
  </a>
);

Link.propTypes = {
  href    : PropTypes.string,
  onClick : PropTypes.func,
  text    : PropTypes.node.isRequired,
};

Link.defaultProps = {
  href    : '',
  onClick : null,
};

export default Link;
