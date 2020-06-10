import * as React from 'react';
import { Notification } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import * as ReactAdmin from 'react-admin';
import Form from './form';

const Login = (props) => {
	return (
		<ThemeProvider>
			<ReactAdmin.Login {...props}>
				<Form {...props} />
			</ReactAdmin.Login>
			<Notification />
		</ThemeProvider>
	);
};

export default Login;
