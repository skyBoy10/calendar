'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./calendar.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_PureComponent) {
    _inherits(Calendar, _PureComponent);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _initialiseProps.call(_this);

        var headers = _this.props.headers;

        var current = new Date();
        _this.state = {
            currentDate: current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate(),
            headers: headers ? headers : ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        };
        return _this;
    }

    /** 
     * 获取当前月份天数
    */


    /** 
     * 获取该月份第一天周几
    */


    /** 
     * 获取上一个月日期信息
    */


    /** 
     * 获取下一个月日期信息
    */


    /** 
     * 初始化日历
    */


    /** 
     * 单元格点击回调
    */


    /** 
     * 日期变化回调
    */


    _createClass(Calendar, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                headers = _state.headers,
                currentDate = _state.currentDate;

            var list = this.initCalendarData();

            return _react2.default.createElement(
                'div',
                { className: 'calendar' },
                _react2.default.createElement(
                    'div',
                    { className: 'calRow calhead cal-0 leftBorder' },
                    headers.map(function (item) {
                        return _react2.default.createElement(
                            'span',
                            { key: item, className: 'cell' },
                            item
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'calRow cal-1 leftBorder' },
                    list.map(function (item) {
                        return _react2.default.createElement(
                            'span',
                            { key: item.date,
                                onClick: _this2.onClickCell.bind(_this2, item),
                                className: item.isCurrent ? item.date == currentDate ? 'cell item active' : 'cell item enabled' : 'cell item disabled' },
                            _react2.default.createElement(
                                'div',
                                null,
                                item.value
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Calendar;
}(_react.PureComponent);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getMonthDays = function (paDate) {
        var currentDate = paDate ? new Date(paDate) : new Date();
        var month = currentDate.getMonth();

        currentDate.setMonth(month + 1);
        currentDate.setDate(0);

        return currentDate.getDate();
    };

    this.getFirstDayOfWeek = function (paDate) {
        var temp = paDate ? new Date(paDate) : new Date();
        temp.setDate(1);

        return temp.getDay();
    };

    this.getPreMonth = function (paDate) {
        var date = paDate ? new Date(paDate) : new Date();
        var month = date.getMonth();
        var year = date.getFullYear();
        if (month === 0) {
            var temp = new Date(year - 1, 12, 0);
            return {
                date: year - 1 + '-12',
                days: temp.getDate()
            };
        }

        date.setDate(0);
        return {
            date: year + '-' + month,
            days: date.getDate()
        };
    };

    this.getNextMonth = function (paDate) {
        var date = paDate ? new Date(paDate) : new Date();
        var month = date.getMonth();

        if (month === 11) {
            return {
                date: date.getFullYear() + 1 + '-1'
            };
        }

        return {
            date: date.getFullYear() + '-' + (month + 2)
        };
    };

    this.initCalendarData = function () {
        var _props = _this3.props,
            date = _props.date,
            list = _props.list;

        var firstDay = _this3.getFirstDayOfWeek(date);
        var days = _this3.getMonthDays(date);
        var preMonInfo = _this3.getPreMonth(date);
        var nextMonInfo = _this3.getNextMonth(date);
        var current = date ? new Date(date) : new Date();
        var result = [];

        for (var i = 1; i <= 42; i += 1) {
            if (i <= firstDay % 7) {
                var temp = preMonInfo.days - (firstDay % 7 - i);
                result.push({
                    date: preMonInfo.date + '-' + temp,
                    value: temp
                });
                continue;
            }

            if (i > days + firstDay % 7) {
                var next = i - (days + firstDay % 7);
                result.push({
                    date: nextMonInfo.date + '-' + next,
                    value: next
                });
                continue;
            }

            var currentDate = i - firstDay % 7;
            result.push({
                isCurrent: true,
                date: current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + currentDate,
                value: currentDate
            });
        }

        return result;
    };

    this.onClickCell = function (item) {
        if (item && item.isCurrent) {
            var clickCallback = _this3.props.clickCallback;

            _this3.setState({ currentDate: item.date });
            if (clickCallback && typeof clickCallback === 'function') {
                clickCallback(item);
            }
        }
    };

    this.onDateChange = function () {
        var dateChange = _this3.props.dateChange;


        if (dateChange && typeof dateChange === 'function') {
            dateChange();
        }
    };
};

exports.default = Calendar;