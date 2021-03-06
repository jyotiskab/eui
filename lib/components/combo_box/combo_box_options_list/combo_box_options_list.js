'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiComboBoxOptionsList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _code = require('../../code');

var _flex = require('../../flex');

var _highlight = require('../../highlight');

var _panel = require('../../panel');

var _text = require('../../text');

var _loading = require('../../loading');

var _combo_box_option = require('./combo_box_option');

var _combo_box_title = require('./combo_box_title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var positionToClassNameMap = {
  top: 'euiComboBoxOptionsList--top',
  bottom: 'euiComboBoxOptionsList--bottom'
};

var POSITIONS = Object.keys(positionToClassNameMap);

var EuiComboBoxOptionsList = exports.EuiComboBoxOptionsList = function (_Component) {
  _inherits(EuiComboBoxOptionsList, _Component);

  function EuiComboBoxOptionsList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiComboBoxOptionsList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiComboBoxOptionsList.__proto__ || Object.getPrototypeOf(EuiComboBoxOptionsList)).call.apply(_ref, [this].concat(args))), _this), _this.updatePosition = function () {
      // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
      requestAnimationFrame(function () {
        _this.props.updatePosition(_this.list.getBoundingClientRect());
      });
    }, _this.listRef = function (node) {
      _this.props.listRef(node);
      _this.list = node;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiComboBoxOptionsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Wait a frame, otherwise moving focus from one combo box to another will result in the class
      // being removed from the body.
      requestAnimationFrame(function () {
        document.body.classList.add('euiBody-hasPortalContent');
      });
      this.updatePosition();
      window.addEventListener('resize', this.updatePosition);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var options = nextProps.options,
          selectedOptions = nextProps.selectedOptions,
          searchValue = nextProps.searchValue;

      // We don't compare matchingOptions because that will result in a loop.

      if (searchValue !== this.props.searchValue || options !== this.props.options || selectedOptions !== this.props.selectedOptions) {
        this.updatePosition();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.classList.remove('euiBody-hasPortalContent');
      window.removeEventListener('resize', this.updatePosition);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          isLoading = _props.isLoading,
          selectedOptions = _props.selectedOptions,
          onCreateOption = _props.onCreateOption,
          searchValue = _props.searchValue,
          matchingOptions = _props.matchingOptions,
          optionToGroupMap = _props.optionToGroupMap,
          optionRef = _props.optionRef,
          onOptionClick = _props.onOptionClick,
          onOptionEnterKey = _props.onOptionEnterKey,
          areAllOptionsSelected = _props.areAllOptionsSelected,
          getSelectedOptionForSearchValue = _props.getSelectedOptionForSearchValue,
          position = _props.position,
          renderOption = _props.renderOption,
          listRef = _props.listRef,
          updatePosition = _props.updatePosition,
          rest = _objectWithoutProperties(_props, ['options', 'isLoading', 'selectedOptions', 'onCreateOption', 'searchValue', 'matchingOptions', 'optionToGroupMap', 'optionRef', 'onOptionClick', 'onOptionEnterKey', 'areAllOptionsSelected', 'getSelectedOptionForSearchValue', 'position', 'renderOption', 'listRef', 'updatePosition']);

      var emptyStateContent = void 0;

      if (isLoading) {
        emptyStateContent = _react2.default.createElement(
          _flex.EuiFlexGroup,
          { gutterSize: 's', justifyContent: 'center' },
          _react2.default.createElement(
            _flex.EuiFlexItem,
            { grow: false },
            _react2.default.createElement(_loading.EuiLoadingSpinner, { size: 'm' })
          ),
          _react2.default.createElement(
            _flex.EuiFlexItem,
            { grow: false },
            'Loading options'
          )
        );
      } else if (searchValue && matchingOptions.length === 0) {
        if (onCreateOption) {
          var selectedOptionForValue = getSelectedOptionForSearchValue(searchValue, selectedOptions);
          if (selectedOptionForValue) {
            // Disallow duplicate custom options.
            emptyStateContent = _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'strong',
                null,
                selectedOptionForValue.value
              ),
              ' has already been added'
            );
          } else {
            emptyStateContent = _react2.default.createElement(
              'p',
              null,
              'Hit ',
              _react2.default.createElement(
                _code.EuiCode,
                null,
                'ENTER'
              ),
              ' to add ',
              _react2.default.createElement(
                'strong',
                null,
                searchValue
              ),
              ' as a custom option'
            );
          }
        } else {
          emptyStateContent = _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'strong',
              null,
              searchValue
            ),
            ' doesn\u2019t match any options'
          );
        }
      } else if (!options.length) {
        emptyStateContent = _react2.default.createElement(
          'p',
          null,
          'There aren\u2019t any options available'
        );
      } else if (areAllOptionsSelected) {
        emptyStateContent = _react2.default.createElement(
          'p',
          null,
          'You\u2019ve selected all available options'
        );
      }

      var emptyState = emptyStateContent ? _react2.default.createElement(
        _text.EuiText,
        { size: 'xs', className: 'euiComboBoxOptionsList__empty' },
        emptyStateContent
      ) : undefined;

      var groupLabelToGroupMap = {};
      var optionsList = [];

      matchingOptions.forEach(function (option, index) {
        var value = option.value,
            label = option.label,
            rest = _objectWithoutProperties(option, ['value', 'label']);

        var group = optionToGroupMap.get(option);

        if (group && !groupLabelToGroupMap[group.label]) {
          groupLabelToGroupMap[group.label] = true;
          optionsList.push(_react2.default.createElement(
            _combo_box_title.EuiComboBoxTitle,
            { key: 'group-' + group.label },
            group.label
          ));
        }

        var renderedOption = _react2.default.createElement(
          _combo_box_option.EuiComboBoxOption,
          _extends({
            option: option,
            key: option.label.toLowerCase(),
            onClick: onOptionClick,
            onEnterKey: onOptionEnterKey,
            optionRef: optionRef.bind(_this2, index)
          }, rest),
          renderOption ? renderOption(option, searchValue) : _react2.default.createElement(
            _highlight.EuiHighlight,
            { search: searchValue },
            label
          )
        );

        optionsList.push(renderedOption);
      });

      var classes = (0, _classnames2.default)('euiComboBoxOptionsList', positionToClassNameMap[position]);

      return _react2.default.createElement(
        _panel.EuiPanel,
        _extends({
          paddingSize: 'none',
          className: classes,
          'data-test-subj': 'comboBoxOptionsList',
          panelRef: this.listRef
        }, rest),
        _react2.default.createElement(
          'div',
          { className: 'euiComboBoxOptionsList__rowWrap' },
          emptyState || optionsList
        )
      );
    }
  }]);

  return EuiComboBoxOptionsList;
}(_react.Component);

