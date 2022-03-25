import React, { useState, useEffect } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { useDebounce } from 'use-debounce';
import { useDispatch } from 'react-redux';
import { createWorkspace, getWorkspace } from '../../actions/workspace';
import { useSelector } from 'react-redux';
import { getSuggestions } from '../../api';

import SidebarOption from '../SidebarOption/SidebarOption';
import './Sidebar.css';

const Sidebar = ({ user }) => {
	const [workspaceForm, setWorkspaceForm] = useState(false);
	const [workspaceName, setWorkspaceName] = useState('');
	const [searchText, setSearchText] = useState('');
	const [searchInput, setSearchInput] = useState(false);
	const [debouncedValue] = useDebounce(workspaceName, 300);
	const workspace = useSelector((state) => state.workspace);
	const [suggestions, setSuggestions] = useState([]);
	const dispatch = useDispatch();

	const handleWorkspaceForm = () => setWorkspaceForm((prevWorkspaceForm) => !prevWorkspaceForm);
	const handleJoinWorkspace = () => setSearchInput((prevSearchInput) => !prevSearchInput);

	const onWorkspaceSubmit = (e) => {
		e.preventDefault();
		dispatch(createWorkspace(workspaceName));
		setWorkspaceForm(false);
		setWorkspaceName('');
		setSuggestions([]);
	};

	const onJoinClick = () => {
		dispatch(getWorkspace(searchText));
		setSearchText('');
	}

	useEffect(() => {
		const suggest = async () => {
			const { data } = await getSuggestions(debouncedValue);
			setSuggestions(data.sugestion);
		}
		if (debouncedValue) suggest();
	}, [debouncedValue])

	useEffect(() => {
	}, [workspace])

	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<div className="sidebar-info">
					<h2>{workspace ? workspace.name || workspace[0]?.name : 'No active workspace'}</h2>
					<h3>
						<FiberManualRecordIcon />
						{user?.result?.name}
					</h3>
				</div>
				<CreateIcon />
			</div>
			<SidebarOption Icon={InsertCommentIcon} title="Threads" />
			<SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
			<SidebarOption Icon={ConnectWithoutContactIcon} title="Slack Connect" />
			<SidebarOption Icon={MoreVertIcon} title="More" />
			<hr />
			{/* <SidebarOption Icon={ArrowDropDownIcon} title="Workspaces"/> */}
			<SidebarOption Icon={AddIcon} title="Join workspace" handleJoinWorkspace={handleJoinWorkspace} />
			{
				searchInput && <div>
					<input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
					<button onClick={onJoinClick}>Join</button>
				</div>
			}
			<SidebarOption Icon={CreateIcon} title="Create workspace" handleWorkspaceForm={handleWorkspaceForm} />
			{workspaceForm && (
				<form onSubmit={onWorkspaceSubmit}>
					<input type="text" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
					<button type='submit'>Create</button>
				</form>
			)}
			{
				!!suggestions.length && workspaceName && (
					<div>
						<p>{suggestions[0]}</p>
						<p>{suggestions[1]}</p>
					</ div>
				)
			}
			<hr />
			<SidebarOption Icon={ArrowDropDownIcon} title="Channels" />
			<SidebarOption Icon={AddIcon} title="Add channels" />

		</div>
	)
}

export default Sidebar;