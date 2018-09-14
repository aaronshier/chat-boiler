import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index'

class Profile extends Component<{}> {
    constructor(props){
        super(props)
    
        this.state = {}
    }
    render() {
        return (
            <div>
                <h1>@{this.props.redux.user.username}</h1>
                <h2>email: {this.props.redux.user.email}</h2>
                {/* <h3>id: {}</h3> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)