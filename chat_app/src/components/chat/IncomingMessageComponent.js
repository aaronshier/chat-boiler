import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'

import {
    CachedImage as Image,
} from 'react-native-cached-image';

class IncomingMessageComponent extends Component<{}> {
    render() {
        let {self, item} = this.props
        let loaded = false
        return (
            <View style={{
                flexDirection: self ? 'row-reverse' : 'row',
                alignItems: 'center'}}>
                <View style={{paddingHorizontal: 6}}>
                { // The avatar logic
                    item.avatar ?
                        <Image style={styles.avatar}
                            resizeMode="contain"
                            onLoad={()=>{loaded = true}}
                            source={{uri: item.avatar}} />
                    : 
                    <Image
                        style={styles.dummyAvatar}
                        resizeMode="contain"
                        source={require('../../images/profiletemp.png')}
                        onLoad={()=>loaded = true}
                    />
                }
                </View>
                <View>
                    <Text style={{ alignSelf: self ? 'flex-end' : 'flex-start', fontSize: 7,marginVertical: 3}}>{item.username}</Text>
                    <View style={[styles.messageWrap, {alignSelf: self ? 'flex-end' : 'flex-start'}]}>
                        <Text style={{
                            color: '#fff'
                        }}>
                            {item.message}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default IncomingMessageComponent

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 13,
        height: 26,
        width: 26,
        marginTop: 3.5,
        overflow: 'hidden',
        resizeMode: 'cover'
    },
    messageWrap: {
        backgroundColor: '#0af',
        borderRadius: 16,
        overflow: 'hidden',
        paddingHorizontal: 15,
        paddingVertical: 7,
        marginBottom: 10,
        maxWidth: Dimensions.get('screen').width - 48
    },
    dummyAvatar: {
        height: 26,
        marginTop: 3.5,
        width: 26
    }
})