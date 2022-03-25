import React, { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Home = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const logout = () => {
		dispatch({ type: 'LOGOUT' });

		navigate('/auth');

		setUser(null);
	};

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('profile')));
		if (!user)
			navigate('/auth');
	}, [location])

	return (
		<div className='app'>
			<Header logout={logout} />
			<div className='app-body'>
				<Sidebar user={user} />
			</div>
		</div>
	)
}

export default Home