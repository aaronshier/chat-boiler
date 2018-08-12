import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { FaGoogle, FaEnvelope } from 'react-icons/fa'
import { server } from '../../config'
import Snackbar from '@material-ui/core/Snackbar';
import { getTitle }from '../routes'
import styles from '../styles/signup'

class SignUp extends Component<{}> {
	constructor(props) {
	  super(props);

	  	this.state = {
			email: '',
			password: '',
			token: null,
			showPassword: false,
			error: false,
			open: false,
			message: 'none',
		}
		this.handleRegisteration = this.handleRegisteration.bind(this)
	}

	componentDidMount(){
		var url = new URL(window.location.href);
		var error = url.searchParams.get("error") || false;
		var message = url.searchParams.get("message");
		message && this.setState({message: message, open: true, error: error})
		getTitle()
	}

	handleChange(prop, event){
		this.setState({ [prop]: event.target.value })
	}

	handleMouseDownPassword(event){
		event.preventDefault();
	}

	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

	handleClickShowPasssword(){
		this.setState({ showPassword: !this.state.showPassword });
	}
	
	handleRegisteration(e){
		const {email, password} = this.state

		let emailNpassword = false
		let validEmail = this.validateEmail(email)

		email && password ?
			emailNpassword = true
			: this.setState({error: true, open: true, message: 'Please enter both a username an password'})

		validEmail && emailNpassword ? document.getElementById('signup-form').submit() : null

		console.log('emailNpassword ===== ', emailNpassword)

		emailNpassword ? this.setState({error: true, open: true, message: 'The email or password you entered is not valid'}) : null
	}

	render() {
		const { error, open, message } = this.state
		return (
			<div id="signup-page" style={styles.pageWrap}>
				<div style={styles.panelWrap}>
					<h1 style={styles.title}>Register Your Account</h1>
					<form action="/api/signup" id="signup-form" method="POST" className="login-form" style={styles.formWrap}>
						<FormControl fullWidth>
							<InputLabel htmlFor="login-email">Email</InputLabel>
							<Input 
								color="primary" 
								id="login-email" 
								name="email"
								onChange={(event) => this.handleChange('email', event)} />
						</FormControl><br /><br />
						<FormControl fullWidth>
							<InputLabel htmlFor="login-password">Password</InputLabel>
							<Input
								color="primary"
								id="login-password"
								name="password"
								type={this.state.showPassword ? 'text' : 'password'}
								onChange={(event) => this.handleChange('password', event)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="Toggle password visibility"
											onClick={()=> this.handleClickShowPasssword()}
											onMouseDown={()=> this.handleMouseDownPassword()}
										>
												{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl><br /><br />
						<div style={{ margin: 'auto'}}>    
							<Button 
								value="Sign In"
								style={styles.button}
								variant="raised" 
								color="primary"
								onClick={ this.handleRegisteration }>
								<FaEnvelope style={{position: 'absolute', left: 8, top: 7, fontSize: '25px'}}/>
								SIGN UP WITH EMAIL
							</Button>
							<p style={{textAlign: 'center', margin: '0 0 10px'}}>OR</p>
								<a href={`${server}/auth/google`} style={{textDecoration: 'none'}}>  
								<Button style={{width: '100%', height: '40px'}} variant="raised" color="secondary">
									<FaGoogle style={{position: 'absolute', left: 8, fontSize: '25px'}}/> 
									<span style={{marginRight: '5px', fontSize: '18px'}}>Sign up With GOOGLE</span>
								</Button>
								</a>
						</div>
						<div style={{marginTop: '40px', textAlign: 'center'}}>
							<p>Already signed up?</p>
							<Link to="/login"><Button>log in</Button></Link>
						</div>
					</form>
					<Snackbar
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						open={open}
						onClose={() => this.setState({open: false})}
						SnackbarContentProps={{ 'aria-describedby': 'message-id' }}
						message={<span id="message-id">{this.state.error && (<font style={{color: '#f00', fontWeight: 800}}>OOPS! </font>)}{message}</span>}
					/>
				</div>
			</div>
		)
	}
}

export default SignUp;