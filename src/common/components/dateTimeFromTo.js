import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from "react-native-modal-datetime-picker";

import moment from 'moment';

import { stylesCalendar } from '../styles/common';

class DatePickerFromTo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFromVisible: false,
            dateFromValue: '',

            dateToVisible: false,
            dateToValue: '',
            // flag
            checkFromTo: false,
            selectedDateFrom: new Date(),
            selectedDateTo: new Date()
        };
        // Data transmission to screen
        this._checkdateFromTo(this.state.dateFromValue, this.state.dateToValue, 'viewConstructor');
    };

    formatDatetime = (date, type) => {
        if (!!date) {
            date = moment(date);
            switch (type) {
                case 'date':
                    return date.format('YYYY/MM/DD');
                    break;
                case 'datetime':
                    return date.format('YYYY/MM/DD HH MM ss');
                    break;
                case 'time':
                    return date.format('HH MM ss');
                    break;
                default:
                    return date.format('YYYY/MM/DD');
            }
        }
    }

    // From
    showDateTimeFrom = () => {
        
        this.setState({ 
            dateFromVisible: true 
        });
    };
    hideDateTimeFrom = () => {
        this.setState({ dateFromVisible: false });
    };
    handleDateTimeFrom = date => {
        const newDate = new Date(date);
        this.setState({
            selectedDateFrom: newDate,
            dateFromValue: this.formatDatetime(date, this.props.mode)
        });
        // Data transmission to screen
        this._checkdateFromTo(this.state.dateFromValue, this.state.dateToValue);
        // 
        this.hideDateTimeFrom();
    };

    // To
    showDateTimeTo = () => {
        
        this.setState({ 
            dateToVisible: true 
        });
    };
    hideDateTimeTo = () => {
        this.setState({ dateToVisible: false });
    };
    handleDateTimeTo = date => {
        const newDate = new Date(date);
        this.setState({
            selectedDateTo: newDate,
            dateToValue: this.formatDatetime(date, this.props.mode)
        });
        // Data transmission to screen
        this._checkdateFromTo(this.state.dateFromValue, this.state.dateToValue);
        // 
        this.hideDateTimeTo();
    };
    // check date from date to
    _checkdateFromTo(dateFrom, dateTo, view = '') {
        // replace
        let checkFrom = dateFrom ? dateFrom.replace(/\//g, '') : dateFrom;
        let checkTo = dateTo ? dateTo.replace(/\//g, '') : dateTo;
        // check view defaul or change
        if (view == '' && checkFrom != '' && checkTo != '') {
            if (checkFrom > checkTo) {
                // Data transmission to screen
                this.props.onChangeDate(dateFrom, dateTo, false);
                // set check error date from to => Ok
                this.setState({ checkFromTo: true });
            } else {
                // Data transmission to screen
                this.props.onChangeDate(dateFrom, dateTo, true);
                // set check error date from to => error
                this.setState({ checkFromTo: false });
            }
        } else {
            // Data transmission to screen
            this.props.onChangeDate(dateFrom, dateTo, true);
        }
        // 
        // this.props.onChangeDate(dateFrom, dateTo, this.state.checkFromTo);
    }
    // 
    _requiredDateFromTo() {
        if (this.state.checkFromTo) {
            return (
                <View style={stylesCalendar.container}>
                    <Text style={{ color: '#f00', fontSize: 12, marginTop:-12 }}>End date must be greater than Start date</Text>
                </View>
            )
        }
    }
    // listen props parent change
    componentWillReceiveProps(props) {
        this.setState({
            dateFromValue: props.dateFromRefer,
            dateToValue: props.dateToRefer,
        });
    }
    render() {
        var propsFrom = {
            confirmTextStyle: this.props.confirmTextFromStyle,
            datePickerModeAndroid: this.props.datePickerModeAndroid,
            mode: this.props.mode || 'date',
            isVisible: this.state.dateFromVisible,
            onConfirm: this.props.handleDateTimeFrom || this.handleDateTimeFrom,
            onCancel: this.props.hideDateTimeFrom || this.hideDateTimeFrom,
            onHideAfterConfirm: this.props.onHideAfterConfirmFrom,
            titleStyle: this.props.titleFromStyle,
            minimumDate: this.props.minimumDateFrom,
            maximumDate: this.props.maximumDateFrom,
            is24Hour: this.props.is24Hour,

            date: this.props.dateFromRefer ? new Date(this.props.dateFromRefer) : this.state.selectedDateFrom, /*ANS848 - TriVH - 20191024*/

            titleIOS: this.props.titleFromIOS,
            customCancelButtonIOS: this.props.customCancelButtonFromIOS,
            customConfirmButtonIOS: this.props.customConfirmButtonFromIOS,
            neverDisableConfirmIOS: this.props.neverDisableConfirmFromIOS,
            customTitleContainerIOS: this.props.customTitleFromContainerIOS,
            customDatePickerIOS: this.props.customDatePickerFromIOS,
            datePickerContainerStyleIOS: this.props.datePickerFromContainerStyleIOS,
            reactNativeModalPropsIOS: this.props.reactNativeModalPropsFromIOS,
            confirmTextIOS: this.props.confirmTextFromIOS,
            cancelTextIOS: this.props.cancelTextFromIOS,
            cancelTextStyle: this.props.cancelTextFromStyle,
        };
        var propsTo = {
            confirmTextStyle: this.props.confirmTextToStyle,
            datePickerModeAndroid: this.props.datePickerModeAndroid,
            mode: this.props.mode || 'date',
            isVisible: this.state.dateToVisible,
            onConfirm: this.props.handleDateTimeTo || this.handleDateTimeTo,
            onCancel: this.props.hideDateTimeTo || this.hideDateTimeTo,
            onHideAfterConfirm: this.props.onHideAfterConfirmTo,
            titleStyle: this.props.titleToStyle,
            minimumDate: this.props.minimumDateTo,
            maximumDate: this.props.maximumDateTo,
            is24Hour: this.props.is24Hour,

            date: this.props.dateToRefer ? new Date(this.props.dateToRefer) : this.state.selectedDateTo, /*ANS848 - TriVH - 20191024*/

            titleIOS: this.props.titleToIOS,
            customCancelButtonIOS: this.props.customCancelButtonToIOS,
            customConfirmButtonIOS: this.props.customConfirmButtonToIOS,
            neverDisableConfirmIOS: this.props.neverDisableConfirmToIOS,
            customTitleContainerIOS: this.props.customTitleToContainerIOS,
            customDatePickerIOS: this.props.customDatePickerToIOS,
            datePickerContainerStyleIOS: this.props.datePickerToContainerStyleIOS,
            reactNativeModalPropsIOS: this.props.reactNativeModalPropsToIOS,
            confirmTextIOS: this.props.confirmTextToIOS,
            cancelTextIOS: this.props.cancelTextToIOS,
            cancelTextStyle: this.props.cancelTextToStyle,
        };
        return (
            <View>
                <View style={stylesCalendar.container}>
                    {/******* From *******/}
                    <View style={stylesCalendar.components}>
                        <Text style={stylesCalendar.label}>{this.props.labelFrom || 'Start date'} {this.props.required ? <Text style={{color: '#f00'}}>*</Text> : ''}</Text>
                        <TouchableOpacity
                            onPress={this.showDateTimeFrom}>
                            <View style={stylesCalendar.touchable}>
                                <View style={stylesCalendar.calendar}>
                                    <Icon
                                        name='calendar'
                                        type='font-awesome'
                                        size={16}
                                        color='#6c757d'
                                    />
                                </View>
                                <View style={stylesCalendar.viewText}>
                                    <Text>{this.props.dateFromRefer || this.state.dateFromValue}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker {...propsFrom} />
                    </View>

                    {/******* To *******/}
                    <View style={stylesCalendar.components}>
                        <Text style={stylesCalendar.label}>{this.props.labelTo || 'End date'} {this.props.required ? <Text style={{color: '#f00'}}>*</Text> : ''}</Text>
                        <TouchableOpacity
                            onPress={this.showDateTimeTo}>
                            <View style={stylesCalendar.touchable}>
                                <View style={stylesCalendar.calendar}>
                                    <Icon
                                        name='calendar'
                                        type='font-awesome'
                                        size={16}
                                        color='#6c757d'
                                    />
                                </View>
                                <View style={stylesCalendar.viewText}>
                                    <Text>{this.props.dateToRefer || this.state.dateToValue}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker {...propsTo} />
                    </View>
                </View>
                {/* required */}
                {this._requiredDateFromTo()}
            </View>
        );
    }
}

export default DatePickerFromTo;