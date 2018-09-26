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
        if(this.props.redux.user._id){
            return (
                <div style={styles.profileWrap}>
                    {this.props.redux.user.avatar ? <img style={styles.avatar} src={this.props.redux.user.avatar} />  : null}
                    <div style={styles.meta}>
                        <i style={styles.icon} className="fas fa-user"></i>
                        <p>@{this.props.redux.user.username}</p>
                    </div>
                    <div style={styles.meta}>
                        <i style={styles.icon} className="fas fa-envelope"></i>
                        <p>{this.props.redux.user.email}</p>
                    </div>
                    <div style={styles.meta}>
                        <i style={styles.icon} className="fas fa-id-card"></i>
                        <p>ID: {this.props.redux.user._id.toString()}</p>
                    </div>
                    <p> Use the app to change your profile</p>
                </div>
            )
        } else {
            return null
        }
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

const styles = {
    avatar: {
        maxWidth: 200,
        maxHeight: 200,
        borderRadius: '100px',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    },
    meta: {
        width: '100%',
        maxWidth: '300px',
        boxShadow: '2px 2px 3px rgba(0,0,0,0.2)',
        textAlign: 'left',
        margin: '5px auto',
        padding: '0px 20px',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center'
    },
    profileWrap: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        textAlign: 'center'
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 20,
        background: '#fff',
        borderRadius: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
    }
}