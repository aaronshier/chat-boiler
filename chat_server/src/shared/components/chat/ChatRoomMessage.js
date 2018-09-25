import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions'

class ChatRoomMessage extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {}
    }
    render() {
        const { item } = this.props
        let self = item.user_id === this.props.redux.user._id
        return (
            <div style={{
                display: 'flex', flexDirection: self ? 'row-reverse' : 'row',
                alignItems: 'center'}}>
                    <div style={{padding: '0 6px'}}>
                    { // The avatar logic
                        item.avatar ?
                            <img style={{
                                borderRadius: 13,
                                height: 26,
                                width: 26,
                                marginTop: 3.5,}}
                                src={item.avatar} />
                                :
                            <img style={{
                                borderRadius: 13,
                                height: 26,
                                width: 26,
                                marginTop: 3.5,}}
                                src={'/images/temp_avatar.png'} />
                        
                    }
                    </div>
                    <div>
                        <p style={{
                                textAlign: self ? 'right' : 'left',
                            fontSize: 7,
                            margin: '3px 0',
                            padding: 0}}>{
                                item.username}
                        </p>
                        <div style={{
                                alignSelf: self ? 'flex-end' : 'flex-start',
                                backgroundColor: self ? '#0af' : '#eee',
                                borderRadius: 16,
                                overflow: 'hidden',
                                padding: '5px 10px',
                                marginBottom: 10,
                                maxWidth: 'calc(100% - 48)'
                        }}>
                            <p style={{
                                color: self ? '#fff' : '#000',
                                margin: 0,
                                padding: 0,
                                fontSize: 12
                            }}>
                                {item.message}
                            </p>
                        </div>
                    </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomMessage)