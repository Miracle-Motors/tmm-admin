import React from 'react';
import {
	List,
	Datagrid,
	TextField,
	EmailField,
	SimpleList,
	EditButton,
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

export default (props) => {
	const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	return (
		<List
			exporter={false}
			bulkActionButtons={false}
			title='List of Users'
			{...props}>
			{isSmall ? (
				<SimpleList
					primaryText={(firstName) => firstName}
					secondaryText={(lastName) => lastName}
					tertiaryText={(email) => email}
				/>
			) : (
				<Datagrid>
					<TextField sortable={false} label='User ID' source='id' />
					<TextField sortable={false} source='firstName' />
					<TextField sortable={false} source='lastName' />
					<EmailField sortable={false} source='email' />
					<TextField sortable={false} source='phoneNumber' />
					<EditButton />
				</Datagrid>
			)}
		</List>
	);
};
