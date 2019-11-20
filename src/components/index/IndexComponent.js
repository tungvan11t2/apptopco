/* Core */
import React, { Component } from 'react';

/* Presentational */
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { Container, Footer, Body, Title } from 'native-base';
import { Header } from 'react-native-elements';

class IndexComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
            {key: 'a'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'},
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'b'}, 
            {key: 'c'}, 
            ]
        }
    }

    _onCountIncreasing() {
        this.props.onIncrement(1);
    }

    _onCountDecreasing() {
        this.props.onDecrement(1);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header 
                  placement="left"
                  leftComponent={{ icon: 'menu', color: '#fff' }}
                  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                  rightComponent={{ icon: 'home', color: '#fff' }}
                  containerStyle={styles.header}
                />
                <View style={styles.content}>
                    <FlatList
                      data={this.state.data}
                      renderItem={({item}) => <Text>{item.key}</Text>}
                    />
                </View>
                <Footer style={styles.footer}>
                    <Body>
                        <Title style={styles.text}>Sticky Headers</Title>
                    </Body>
                </Footer>
            </Container>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    header: {
        flex: 1/1,
        paddingTop: 0,
        backgroundColor: '#3D6DCC',
    },
    content: {
        flex: 6/1
    },
    footer: {
        flex: 1/1,
        backgroundColor: '#10bb25',
    },
    text: {
        color: '#ffffff'
    }
});

export default IndexComponent;
