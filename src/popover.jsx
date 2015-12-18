import React from "react";
import ReactDOM from "react-dom";

var Popover = React.createClass({
  displayName: "Popover",

  propTypes: {
    attachment: React.PropTypes.string,
    targetAttachment: React.PropTypes.string,
    targetOffset: React.PropTypes.string,
    anchor: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      attachment: "top left",
      constraints: [
        {
          to: "window",
          attachment: "together"
        }
      ],
      targetAttachment: "bottom left",
      targetOffset: "10px 0"
    };
  },

  componentWillMount() {
    var popoverContainer = document.createElement("span");
    popoverContainer.className = "datepicker__container";

    this._popoverElement = popoverContainer;

    document.querySelector("body").appendChild(this._popoverElement);
  },

  componentDidMount() {
    this._renderPopover();
  },

  componentDidUpdate() {
    this._renderPopover();
  },

  _popoverComponent() {
    var className = this.props.className;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  },

  _getAnchorElement() {
    if(!this.props.anchor){
      return this.refs.span.parentElement.querySelector("input");
    }
    else if(typeof(this.props.anchor) === 'function'){
      return this.props.anchor();
    }
    else {
      return this.props.anchor;
    }
  },

  _tetherOptions() {
    return {
      element: this._popoverElement,
      target: this._getAnchorElement(),
      attachment: this.props.attachment,
      targetAttachment: this.props.targetAttachment,
      targetOffset: this.props.targetOffset,
      optimizations: {
        moveElement: false // Always moves to <body> anyway!
      },
      constraints: this.props.constraints
    };
  },

  _renderPopover() {
    ReactDOM.render(this._popoverComponent(), this._popoverElement);

    if (this._tether != null) {
      this._tether.setOptions(this._tetherOptions());
    } else if (window && document) {
      var Tether = require("tether");
      this._tether = new Tether(this._tetherOptions());
    }
  },

  componentWillUnmount() {
    this._tether.destroy();
    ReactDOM.unmountComponentAtNode(this._popoverElement);
    if (this._popoverElement.parentNode) {
      this._popoverElement.parentNode.removeChild(this._popoverElement);
    }
  },

  render() {
    return <span ref="span"/>;
  }
});

module.exports = Popover;
