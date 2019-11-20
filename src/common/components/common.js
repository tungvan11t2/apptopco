import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { stylesCommon } from '../styles/common'

export class TextInputCommon extends Component {
    render() {
        return (
            <View>
                <Text style={stylesCommon.label}>{this.props.label} {this.props.required ? <Text style={{color: '#f00'}}>*</Text> : ''}</Text>
                <TextInput
                    style={[stylesCommon.input, { backgroundColor: this.props.color }]}
                    onChangeText={(string) => { this.props.onChange(string); }}
                    value={this.props.value || ''}
                    editable={this.props.editable}
                    selectTextOnFocus={this.props.selectTextOnFocus}
                    maxLength = {this.props.maxLength}
                    ref={this.props.ref} 
                />
            </View>
        );
    }
}

export class ButtonCommon extends Component {
    render() {
        return (
            <View style={stylesCommon.button}>
                <Text
                    style={[stylesCommon.textInButton, { backgroundColor: this.props.color || '#f5983a'}]}
                    onPress={() => (this.props.onPress())}
                >{this.props.title || 'Button'}
                </Text>
            </View>
        );
    }
}

export class SelectCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyChange: ''
        };
    }
    // add value select
    pickerChange(value) {
        this.props.onChange(value);
        this.setState({ keyChange: value })
    }
    // 
    render() {
        var id = this.props.id; // get id to screen input Selectcommon
        var name = this.props.name; // get title to screen input Selectcommon
        // console.clear();
        return (
            <View>
                <Text style={stylesCommon.label}>{this.props.label} {this.props.required ? <Text style={{color: '#f00'}}>*</Text> : ''}</Text>
                <View style={[stylesCommon.pickerWapper, { backgroundColor: this.props.color }]}>
                    <Picker style={stylesCommon.pickerStyle}
                        selectedValue={this.props.setValue || this.state.keyChange}
                        onValueChange={(value) => this.pickerChange(value)}
                        enabled={this.props.enabled}
                    >
                        <Picker.Item label={this.props.labelSelectDefaul} value={this.props.valueSelectDefaul}/>
                        {/* // refer data array */}
                        {
                            this.props.dataArr.map(data => {
                                if(this.props.setValue == data[id]){
                                    return (
                                        <Picker.Item color='#f00' label={data[name]} value={data[id]} key={data[id]} />
                                    );
                                }else{
                                    return (
                                        <Picker.Item label={data[name]} value={data[id]} key={data[id]} />
                                    );
                                }
                            })
                        }
                    </Picker>
                </View>
            </View>
        );
    }
}