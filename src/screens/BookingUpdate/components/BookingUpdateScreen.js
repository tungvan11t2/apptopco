import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Alert, TouchableHighlight, TextInput } from 'react-native';
import moment from 'moment';
import { FlatGrid } from 'react-native-super-grid';
import { Icon } from 'react-native-elements';
import styles from '../stylesheet/BookingUpdateScreen';
import { stylesCommon } from '../../../common/styles/common'
import { TextInputCommon, ButtonCommon, SelectCommon } from '../../../common/components/common';
import DatePickerFromTo from '../../../common/components/dateTimeFromTo';
import { Row } from 'native-base';
import { getStorage } from '../../../common/storage';
import { getDataSelect, getPosition, saveBookingUpdate } from '../../../common/api/listInfo';
import { NavigationActions } from "react-navigation";
console.disableYellowBox = true;
var position_list = [""];
var cancelled_list = [""];
var flagBookedClick = 0;
var flagBookedNumber = 0;
var old_branch = '-1';
var old_room = '-1';
var booking_cd = 0;
class BookingUpdateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            phoneNumber: '',
            address: '',
            sumAmount: 0,
            number: '',
            booking_cd: '',
            extend_from: '',
            is_extended: '',
            // arr select
            package: [],
            brands: [],
            status: [],
            room: [],
            roomShow: [],
            listPosition: [],
            // defaul value select
            packageValue: '',
            statusValue: '',
            brandsValue: '',
            roomValue: '',
            // 
            loading: false,
            dateFrom: '',
            dateTo: '',
            disabled: true,
            token: '',
            Err: false,
            disabled: false,
            colorDisabled: '#eee',
            colorSave: '#f5983a',
            disabledSave: true,
        };
        global.listColor = ['#2b78e4', '#e69138', '#cf2a27'];
    }

    // auto load get data first
    componentWillMount() {
        const _this = this;
        // check exist token
        getStorage('@auth_token').then(function (token) {
            if (token && token !== null) {
                // get API to data
                getDataSelect(token).then(function (response) {
                    if (response && response.data.token !== null) {
                        if (response && response.data.data) {
                            _this.setState({
                                loading: false,
                                package: response.data.data.roomList,
                                brands: response.data.data.brandList,
                                status: response.data.data.statusList,
                                room: response.data.data.locationAndBrandList,
                                token: response.data.token
                            })
                            // to params
                            _this._dataObjToInfo();
                            // focus
                            _this.refs.customerInput.focus();
                        }
                    } else {
                        _this.props.navigation.dispatch(
                            NavigationActions.navigate('Login'),
                        );
                    }

                })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                    });
            }
        });
    }
    // get params to booking info edit
    _dataObjToInfo() {
        const this_ = this;
        const { navigation } = this_.props;
        const dataObj = navigation.getParam('data', '');
        // set brand to room
        this_._onChangeBrand(dataObj.brand_cd);
        // get data params
        let dateFrom = this_._convertDate(dataObj.booking_start_date);
        let dateTo = this_._convertDate(dataObj.booking_end_date);
        flagBookedNumber = dataObj.no_people;
        old_branch = dataObj.brand_cd;
        old_room = dataObj.location_cd;
        booking_cd = dataObj.booking_cd
        //
        // let numMoney = (dataObj.total).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // 
        this_.setState({
            customer: dataObj.customer_nm,
            phoneNumber: dataObj.customer_phone,
            address: dataObj.typeOfBooking == 'bookings' ? '' : dataObj.customer_address,
            dateFrom: dateFrom,
            dateTo: dateTo,
            packageValue: dataObj.package_cd,
            number: dataObj.no_people.toString(),
            statusValue: dataObj.status_cd,
            brandsValue: dataObj.brand_cd,
            roomValue: dataObj.location_cd,
            sumAmount: ((dataObj.total).toString()).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            booking_cd: dataObj.booking_cd,
            extend_from: dataObj.extend_from,
            is_extended: dataObj.is_extended,
        });
        // check disabled input
        if (dataObj.typeOfBooking == 'bookings') {
            this_.setState({
                brands: [],
                room: [],
                disabled: false,
                colorDisabled: '#eee',
                colorSave: '#eee',
                disabledSave: false
            });
        }
        // set params location to position
        this._setPosition(dataObj.location_cd, booking_cd, dateFrom, dateTo);
    }
    // convert to date
    _convertDate(miliDate) {
        var mili = parseInt(miliDate.replace("/Date(", "").replace(")/", ""));
        return moment(mili).format('YYYY/MM/DD');
    }
    // on change brand to show room
    _onChangeBrand(value) {
        try {
            const _this = this;
            _this.setState({ brandsValue: value });
            // show data room
            let roomShowCheck = [];
            value = value.toString();
            if (value !== '-1') {
                _this.state.room.map((person, index) => {
                    if (person.brand_cd === value) {
                        roomShowCheck.push(person);
                    }
                });
                // 
                _this.setState({
                    disabled: true,
                    colorDisabled: '#fff',
                });
            } else {
                roomShowCheck = _this.state.room;
                // 
                _this.setState({
                    disabled: false,
                    colorDisabled: '#eee',
                });
            }
            // set to room from brand
            _this.setState({
                roomShow: roomShowCheck,
                number: flagBookedNumber.toString()
                // roomShow: this.state.room
            });
            if (old_branch == value) {
                _this.setState({
                    roomValue: old_room
                    // roomShow: this.state.room
                });
                _this._onChangeRoom(old_room);
            } else {
                _this.setState({
                    roomValue: '-1',
                    listPosition: []
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    // on change room to show position
    _onChangeRoom(value) {
        try {
            this.setState({
                roomValue: value,
                clearColorChair: 'clearColor',
                number: flagBookedNumber.toString()
            });
            // set default
            position_list = [""];
            cancelled_list = [""];

            // set array position
            this._setPosition(value, booking_cd, this.state.dateFrom, this.state.dateTo);
        } catch (error) { }
    }
    // on change package
    _onChangePackage(value) { 
        this.setState({ packageValue: value });
        if (value != '') {
            this.state.package.map((person, index) => {
                if (person.id == value) {
                    this.setState({
                        // sumAmount: (person.price).replace('.00', ''),
                        sumAmount: (person.price).replace('.00', '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    })
                }
            });
        }
    }
    _onCompareValues(key, order = 'asc') {
        return function (a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }
    // set position
    _setPosition(location_cd = '', booking_cd = '', booking_start_date = '', booking_end_date = '') {
        try {
            // set array position
            const dataPosition = {
                location_cd: location_cd,
                customerNm: booking_cd,
                booking_start_date: booking_start_date.replace(/\//g, '-'),
                booking_end_date: booking_end_date.replace(/\//g, '-'),
                token: this.state.token
            }
            // to data position
            this._getPosition(dataPosition);
        } catch (error) { }
    }
    // get position
    _getPosition(dataObj) {
        const this_ = this;
        // get API to data
        getPosition(dataObj).then(function (response) {
            if (response && response.data.token !== null) {
                if (response && response.data.data) {
                    // sort store - arr
                    let sort = response.data.data;
                    sort.sort(this_._onCompareValues('position_nm'));
                    // 
                    this_.setState({
                        listPosition: sort,
                        clearColorChair: ''
                    })
                }
            } else {
                this_.props.navigation.navigate('Login')
            }
        })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }
    // check input requied
    _checkRequied() {
        const _this = this;
        let checkError = true;
        //Check form invalid so return false
        if (_this.state.roomValue === '-1' || _this.state.roomValue === '') {
            _this.setState({
                roomError: 'Room is required!',
                roomErr: true
            });
            checkError = false;
            //
            _this._goToTop(400, 400);
        } else {
            _this.setState({
                roomError: '',
                roomErr: false
            });
        }
        //
        if (_this.state.brandsValue === '-1' || _this.state.brandsValue === '' || _this.state.brandsValue === undefined) {
            _this.setState({
                branchError: 'Branch is required!',
                branchErr: true
            });
            checkError = false;
            //
            _this._goToTop(350, 350);
        } else {
            _this.setState({
                branchError: '',
                branchErr: false
            });
        }
        // 
        // 
        if (_this.state.statusValue === '') {
            _this.setState({
                statusError: 'Status is required!',
                statusErr: true
            });
            checkError = false;
            // 
            _this._goToTop(300, 300);
        } else {
            _this.setState({
                statusError: '',
                statusErr: false
            });
        }
        // 
        // if (_this.state.packageValue === '') {
        //     _this.setState({
        //         packageError: 'Package basic is required!',
        //         packageErr: true
        //     });
        //     checkError = false;
        //     //
        //     _this._goToTop(250, 250);
        // } else {
        //     _this.setState({
        //         packageError: '',
        //         packageErr: false
        //     });
        // }
        // 
        if (_this.state.address === '') {
            _this.setState({
                addressError: 'Address is required!',
                addressErr: true
            });
            checkError = false;
            // 
            _this.refs.addressInput.focus();
            _this._goToTop();
        } else {
            _this.setState({
                addressError: '',
                addressErr: false
            });
        }
        // 
        if (_this.state.phoneNumber === '') {
            _this.setState({
                phoneNumberError: 'Phone is required!',
                phoneErr: true
            });
            checkError = false;
            // 
            _this.refs.phoneInput.focus();
            _this._goToTop();
        } else
            if (isNaN(_this.state.phoneNumber)) {
                _this.setState({
                    phoneNumberError: 'Phone is not a number!',
                    phoneErr: true
                });
                checkError = false;
                // 
                _this.refs.phoneInput.focus();
                _this._goToTop();
            } else {
                _this.setState({
                    phoneNumberError: '',
                    phoneErr: false
                });
            }
        // 
        if (_this.state.customer === '') {
            _this.setState({
                customerError: 'Customer is required!',
                customerErr: true
            });
            checkError = false;
            // 
            _this.refs.customerInput.focus();
            _this._goToTop();
        } else {
            _this.setState({
                customerError: '',
                customerErr: false
            });
        }
        // 
        if (_this.state.number == 0) {
            Alert.alert(
                'Alert',
                'Please choose as less one position!',
                [
                    {
                        text: 'OK', onPress: () => _this._goToTop(500, 500)
                    },
                ],
                { cancelable: false }
            )
            checkError = false;
        }
        // if(_this.state.number === '') {
        //     _this.setState({
        //         numberError: 'Number is required!',
        //         numberErr: true
        //     });
        //     checkError = false;
        // }else
        // if(isNaN(_this.state.number)){
        //     _this.setState({
        //         numberError: 'Number is not a number!',
        //         numberErr: true
        //     });
        //     checkError = false;
        //  }else {
        //     _this.setState({
        //         numberError: '',
        //         numberErr: false
        //     });
        // }
        // 
        if (_this.state.dateFrom === '' || _this.state.dateTo === '') {
            _this.setState({
                dateError: 'Date is required!',
                dateErr: true
            });
            checkError = false;
            // 
            _this._goToTop();
        }else
        if(!_this.state.checkFromTo){
            checkError = false;
            // 
            _this._goToTop(50,50);
        } else {
            _this.setState({
                dateError: '',
                dateErr: false
            });
        }
        // 
        // if (_this.state.sumAmount === 0 || _this.state.sumAmount === '') {
        //     _this.setState({
        //         amountError: 'Sum amount is required!',
        //         amountErr: true
        //     });
        //     checkError = false;
        // } else
        //     if (isNaN(_this.state.sumAmount)) {
        //         _this.setState({
        //             amountError: 'Sum amount is not a number!',
        //             amountErr: true
        //         });
        //         checkError = false;
        //     } else {
        //         _this.setState({
        //             amountError: '',
        //             amountErr: false
        //         });
        //     }
        //  return 
        return checkError;
    }
    // on click booked
    _onClickSeatsBooked(number) {
        // set number of seats booked
        let oldNumber = (parseInt(this.state.number) + parseInt(number)).toString();
        this.setState({
            number: oldNumber
        });
    }
    // event save
    _onSave() {
        try {
            const _this = this;
            if (_this.state.disabledSave) {
                let checkErr = this._checkRequied();
                // to save
                if (_this.state.checkFromTo && checkErr) {
                    Alert.alert(
                        'Comfirm',
                        'Are you sure want to save this?',
                        [
                            { text: 'Cancel', onPress: () => console.log('Cancel save') },
                            {
                                text: 'OK', onPress: () => {
                                    // --------------------------------
                                    const dataObj = {
                                        customer_nm: this.state.customer,
                                        booking_end_date: this.state.dateTo.replace(/\//g, '-'),
                                        status_cd: this.state.statusValue,
                                        package_cd: this.state.packageValue,
                                        location_cd: this.state.roomValue,
                                        customer_adr: this.state.address,
                                        customer_phone: this.state.phoneNumber,
                                        total: (this.state.sumAmount).replace(',', ''),
                                        booking_cd: this.state.booking_cd,
                                        brand_cd: this.state.brandsValue,
                                        number: this.state.number,
                                        position_cd: position_list,
                                        cancelled: cancelled_list,
                                        booking_start_date: this.state.dateFrom.replace(/\//g, '-'),
                                        extend_from: this.state.extend_from,
                                        is_extended: this.state.is_extended,
                                        token: this.state.token
                                    }
                                    // save update data
                                    // to data from API
                                    saveBookingUpdate(dataObj).then(function (response) {
                                        // if (response && response.data.token !== null) {
                                        if (response && response.data && response.data.status && response.data.status == 200) {
                                            // alert success
                                            Alert.alert(
                                                'Message',
                                                'Update ' + response.data.message,
                                                [
                                                    {
                                                        text: 'OK', onPress: () => {
                                                            let numChangeNew = _this.state.number;
                                                            flagBookedNumber = numChangeNew;
                                                            // 
                                                            _this._onChangeRoom(_this.state.roomValue);
                                                            _this.setState({
                                                                clearColorChair: 'clearColor',
                                                                number: numChangeNew
                                                            })
                                                            // 
                                                            _this._goToTop(0, 0);
                                                            // 
                                                            _this.refs.customerInput.focus();
                                                            //
                                                            // set Reducers to reload ==>> detail info goback()
                                                            _this.props.screenProps.onChangeFlagInfoDetailToStore(_this.props.screenProps.flagDetail == 1 ? 0 : 1);
                                                        }
                                                    },
                                                ],
                                                { cancelable: false }
                                            )
                                        } else {
                                            // alert error
                                            Alert.alert(
                                                'Message',
                                                'Update error!!!',
                                                [
                                                    {
                                                        text: 'OK', onPress: () => {
                                                            _this._goToTop(0, 0);
                                                            // 
                                                            _this.refs.customerInput.focus();
                                                         }
                                                    },
                                                ],
                                                { cancelable: false }
                                            )
                                        }
                                        // } else {
                                        //     _this.props.navigation.dispatch(
                                        //         NavigationActions.navigate('Login'),
                                        //     );
                                        // }
                                    })
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                        .then(function () {
                                        });
                                }
                                // end get data delete
                            },
                        ],
                        { cancelable: false }
                    )
                }
            }
        } catch (error) {
        }
    }
    //
    _goToTop(x = 0, y = 0) {
        this.scroll.scrollTo({ x: x, y: y, animated: true });
    }
    //  
    render() {
        return (
            <ScrollView ref={(c) => { this.scroll = c }}>
                <View style={stylesCommon.container}>
                    {/* <TextInputCommon
                        label='Customer'
                        onChange={(text) => { this.setState({ customer: text }) }}
                        value={this.state.customer}
                        required={true}
                        maxLength={100}
                        ref = 'customerInput'
                    /> */}
                    <View>
                        <Text style={stylesCommon.label}>Customer <Text style={{ color: '#f00' }}>*</Text></Text>
                        <TextInput
                            style={[stylesCommon.input, { backgroundColor: this.props.color }]}
                            onChangeText={(text) => { this.setState({ customer: text }) }}
                            value={this.state.customer || ''}
                            editable={true}
                            selectTextOnFocus={this.props.selectTextOnFocus}
                            maxLength={100}
                            ref='customerInput'
                        />
                    </View>
                    <Text style={this.state.customerErr ? styles.txtError : styles.txtNone}>{this.state.customerError}</Text>

                    {/* <TextInputCommon
                        label='Phone'
                        onChange={(text) => { this.setState({ phoneNumber: text }) }}
                        value={this.state.phoneNumber}
                        required={true}
                        maxLength={11}
                    /> */}
                    <View>
                        <Text style={stylesCommon.label}>Phone <Text style={{ color: '#f00' }}>*</Text></Text>
                        <TextInput
                            style={[stylesCommon.input, { backgroundColor: this.props.color }]}
                            onChangeText={(text) => { this.setState({ phoneNumber: text }) }}
                            value={this.state.phoneNumber || ''}
                            editable={true}
                            selectTextOnFocus={this.props.selectTextOnFocus}
                            maxLength={11}
                            ref='phoneInput'
                        />
                    </View>
                    <Text style={this.state.phoneErr ? styles.txtError : styles.txtNone}>{this.state.phoneNumberError}</Text>

                    {/* <TextInputCommon
                        label='Address'
                        onChange={(text) => { this.setState({ address: text }) }}
                        value={this.state.address}
                        editable={this.state.disabled}
                        selectTextOnFocus={this.state.disabled}
                        color={this.state.colorDisabled}
                        required={true}
                        maxLength={500}
                    /> */}
                    <View>
                        <Text style={stylesCommon.label}>Address <Text style={{ color: '#f00' }}>*</Text></Text>
                        <TextInput
                            style={[stylesCommon.input, { backgroundColor: this.props.color }]}
                            onChangeText={(text) => { this.setState({ address: text }) }}
                            value={this.state.address || ''}
                            editable={true}
                            selectTextOnFocus={this.state.disabled}
                            maxLength={50}
                            ref='addressInput'
                        />
                    </View>
                    <Text style={this.state.addressErr ? styles.txtError : styles.txtNone}>{this.state.addressError}</Text>

                    <DatePickerFromTo
                        dateFromRefer={this.state.dateFrom}
                        dateToRefer={this.state.dateTo}
                        onChangeDate={(from, to, checkError) => {
                            this.setState({ dateFrom: from, dateTo: to, checkFromTo: checkError })
                        }}
                        required={true}
                    />
                    <Text style={this.state.dateErr ? styles.txtError : styles.txtNone}>{this.state.dateError}</Text>

                    <SelectCommon
                        label='Package basic'
                        labelSelectDefaul='Select package..'
                        valueSelectDefaul=''
                        setValue={this.state.packageValue}
                        dataArr={this.state.package}
                        id='id'
                        name='name'
                        enabled={false}
                        color={'#eee'}
                        onChange={(text) => { this._onChangePackage(text) }}
                        required={false}
                    />
                    <Text style={this.state.packageErr ? styles.txtError : styles.txtNone}>{this.state.packageError}</Text>

                    <SelectCommon
                        label='Status'
                        labelSelectDefaul='Select status ..'
                        valueSelectDefaul=''
                        dataArr={this.state.status}
                        id='id'
                        name='name'
                        setValue={this.state.statusValue}
                        onChange={(text) => { this.setState({ statusValue: text }) }}
                        required={true}
                    />
                    <Text style={this.state.statusErr ? styles.txtError : styles.txtNone}>{this.state.statusError}</Text>

                    <SelectCommon
                        label='Branch'
                        labelSelectDefaul='Select branch ..'
                        valueSelectDefaul='-1'
                        dataArr={this.state.brands}
                        id='brand_cd'
                        name='brand_nm'
                        setValue={this.state.brandsValue}
                        onChange={(text) => { this._onChangeBrand(text) }}
                        required={true}
                    />
                    <Text style={this.state.branchErr ? styles.txtError : styles.txtNone}>{this.state.branchError}</Text>

                    <SelectCommon
                        label='Room'
                        labelSelectDefaul='Select room ..'
                        valueSelectDefaul='-1'
                        setValue={this.state.roomValue}
                        dataArr={this.state.roomShow}
                        id='location_cd'
                        name='location_nm'
                        onChange={(text) => { this._onChangeRoom(text) }}
                        enabled={this.state.disabled}
                        color={this.state.colorDisabled}
                        required={true}
                    />
                    <Text style={this.state.roomErr ? styles.txtError : styles.txtNone}>{this.state.roomError}</Text>


                    <Text style={stylesCommon.label}>Seats booked</Text>
                    <View style={styles.statusChair}>
                        <FlatGrid
                            itemDimension={45}
                            items={this.state.listPosition}
                            renderItem={({ item }) =>
                                <ListChair
                                    item={item}
                                    clearColorChair={this.state.clearColorChair}
                                    onChange={(number) => { this._onClickSeatsBooked(number) }}
                                />
                            }
                        />
                    </View>
                    <Text style={stylesCommon.label}>*NOTE:</Text>
                    <View>
                        <View style={styles.noteView}>
                            <Text style={{ ...styles.noteTextRectangle, ...styles.notYetOrder }}>&nbsp;</Text>
                            <Text style={styles.noteTextExplain}>Not booked</Text>
                        </View>
                        <View style={styles.noteView}>
                            <Text style={{ ...styles.noteTextRectangle, ...styles.ordering }}>&nbsp;</Text>
                            <Text style={styles.noteTextExplain}>Someone else booked</Text>
                        </View>
                        <View style={styles.noteView}>
                            <Text style={{ ...styles.noteTextRectangle, ...styles.ordered }}>&nbsp;</Text>
                            <Text style={styles.noteTextExplain}>Guest has chosen</Text>
                        </View>
                    </View>

                    <TextInputCommon
                        label='Number of seats booked'
                        onChange={(text) => { this.setState({ number: text }) }}
                        value={this.state.number}
                        editable={false}
                        color={'#eee'}
                    />
                    <Text style={this.state.numberErr ? styles.txtError : styles.txtNone}>{this.state.numberError}</Text>

                    <TextInputCommon
                        label='Sum amount'
                        onChange={(text) => { this.setState({ sumAmount: text }) }}
                        value={this.state.sumAmount}
                        editable={this.state.disabled}
                        selectTextOnFocus={this.state.disabled}
                        editable={false}
                        color={'#eee'}
                    />
                    <Text style={this.state.amountErr ? styles.txtError : styles.txtNone}>{this.state.amountError}</Text>

                    <ButtonCommon
                        title='Save'
                        color={this.state.colorSave}
                        onPress={() => this._onSave()}
                    />
                </View>
            </ScrollView>
        );
    }
}
// 
class ListChair extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: ''
        };
    }
    // set color click position
    _onClickPosition(id, status) {
        //add Item
        if (this.state.bgColor == '' && status == 0) {
            this.setState({
                bgColor: '#cf2a27'
            });
            // add value position new
            position_list.push(id);
            // 
            flagBookedClick = 1;
        } else
            if (this.state.bgColor == '' && status == 2) {
                this.setState({
                    bgColor: '#e4949c'
                });
                cancelled_list.push(id);
                // 
                flagBookedClick = -1;
            } else {
                this.setState({
                    bgColor: ''
                });
                // remove array position
                this._removeArray(position_list, id, -1);
                // remove array cancelled
                this._removeArray(cancelled_list, id, 1);
            }
        if (status == 1) {
            flagBookedClick = 0;
        }
        // to data parent BookingUpdateScreen
        this.props.onChange(flagBookedClick);
    }
    // remove array
    _removeArray(arrList, id, number = 0) {
        var array = arrList;
        var index = array.indexOf(id)
        if (index !== -1) {
            array.splice(index, 1);
            arrList = array;
            flagBookedClick = number;
        }
        return arrList
    }
    // listen props parent change
    componentWillReceiveProps(props) {
        // to reset color chair
        if (props.clearColorChair && props.clearColorChair === 'clearColor') {
            this.setState({
                bgColor: ''
            })
        };
    }
    // 
    render() {
        return (
            <TouchableHighlight
                onPress={() => this._onClickPosition(this.props.item.position_cd, this.props.item.position_status)}
                style={{ backgroundColor: this.state.bgColor || global.listColor[this.props.item.position_status], height: 51, borderRadius: 5, paddingHorizontal: 5, paddingTop: 7 }}>
                <View>
                    {/* <Icon
                        name='event_seat'
                        type='material'
                    /> */}
                    <Icon
                        name='calendar'
                        type='font-awesome'
                        color='#fff'
                        size={15}
                    />
                    <Text style={{ color: 'white', fontSize: 12, marginTop: 6, textAlign: 'center' }}>{this.props.item.position_nm}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
// 
export default BookingUpdateScreen;