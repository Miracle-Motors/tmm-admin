// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostsList, CreatePost, EditPost } from './components/posts';
import { UsersList } from './components/users';
import Dashboard from './components/dashboard';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import authProvider from './providers/authProvider';
// import dataProvider from './dataProvider';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
	<Admin
		dashboard={Dashboard}
		authProvider={authProvider}
		dataProvider={dataProvider}>
		<Resource
			name='posts'
			list={PostsList}
			edit={EditPost}
			create={CreatePost}
			icon={PostIcon}
		/>
		<Resource name='users' list={UsersList} icon={UserIcon} />
	</Admin>
);

export default App;
