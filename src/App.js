import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';

const App = () => {

	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/auth' element={<Auth />} />
			</ Routes>
		</Router>
	)
}

export default App;    