EuiComboBoxOptionsList.propTypes = {
  options: _propTypes2.default.array,
  isLoading: _propTypes2.default.bool,
  selectedOptions: _propTypes2.default.array,
  onCreateOption: _propTypes2.default.func,
  searchValue: _propTypes2.default.string,
  matchingOptions: _propTypes2.default.array,
  optionToGroupMap: _propTypes2.default.object,
  optionRef: _propTypes2.default.func,
  onOptionClick: _propTypes2.default.func,
  onOptionEnterKey: _propTypes2.default.func,
  areAllOptionsSelected: _propTypes2.default.bool,
  getSelectedOptionForSearchValue: _propTypes2.default.func,
  updatePosition: _propTypes2.default.func.isRequired,
  position: _propTypes2.default.oneOf(POSITIONS),
  listRef: _propTypes2.default.func.isRequired,
  renderOption: _propTypes2.default.func
};
EuiComboBoxOptionsList.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiComboBoxOptionsList',
  'methods': [{
    'name': 'updatePosition',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'listRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'node',
      'type': null
    }],
    'returns': null
  }],
  'props': {
    'options': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': ''
    },
    'isLoading': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'selectedOptions': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': ''
    },
    'onCreateOption': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'searchValue': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'matchingOptions': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': ''
    },
    'optionToGroupMap': {
      'type': {
        'name': 'object'
      },
      'required': false,
      'description': ''
    },
    'optionRef': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'onOptionClick': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'onOptionEnterKey': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'areAllOptionsSelected': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'getSelectedOptionForSearchValue': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'updatePosition': {
      'type': {
        'name': 'func'
      },
      'required': true,
      'description': ''
    },
    'position': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"top"',
          'computed': false
        }, {
          'value': '"bottom"',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    },
    'listRef': {
      'type': {
        'name': 'func'
      },
      'required': true,
      'description': ''
    },
    'renderOption': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    }
  }
}];