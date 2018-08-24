import React, { Component } from 'react'
import { View, Text, TextInput, Image, SafeAreaView } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../actions/index'
import TxtInput from '../components/TxtInput'
import { checkForAllTokens } from '../components/auth'

import {
    CachedImage,
    ImageCacheManager,
    ImageCacheProvider
} from 'react-native-cached-image';

class Home extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {
        }
    }
    async componentWillMount(){
        const manager = ImageCacheManager({})
        if(this.props.redux.user.avatar){
            const image = await manager.downloadAndCacheUrl(this.props.redux.user.avatar)
            this.setState({profile_image: image})
        }
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            
                { this.state.profile_image  ? 
                    <CachedImage
                        source={{uri: this.props.redux.user.avatar }}
                        defaultSource={{uri: this.props.redux.user.avatar }}
                        style={{
                            backgroundColor: '#ccc',
                            height: 100,
                            width: 100,
                            borderRadius: 50
                        }}
                    />
                    :
                    <Icon name="home" style={{alignSelf: 'center', fontSize: 60}}/>
                 }
                
                <Text style={{textAlign: 'center', fontSize: 30}}>
                    Home
                </Text>
            </View>
        )
    }
}

function mapStateToProps(redux) {
    return {
        redux
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)