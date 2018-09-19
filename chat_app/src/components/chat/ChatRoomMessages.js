import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { ActionCreators } from '../../actions'
import IncomingMessageComponent from './IncomingMessageComponent'

class ChatRoomMessages extends Component<{}> {
    // componentWillReceiveProps(nuProps){
    //     let props = this.props
    //     if(props.redux.global_messages.length < nuProps.redux.global_messages.length){
    //         this.scrollView.scrollToEnd({animated: true});
    //     }
    // }
    render() {
        return (
            <FlatList
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight)=>{        
                    this.scrollView.scrollToEnd({animated: true});
                }}
                data={this.props.redux.global_messages}
                keyExtractor={(data, index) => index.toString()}
                renderItem={({item, index, separators}) => {
                    const self = item.user_id === this.props.redux.user._id
                    return(
                        <IncomingMessageComponent self={self} item={item}/>
                    )
                } }
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomMessages)