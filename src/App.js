// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import {
	TerminalsList,
	CreateTerminal,
	EditTerminal,
} from './components/terminals';
import Login from './components/login';
// import { UsersList } from './components/users';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
// import UserIcon from '@material-ui/icons/Group';
import authProvider from './providers/authProvider';
import dataProvider from './providers/dataProvider';

const App = () => (
	<Admin
		title='The Miracle Motor Admin'
		authProvider={authProvider}
		loginPage={Login}
		dataProvider={dataProvider}>
		<Resource
			name='terminals'
			list={TerminalsList}
			edit={EditTerminal}
			create={CreateTerminal}
			icon={DirectionsBus}
		/>
	</Admin>
);

export default App;
