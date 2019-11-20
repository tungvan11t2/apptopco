import React from "react";
import { 
    StyleSheet, 
    Button, 
    View, 
    Text, 
    ScrollView, 
    SafeAreaView, 
    Image,
    TouchableOpacity 
} from "react-native";
import { DrawerItems, DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { 
    removeStorage
}   from '../common/storage';

import { PATH_AVATAR } from '../common/constants';
const proileImage = require('../assets/avatar_def.png');

const menuItems = [
{
    navOptionThumb: 'search',
    navOptionName: 'BookingInfo',
    screenToNavigate: 'BookingInfo',
},
// {
//     navOptionThumb: 'edit',
//     navOptionName: 'BookingUpdate',
//     screenToNavigate: 'BookingUpdate',
// },
{
    navOptionThumb: 'forward',
    navOptionName: 'Logout',
    screenToNavigate: '',
},
];
global.currentScreenIndex = 0;
/*Booking Info Button*/
export const DrawerButton = (props) => (
    <View style={styles.sideMenuContainer}>
        {/*User profile */}
        <View style={styles.btnClose}>
            <Icon name='close' size={25} color="#808080" onPress={() => { _onClose(props) }}/>
        </View>
        <View style={styles.topMenu}>
            <TouchableOpacity style={styles.userProfile} onPress={() => { _onChangeAvatar(props) }}>
                <Image
                  source={ (props.screenProps.userData && props.screenProps.userData.avatar) ? ({uri: PATH_AVATAR + props.screenProps.userData.avatar}) : proileImage }
                  style={styles.sideMenuProfileIcon}
                />
                <Text style={styles.txtUserName} numberOfLines={1}>{props.screenProps.userData ? props.screenProps.userData.user_cd : ''} : {props.screenProps.userData ? props.screenProps.userData.short_nm : ''}</Text>
            </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
          />
        {/*Menu item */}
        <View style={{ width: '100%' }}>
          {menuItems.map((item, key) => (
            <TouchableOpacity
                key={key}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                }}
                onPress={() => {
                    global.currentScreenIndex = key;
                    _onClose(props);
                    if(item.navOptionName === 'Logout') {
                        global.currentScreenIndex = 0;
                        _onLogout(props);
                    }else {
                        props.navigation.navigate(item.screenToNavigate);
                    }
                }}>
                <View style={{ marginRight: 10, marginLeft: 20 }}>
                    <Icon name={item.navOptionThumb} size={25} color="#808080" />
                </View>
                <Text
                style={{
                    fontSize: 15,
                    color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
                >
                {item.navOptionName}
                </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );

    const _onLogout = (props) => {
        removeStorage('@auth_token');
        props.navigation.navigate('Login');
    };

    const _onClose = (props) => {
        props.navigation.dispatch(DrawerActions.closeDrawer());
    };

    const _onChangeAvatar = (props) => {
        props.navigation.navigate('UploadAvatar');
    };

    const styles = StyleSheet.create({
        sideMenuContainer: {
            width: '100%',
            height: 220,
            backgroundColor: '#f5983a',
            alignItems: 'flex-start',
            paddingTop: 20,
        },
        topMenu: {
            flex: 1,
        },
        userProfile: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
            marginTop: -14
        },
        btnClose: {
            position: 'absolute',
            color: '#ffffff',
            right: 5,
            top: 5,
        },
        txtUserName: {
            color: '#ffffff',
            paddingLeft: 10,
            fontSize: 20,
            fontWeight: 'bold',
            width: 180
        },
        sideMenuProfileIcon: {
            width: 60,
            height: 60,
            marginTop: 10,
            borderRadius: 40,
        },
    });