import React, { useState } from 'react';
import { Avatar, Button, Typography, Paper, Grid, Container } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

	const switchMode = () => {
		setIsSignup((prevIsSignip) => !prevIsSignip);
		setShowPassword(false);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			dispatch(signup(formData, navigate));
		} else {
			dispatch(signin(formData, navigate));
		}
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
							</>
						)}
						<Input name="email" label="Email Address" handleChange={handleChange} type="email" />
						<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
						{isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ color: 'white', backgroundColor: '#3f0f40' }}>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode} sx={{ color: '#3f0f40' }}>
								{isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
}

export default Auth