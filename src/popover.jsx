var React = require('react/addons');
var Tether = require('../node_modules/tether/tether.js');

var Popover = React.createClass({
  displayName: 'Popover',

  componentWillMount: function() {
    var popoverContainer = document.createElement('span');
    popoverContainer.className = 'datepicker__container';

    this._popoverElement = popoverContainer;

    document.querySelector('body').appendChild(this._popoverElement);
  },

  componentDidMount: function() {
    this._renderPopover();
  },

  componentDidUpdate: function() {
    this._renderPopover();
  },

  _popoverComponent: function() {
    var className = this.props.className;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  },

  _getAnchorElement: function(){
    if(!this.props.anchor){
      return React.findDOMNode(this).parentElement;
    }
    else if(typeof(this.props.anchor) === 'function'){
      return this.props.anchor();
    }
    else {
      return this.props.anchor;
    }
  },

  _tetherOptions: function() {
    return {
      element: this._popoverElement,
      target: this._getAnchorElement(),
      attachment: 'top left',
      targetAttachment: 'bottom left',
      targetOffset: '10px 0',
      optimizations: {
        moveElement: false // always moves to <body> anyway!
      }
    };
  },

  _renderPopover: function() {
    React.render(this._popoverComponent(), this._popoverElement);

    if (this._tether != null) {
      this._tether.setOptions(this._tetherOptions());
    } else {
      this._tether = new Tether(this._tetherOptions());
    }
  },

  componentWillUnmount: function() {
    this._tether.destroy();
    React.unmountComponentAtNode(this._popoverElement);
    if (this._popoverElement.parentNode) {
      this._popoverElement.parentNode.removeChild(this._popoverElement);
    }
  },

  render: function() {
    return <span/>;
  }
});

module.exports = Popover;
