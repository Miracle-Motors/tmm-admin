// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import {
	TerminalsList,
	CreateTerminal,
	EditTerminal,
} from './components/terminals';
import { TripsList, CreateTrip } from './components/trips';
import { BookingsList, BookingsShow } from './components/bookings';
import Login from './components/login';
import { UsersList, EditUser } from './components/users';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
import Receipt from '@material-ui/icons/Receipt';
import CardTravel from '@material-ui/icons/CardTravel';
import UserIcon from '@material-ui/icons/Group';
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
		<Resource
			name='trips'
			list={TripsList}
			create={CreateTrip}
			icon={CardTravel}
		/>
		<Resource
			name='bookings'
			show={BookingsShow}
			list={BookingsList}
			icon={Receipt}
		/>
		<Resource
			name='users'
			list={UsersList}
			edit={EditUser}
			icon={UserIcon}
		/>
	</Admin>
);

export default App;
