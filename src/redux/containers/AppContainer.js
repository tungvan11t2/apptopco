import React from "react";
import { View, Text, Image } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { 
    createStackNavigator, 
    createDrawerNavigator, 
    createBottomTabNavigator, 
    createAppContainer,
    DrawerActions,
    NavigationActions
} from "react-navigation";

/* Component */
import BookingInfoScreen from '../../screens/BookingInfo/components/BookingInfoScreen';
import BookingInfoScreenDetail from '../../screens/BookingInfo/components/BookingInfoScreenDetail';
import BookingUpdateScreen from '../../screens/BookingUpdate/components/BookingUpdateScreen';
import LogoutScreen from '../../screens/LogoutScreen';
import LoginScreen from '../../screens/Login/components/LoginScreen';
import UploadAvatarScreen from '../../screens/UploadAvatar/components/UploadAvatarScreen';
import HiddenScreen from '../../screens/HiddenScreen';

import { DrawerButton } from '../../components/DrawerButton';
const styles = {
    btnMenu: {
        marginLeft: 5,
        backgroundColor: '#adf5f7'
    },
    btnHome: {
        marginRight: 5,
        backgroundColor: '#adf5f7'
    },
};

const logoImg = require('../../assets/topLogo.png');

const StackNavigator = createStackNavigator({
    BookingInfo: {
        screen: BookingInfoScreen,
        navigationOptions: {
            header: null
        }
    },
    BookingInfoDetail: {
        screen: BookingInfoScreenDetail,
        navigationOptions: {
            title: 'Booking Info',
            headerTintColor: 'white',
            headerStyle: { 
                backgroundColor: '#f5983a', 
                height: 40,
            },
            headerTitleStyle: { color: 'white' }
        }
    },
    BookingUpdate: {
        screen: BookingUpdateScreen,
        navigationOptions: {
            title: 'Booking Update',
            headerTintColor: 'white',
            headerStyle: { 
                backgroundColor: '#f5983a',
                height: 40,
            },
            headerTitleStyle: { color: 'white' }
        },
    },
    UploadAvatar: {
        screen: UploadAvatarScreen,
        navigationOptions: {
            title: 'Upload Avatar',
            headerTintColor: 'white',
            headerStyle: { 
                backgroundColor: '#f5983a',
                height: 40,
            },
            headerTitleStyle: { color: 'white' },
            drawerLabel: <HiddenScreen />,
        },
    },
},
{
    initialRouteName: "BookingInfo"
});

const AppNavigator = createStackNavigator({
    MainDrawer: {
        screen: StackNavigator,
        navigationOptions: ({ navigation }) => {
            const params = navigation.state.params || {};

            return {
                headerLeft: (
                    <Button
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer()) }
                    buttonStyle={styles.btnMenu}
                    icon={
                        <Icon
                        name="menu"
                        size={38}
                        color="white"
                        />
                    }
                    title=""
                    />
                    ),
                headerTitle: (
                    <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                    <Image
                    source={logoImg}
                    style={{width:140, height:38}}
                    />
                    </View>
                    ),
                    headerRight: (
                    <Button
                    onPress={() => navigation.navigate('Home')}
                    buttonStyle={styles.btnHome}
                    icon={
                        <Icon
                        name="bell"
                        type='font-awesome'
                        size={25}
                        color="white"
                        />
                    }
                    title=""
                    />
                    ),
                    headerStyle: {
                        backgroundColor: '#adf5f7',
                    },
                };
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
    },
    {
        initialRouteName: "Login"
        // initialRouteName: "MainDrawer"
    });

const DrawerNavigator = createDrawerNavigator({
    MainStacks: {
        screen: AppNavigator,
        navigationOptions: {
            drawerLabel: <HiddenScreen />,
        },
    },
},
{
    initialRouteName: "MainStacks",
    contentComponent: DrawerButton,
    overlayColor: "#0c0c0c80"
});


const AppContainer = createAppContainer(DrawerNavigator);
export default AppContainer;