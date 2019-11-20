/* Core */
import React, { Component } from 'react';
import {
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { PATH_AVATAR } from '../../../common/constants';
import { stylesCommon } from '../../../common/styles/common';
import { TextInputCommon, ButtonCommon } from '../../../common/components/common';
import styles from '../stylesheet/UploadAvatarStyle';
import { 
    uploadAvatar
}   from '../../../common/api/upload';
import {
    checkToken
}   from '../../../common/api/auth';
import { 
    getStorage,
    setStorage 
}   from '../../../common/storage';

const proileImage = require('../../../assets/avatar_def.png');

class UploadAvatarScreen extends Component {
    constructor(props) {
        super(props);
        const urlAvatar = (this.props.screenProps.userData && this.props.screenProps.userData.avatar) ? ({uri: PATH_AVATAR + this.props.screenProps.userData.avatar}) : proileImage;
        const userName = (this.props.screenProps.userData && this.props.screenProps.userData.user_nm) ? this.props.screenProps.userData.user_nm : '';
        this.state = {
            avatarSource: urlAvatar,
            avatarData: '',
            videoSource: null,
            videoData: null,
            userName: userName,
            isLoading: false
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
        this.selectVideoTapped = this.selectVideoTapped.bind(this);
    }

    componentWillMount() {
        const _this = this;
        getStorage('@auth_token').then(function(localToken) {
            if(localToken && localToken !== null) {
                _this.setState({
                    token: localToken,
                });
            }
        });
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            title: 'Change Avatar',
            storageOptions: {
                skipBackup: true,
            },
            allowsEditing: false
        };

        ImagePicker.showImagePicker(options, response => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled photo picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {uri: response.uri};

                this.setState({
                    avatarSource: source,
                    avatarData: response
                });
            }
        });
    }

    _uploadAvatar() {
        const _this = this;
        const objUpload = new FormData();

        objUpload.append("avatar", {type: _this.state.avatarData.type, name: _this.state.avatarData.fileName, uri: _this.state.avatarSource.uri});
        objUpload.append("user_nm", _this.state.userName);
        objUpload.append("token", _this.state.token);

        Alert.alert(
            'Alert',
            'Are you want to change your avatar?',
            [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Upload!'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    //set oading true
                    _this.setState({
                        isLoading: true
                    });
                    uploadAvatar(objUpload).then(function (res) {
                        _this.setState({
                            isLoading: false
                        });
                        
                        Alert.alert(
                            'Alert',
                            'Image uploaded Successfully!',
                            [
                            {
                                text: 'OK',
                                onPress: () => {
                                    checkToken({token: _this.state.token}).then(function (response) {
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
                                            }
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                },
                            },
                            ],
                            {cancelable: false},
                            );
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            },
            ],
            {cancelable: false},
            );
    }

    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium',
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    videoSource: response.uri,
                });
            }
        });
    }

    render() {
        let viewLoading = <View></View>;
        /* show spinner loading */
        if(this.state.isLoading) {
            viewLoading = <View style={stylesCommon.loadingImg}>
                            <ActivityIndicator size='large' color="#ffffff"/>
                        </View>;
        }
        return (
            <View style={styles.container}>

                {/*show spinner loading*/}
                {viewLoading}

                <View
                    style={[styles.avatar, styles.avatarContainer]}>
                    {this.state.avatarSource === null ? (
                      <Text>Select a Photo</Text>
                    ) : (
                      <Image style={styles.avatar} source={this.state.avatarSource} />
                    )}
                </View>
                
                {/* Select Button */}
                <TouchableHighlight style={styles.selectButton} onPress={this.selectPhotoTapped.bind(this)}>
                    <Text style={styles.saveText}>Select Image</Text>
                </TouchableHighlight>

                {/* Save Button */}
                <TouchableHighlight style={styles.saveButton} onPress={() => this._uploadAvatar()}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableHighlight>

            </View>
            );
    }
}

export default UploadAvatarScreen;