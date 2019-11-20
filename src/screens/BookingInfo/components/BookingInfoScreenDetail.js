import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, ActivityIndicator, Button } from 'react-native';
import styles from '../stylesheet/BookingInfoStyle';
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';
import { NavigationActions } from "react-navigation";
import moment from 'moment';
import { Icon } from 'react-native-elements';
import { getStorage } from '../../../common/storage';
import { getDataSearch, deleteInfoDetail, extensionInfoDetail } from '../../../common/api/listInfo';

console.disableYellowBox = true;

class BookingInfoDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            infoListAll: [],
            token: '',
            notFound: false,
        };
        this.selectedRow;
    }
    // refer data screen
    _referDataDetail(dataObj) {
        const _this = this;
        // check exist token
        getStorage('@auth_token').then(function (token) {
            if (token && token !== null) {
                // add token to object
                dataObj.token = token;
                // get API to data
                getDataSearch(dataObj).then(function (response) {
                    if (response && response.data.token !== null) {
                        if (response && response.data.data) {
                            _this.setState({
                                loading: false,
                                infoListAll: response.data.data,
                                token: response.data.token
                            })
                            if (response.data.data.length <= 0) {
                                _this.setState({
                                    notFound: true
                                })
                            }
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
    // get params to booking info
    _dataObjToInfo() {
        const { navigation } = this.props;
        const dataObj = {
            brand_cd: navigation.getParam('brandsValue', ''),
            status_cd: navigation.getParam('statusValue', ''),
            customer_nm: navigation.getParam('customer', ''),
            location_cd: navigation.getParam('roomValue', ''),
            booking_start_date: navigation.getParam('dateFrom', ''),
            booking_end_date: navigation.getParam('dateTo', '')
        };
        return dataObj
    }
    // auto load get data first
    componentWillMount() {
        this._onReload();
    }
    // reload page date refresh
    _onReload() {
        try {
            // get params to booking info
            const dataObj = this._dataObjToInfo();
            this._referDataDetail(dataObj);
        } catch (error) {
        }
    }
    // event delete
    _onDelete(booking_cd = '', screen = '', is_extended = '', extend_from = '', token = '', location_cd = '') {
        try {
            const _this = this;
            let dataObj = {
                // get data input
                booking_cd: booking_cd,
                typeOfBooking: screen,
                is_extended: is_extended,
                extend_from: extend_from,
                token: token,
                location_cd: location_cd,
            };
            // alert comfirm
            Alert.alert(
                'Comfirm',
                'Are you sure want to delete this?',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel delete') },
                    {
                        text: 'OK', onPress: () => {
                            // get data api delete
                            deleteInfoDetail(dataObj).then(function (response) {
                                if (response && response.data.token !== null) {
                                    if (response && response.data.status == 200) {
                                        // alert success
                                        Alert.alert(
                                            'Message',
                                            'Delete ' + response.data.message,
                                            [
                                                {
                                                    text: 'OK', onPress: () => _this._onReload()
                                                },
                                            ],
                                            { cancelable: false }
                                        )
                                    } else {
                                        // alert success
                                        Alert.alert(
                                            'Message',
                                            'Delete ' + response.data.message,
                                            [
                                                {
                                                    text: 'OK', onPress: () => _this._onReload()
                                                },
                                            ],
                                            { cancelable: false }
                                        )
                                    }
                                } else {
                                    _this.props.navigation.dispatch(
                                        NavigationActions.navigate('Login'),
                                    );
                                }

                            })
                        }
                        // end get data delete
                    },
                ],
                { cancelable: false }
            )

        } catch (error) {
        }
    }
    // event extension
    _onExtension(customer_nm = '', booking_end_date = '', status_cd = '', package_cd = '', location_cd = '', customer_address = '', customer_phone = '', total = '', booking_cd = '', token = '') {
        try {
            const _this = this;
            let dataObj = {
                customer_nm: customer_nm,
                booking_end_date: booking_end_date,
                status_cd: status_cd,
                package_cd: package_cd,
                location_cd: location_cd,
                customer_adr: customer_address ? customer_address : ' ',
                customer_phone: customer_phone,
                total: total.toString(),
                booking_cd: booking_cd,
                token: token
            };
            // alert comfirm
            Alert.alert(
                'Comfirm',
                'Are you sure want to add extend time?',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel extension') },
                    {
                        text: 'OK', onPress: () => {
                            // get data api extension
                            extensionInfoDetail(dataObj).then(function (response) {
                                // if (response && response.data.token !== null) {
                                if (response && response.data.status == 200) {
                                    // alert success
                                    Alert.alert(
                                        'Message',
                                        'Extension ' + response.data.message,
                                        [
                                            {
                                                text: 'OK', onPress: () => _this._onReload()
                                            },
                                        ],
                                        { cancelable: false }
                                    )
                                } else {
                                    // alert success
                                    Alert.alert(
                                        'Message',
                                        'Extension ' + response.data.message,
                                        [
                                            {
                                                text: 'OK', onPress: () => _this._onReload()
                                            },
                                        ],
                                        { cancelable: false }
                                    )
                                }
                                // }
                                // else {
                                //     Alert.alert(
                                //         'Message',
                                //         'Your session has expired, please log back in ',
                                //         [
                                //             {
                                //                 text: 'OK', onPress: () => _this.props.navigation.navigate('Login')
                                //             },
                                //         ],
                                //         { cancelable: false }
                                //     )
                                // }
                            })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            // end get data extension
                        }
                    },
                ],
                { cancelable: false }
            )

        } catch (error) {
        }
    }
    // event message
    _onMessage(message) {
        try {
            // alert message
            Alert.alert(
                'Message',
                message,
                [
                    {
                        text: 'OK'
                    },
                ],
                { cancelable: false }
            )

        } catch (error) {
        }
    }
    // event edit
    _onEdit(data,typeOfBooking) {
        try {
            // if (typeOfBooking == 'tbl_booking_info') {
                // set Reducers
                this.props.navigation.navigate('BookingUpdate', {
                    data: data,
                });
            // }
        } catch (error) {
        }
    }
    // convert to date
    _convertDate(miliDate) {
        var mili = parseInt(miliDate.replace("/Date(", "").replace(")/", ""));
        return moment(mili).format('YYYY/MM/DD');
    }
    // show message
    _showMessage(message, typeOfBooking) {
        if (typeOfBooking == 'tbl_booking_info') {
            return (
                <View style={[styles.disabled, styles.backBtn]}>
                    <View>
                        <Icon
                            name='envelope'
                            type='font-awesome'
                            size={15}
                            color='#fff'
                        />
                    </View>
                    <Text style={styles.backTextWhite}>Message</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    style={[styles.backMessage, styles.backBtn]}
                    onPress={() => this._onMessage(message)}
                >
                    <View>
                        <Icon
                            name='envelope'
                            type='font-awesome'
                            size={15}
                            color='#fff'
                        />
                    </View>
                    <Text style={styles.backTextWhite}>Message</Text>
                </TouchableOpacity>
            )
        }
    }
    // show edit
    _showEdit(data,typeOfBooking) {
        if (typeOfBooking == 'tbl_booking_info') {
            return (
                <TouchableOpacity
                    style={[styles.backEdit, styles.backBtn]}
                    onPress={() => this._onEdit(data,typeOfBooking)}
                >
                    <View>
                        <Icon
                            name='edit'
                            type='font-awesome'
                            size={15}
                            color='#fff'
                        />
                    </View>
                    <Text style={styles.backTextWhite}>Edit</Text>
                </TouchableOpacity>
            )
        }
    }
    // show Extension
    _showExtension(is_extended, typeOfBooking, customer_nm, end_date, status_cd, package_cd, location_cd, customer_address, customer_phone, total, booking_cd, token) {
        if (is_extended == 0 && typeOfBooking == 'tbl_booking_info') {
            return (
                <TouchableOpacity
                    style={[styles.backExtension, styles.backBtn]}
                    onPress={() => this._onExtension(customer_nm, end_date, status_cd, package_cd, location_cd, customer_address, customer_phone, total, booking_cd, token)}
                >
                    <View>
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            size={15}
                            color='#fff'
                        />
                    </View>
                    <Text style={styles.backTextWhite}>Extension</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={[styles.disabled, styles.backBtn]}>
                    <View>
                        <Icon
                            name='calendar'
                            type='font-awesome'
                            size={15}
                            color='#fff'
                        />
                    </View>
                    <Text style={styles.backTextWhite}>Extension</Text>
                </View>
            )
        }
    }
    // check not found
    _notFound(notFound) {
        if (notFound) {
            return (
                <Text style={styles.notFound}>No matching records found!</Text>
            )
        }
    }
    // 
    // listen props parent change
    componentWillReceiveProps(props) {
        this._onReload();
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
                    <Text style={{ color: 'blue', textAlign: 'right', marginTop: 0, marginBottom: 10 }}
                        onPress={() => this.props.navigation.navigate('BookingInfo')} >
                        Modify search
                    </Text>
                    {this._notFound(this.state.notFound)}
                    {/* info list All */}
                    {
                        this.state.infoListAll.map(data => {
                            return (
                                <View style={styles.wapper} key={data.booking_cd+data.location_cd+data.position_cd}>
                                    <SwipeRow disableRightSwipe rightOpenValue={-240} closeOnRowPress={true}>
                                        <View style={styles.standaloneRowBack}>
                                            {this._showMessage(data.message, data.typeOfBooking)}
                                            {this._showExtension(data.is_extended, data.typeOfBooking, data.customer_nm, this._convertDate(data.booking_end_date), data.status_cd, data.package_cd, data.location_cd, data.customer_address, data.customer_phone, data.total, data.booking_cd, this.state.token)}
                                            <TouchableOpacity
                                                style={[styles.backDelete, styles.backBtn]}
                                                onPress={() => this._onDelete(data.booking_cd, data.typeOfBooking, data.is_extended, data.extend_from, this.state.token, data.location_cd)}
                                            >
                                                <View>
                                                    <Icon
                                                        name='trash'
                                                        type='font-awesome'
                                                        size={15}
                                                        color='#fff'
                                                    />
                                                </View>
                                                <Text style={styles.backTextWhite}>Delete</Text>
                                            </TouchableOpacity>
                                            {this._showEdit(data, data.typeOfBooking)}
                                        </View>
                                        <View style={styles.standaloneRowFront}>
                                            <TouchableOpacity style={styles.wapperDetail}
                                                onPress={() => this._onEdit(data, data.typeOfBooking)}
                                            >
                                                <View style={styles.componentsLeft}>
                                                    <Text style={styles.username} numberOfLines={1} >{data.customer_nm}</Text>
                                                    <Text style={styles.dateBooking}>
                                                        {this._convertDate(data.booking_start_date)} ~ {this._convertDate(data.booking_end_date)} {/* Find and replace string get number to date convert*/}
                                                    </Text>
                                                </View>
                                                <View style={styles.componentsRight}>
                                                    <Text numberOfLines={1}>{data.brand_nm}</Text>
                                                    <Text numberOfLines={1}>{data.location_nm}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </SwipeRow>
                                </View>
                            );
                        })
                    }
                </View>
            </ScrollView>

        );
    }
}

export default BookingInfoDetailScreen;