import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const styles = {
    btnMenu: {
        marginLeft: 5,
    },
    btnHome: {
        marginRight: 5,
    }
};

class LogoutScreen extends Component {

    constructor(props) {
      super(props);
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,

    })

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Logout Screen</Text>
            <Button
            title="Go to Settings"
            onPress={() => this.props.navigation.navigate('Settings')}
            />
            </View>
            );
        }
    }

    export default LogoutScreen;