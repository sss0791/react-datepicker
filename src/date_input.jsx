var React = require('react/addons');
var DateUtil = require('./util/date');
var moment = require('moment');
var assign = require('react/lib/Object.assign');

var DateInput = React.createClass({

  getDefaultProps: function() {
    return {
      dateFormat: 'YYYY-MM-DD',
      input: 'input'
    };
  },

  getInitialState: function() {
    return {
      value: this.safeDateFormat(this.props.date)
    };
  },

  componentDidMount: function() {
    this.toggleFocus(this.props.focus);
  },

  componentWillReceiveProps: function(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: this.safeDateFormat(newProps.date)
    });
  },

  toggleFocus: function(focus) {
    if (focus) {
      React.findDOMNode(this.refs.input).focus();
    } else {
      React.findDOMNode(this.refs.input).blur();
    }
  },

  handleChange: function(event) {
    var date = moment(event.target.value, this.props.dateFormat, true);

    this.setState({
      value: event.target.value
    });

    if (this.isValueAValidDate()) {
      this.props.setSelected(new DateUtil(date));
    }
  },

  safeDateFormat: function(date) {
    return !! date ? date.format(this.props.dateFormat) : null;
  },

  isValueAValidDate: function() {
    var date = moment(event.target.value, this.props.dateFormat, true);

    return date.isValid();
  },

  handleKeyDown: function(event) {
    switch(event.key) {
    case "Enter":
      event.preventDefault();
      this.props.handleEnter();
      break;
    }
  },

  handleClick: function(event) {
    this.props.handleClick(event);
  },

  render: function() {
    return React.createElement(this.props.input, assign({
        ref: "input",
        type: "text",
        value: this.state.value,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        onFocus: this.props.onFocus,
        onChange: this.handleChange,
        className: "datepicker__input",
        placeholder: this.props.placeholderText
      }, this.props.inputProps));
  }
});

module.exports = DateInput;
