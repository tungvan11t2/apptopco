import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { 
    NavigationActions
} from "react-navigation";

import styles from '../stylesheet/LoginStyle';
import { 
    userLogin,
    getUsers,
    checkToken
}   from '../../../common/api/auth';
import { 
    setStorage,
    getStorage
}   from '../../../common/storage';

const logoImg = require('../../../assets/topLogo.png');
const loadingImg = require('../../../assets/loading.gif');

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNm: '',
            password: '',
            userNmMsg: '',
            passwordMsg: '',
            userNmErr: false,
            passwordErr: false,
            formMsg: '',
            isLoading: false
        };
        this._onLogin.bind(this);
        this._onBlur.bind(this);
        // check exist token
        const _this = this;
        getStorage('@auth_token').then(function(localToken) {
            if(localToken && localToken !== null) {
                //set oading true
                _this.setState({
                    isLoading: true
                });
                checkToken({token: localToken}).then(function (response) {
                    _this.setState({
                        isLoading: false
                    });
                    if (response && response.data) {
                        let token = response.data.token ? response.data.token : null;
                        let user = response.data.data ? response.data.data : null;

                        if(token != null) {
                            setStorage('@auth_token', token);
                            //Add user data to store
                            _this.props.screenProps.onAddUserToStore(user);
                            //Redirect to booking info
                            _this.props.navigation.dispatch(
                                NavigationActions.navigate({
                                    routeName: 'MainDrawer',
                                    action: NavigationActions.navigate({ routeName: 'BookingInfo' }),
                                }),
                                );
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        });
    }

    componentDidMount(){
        // this.userNameInput.focus();
        this.refs.userNameInput.focus();
    }

    _onLogin(){
        const _this = this;
        let checkError = false;
        //Check form invalid so return false
        if(_this.state.userNm === '') {
            _this.setState({
                userNmMsg: 'User name is required!',
                userNmErr: true
            });
            checkError = true;
        }else {
            _this.setState({
                userNmMsg: '',
                userNmErr: false
            });
        }

        if(_this.state.password === '') {
            _this.setState({
                passwordMsg: 'Password is required!',
                passwordErr: true
            });
            checkError = true;
        }else {
            _this.setState({
                passwordMsg: '',
                passwordErr: false
            });
        }

        if(checkError) {
            return false;
        }

        //set oading true
        _this.setState({
            isLoading: true
        });

        try {
            let userObj = {
                user_nm: _this.state.userNm,
                password: _this.state.password,

            };
            userLogin(userObj).then(function (response) {
                _this.setState({
                    isLoading: false
                });
                if (response && response.data) {
                    let token = response.data.token ? response.data.token : null;
                    let user = response.data.data ? response.data.data : null;

                    if(token != null) {
                        //clear error
                        _this._onClearErrors();
                        //
                        setStorage('@auth_token', token);
                        //Add user data to store
                        _this.props.screenProps.onAddUserToStore(user);
                        //Redirect to booking info
                        _this.props.navigation.dispatch(
                            NavigationActions.navigate({
                                routeName: 'MainDrawer',
                                action: NavigationActions.navigate({ routeName: 'BookingInfo' }),
                            }),
                            );
                    }else {
                        Alert.alert(
                            'Alert',
                            'Username or password is incorrect!',
                            [
                            {
                                text: 'OK', onPress: () => {
                                    //focus the first item
                                    // _this.userNameInput.focus();
                                    // show border color error
                                    _this.setState({
                                        userNmErr: true,
                                        passwordErr: true
                                    });
                                }
                            },
                            ],
                            { cancelable: false }
                            );
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    _onClearErrors() {
        this.setState({
            userNmMsg: '',
            passwordMsg: '',
            userNmMsg: false,
            passwordErr: false,
            formMsg: '',
            isLoading: false
        });
    }

    _onBlur(label) {
        if(label === 'userNm') {
            if(this.state.userNm !== ''){
                this.setState({
                    userNmMsg: '',
                    userNmMsg: false
                });
            }else {
                this.setState({
                    userNmMsg: 'User name is required!',
                    userNmMsg: true
                });
            }
        }

        if(label === 'password') {
            if(this.state.password !== ''){
                this.setState({
                    passwordMsg: '',
                    passwordErr: false
                });
            }else {
                this.setState({
                    passwordMsg: 'Password is required!',
                    passwordErr: true
                });
            }
        }
    }
    
    render() {
        let viewLoading = <View></View>;
        let viewMsgForm = <View></View>;
        /* show spinner loading */
        if(this.state.isLoading) {
            viewLoading = <View style={ styles.loadingImg }>
                            <ActivityIndicator size='large' color="#ffffff"/>
                        </View>;
        }

        return (
            <View style={ styles.container }>

                { /*show spinner loading*/ }
                { viewLoading }

                { /*show logo and icon user*/ }
                <View style={ styles.logoContainer }>
                    <Image
                    source={ logoImg }
                    style={ styles.logoImage }
                    />
                </View>
                <View style={ styles.logoContainer }>
                    <Icon
                    name='user'
                    type='font-awesome'
                    color='#000000'
                    size={50} />
                </View>

                { /*show form message*/ }
                { viewMsgForm }

                { /*show form*/ }
                <View style={[ styles.inputContainer, this.state.userNmErr ? styles.inputError : styles.inputNone ]}>
                    <TextInput style={ styles.inputs }
                    ref='userNameInput'
                    placeholder="User Name"
                    underlineColorAndroid='transparent'
                    onChangeText={(userNm) => this.setState({ userNm })} />
                    <Text 
                        style={this.state.userNmErr ? styles.txtError : styles.txtNone }>
                        {this.state.userNmMsg}
                    </Text>
                </View>

                <View style={[ styles.inputContainer, this.state.passwordErr ? styles.inputError : styles.inputNone ]}>
                    <TextInput style={ styles.inputs }
                    placeholder="Password"
                    secureTextEntry={ true }
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({ password })}/>
                    <Text 
                        style={ this.state.passwordErr ? styles.txtError : styles.txtNone }>
                        { this.state.passwordMsg }
                    </Text>
                </View>

                <TouchableHighlight style={[ styles.buttonContainer, styles.loginButton ]} onPress={() => this._onLogin()}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

            </View>
            );
    }
}

export default LoginScreen;