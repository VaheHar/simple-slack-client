import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonIcon from '@mui/icons-material/Person';

import './Header.css'

const Header = ({ logout }) => {

	return (
		<div className="header">
			<div className="header-left">
				<AccessTimeIcon />
			</div>
			<div className="header-search">
				<SearchIcon />
				<input placeholder="Search" />
			</div>
			<div className="header-right">
				<HelpOutlineIcon />
				<PersonIcon />
				<button onClick={logout}>Logout</button>
			</div>
		</div>
	)
}

export default Header;
