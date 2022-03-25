import React from 'react';

import './SidebarOption.css';

const SidebarOption = ({ Icon, title, handleWorkspaceForm, handleJoinWorkspace }) => {
	return (
		<div className="sidebarOption" onClick={() => (handleWorkspaceForm && handleWorkspaceForm()) || (handleJoinWorkspace && handleJoinWorkspace())}>
			{Icon && <Icon className="sidebarOption-icon" />}
			{Icon ? (
				<h3>{title}</h3>
			) : (
				<h3 className='sidebarOption-channel'>
					<span className='sidebarOption-hash'># {title}</span>
				</h3>
			)}
		</div>
	)
}

export default SidebarOption