import React, { Component } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import styles from '../stylesheet/BookingInfoStyle';
import { TextInputCommon, ButtonCommon, SelectCommon } from '../../../common/components/common';
import DatePickerFromTo from '../../../common/components/dateTimeFromTo';
import {
    NavigationActions
} from "react-navigation";
import {
    getStorage
} from '../../../common/storage';
import { getDataSelect } from '../../../common/api/listInfo';
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';
console.disableYellowBox = true;

class BookingInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            customer: '',
            brandsValue: '',
            statusValue: '',
            roomValue: '',
            dateTo: '',
            brands: [],
            status: [],
            roomShow: [],
            room: [],
            checkFromTo: true,
            disabled: false,
            colorDisabled: '#eee',
        };
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
                                brands: response.data.data.brandList,
                                status: response.data.data.statusList,
                                room: response.data.data.locationAndBrandList,
                            })
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
    // on change brand to show room
    _onChangeBrand(value){ 
        try{
            const _this = this;
            _this.setState({ brandsValue: value });
            // show data room
            let roomShowCheck = [];
            value = value.toString();
            if(value !== '-1'){
                _this.state.room.map((person, index) => {
                    if(person.brand_cd === value){
                        roomShowCheck.push(person);
                    }
                });
                // 
                _this.setState({
                    disabled: true,
                    colorDisabled: '#fff'
                });
            }else{
                roomShowCheck = _this.state.room;
                // 
                this.setState({ roomValue: '-1' });
                // 
                _this.setState({
                    disabled: false,
                    colorDisabled: '#eee'
                });
            }
            // set to room from brand
            _this.setState({
                roomShow: roomShowCheck
                // roomShow: this.state.room
            });
        } catch(error){
            console.log(error);
        }
    }
    // event search
    _onSearch() {
        try {
            // to params to detail
            if (this.state.checkFromTo) {
                this.props.navigation.navigate('BookingInfoDetail', {
                    brandsValue: this.state.brandsValue,
                    customer: this.state.customer,
                    dateFrom: this.state.dateFrom.replace(/\//g, '-'),
                    dateTo: this.state.dateTo.replace(/\//g, '-'),
                    statusValue: this.state.statusValue,
                    roomValue: this.state.roomValue,
                });
            }
        } catch (error) {
        }
    }
    // 
    render() {
        // loading..
        if (this.state.loading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0c9" />
                </View>
            )
        }
        // show data screen
        return (
            <ScrollView>
                <View style={styles.container}>
                    <SelectCommon
                        label='Branch'
                        labelSelectDefaul='Select branch ..'
                        valueSelectDefaul='-1'
                        dataArr={this.state.brands}
                        id='brand_cd'
                        name='brand_nm'
                        setValue= {this.state.brandsValue}
                        onChange={(text) => {this._onChangeBrand(text)} }
                    />

                    <TextInputCommon
                        label='Customer'
                        onChange={(text) => { this.setState({ customer: text }) }}
                        value={this.state.customer}
                        maxLength={100}
                    />

                    <DatePickerFromTo
                        dateFromRefer={this.state.dateFrom}
                        dateToRefer={this.state.dateTo}
                        onChangeDate={(from, to, checkError) => { 
                            this.setState({ dateFrom: from, dateTo: to, checkFromTo: checkError}) }
                        }
                    />

                    <SelectCommon
                        label='Status'
                        labelSelectDefaul='Select status ..'
                        valueSelectDefaul=''
                        dataArr={this.state.status}
                        id='id'
                        name='name'
                        setValue= {this.state.statusValue}
                        onChange={(text) => { this.setState({ statusValue: text }) }}
                    />

                    <SelectCommon
                        label='Room'
                        labelSelectDefaul='Select room ..'
                        valueSelectDefaul='-1'
                        dataArr={this.state.roomShow}
                        id='location_cd'
                        name='location_nm'
                        setValue= {this.state.roomValue}
                        onChange={(text) => { this.setState({ roomValue: text }) }}
                        enabled={this.state.disabled}
                        color={this.state.colorDisabled}
                    />

                    <ButtonCommon
                        title='Search'
                        onPress={() => this._onSearch()}
                    />
                </View>
            </ScrollView>

        );
    }
}

export default BookingInfoScreen;


