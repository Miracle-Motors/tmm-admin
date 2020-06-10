import React from 'react';
import { List, Datagrid, TextField, EditButton, SimpleList } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

export default (props) => {
	const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	return (
		<List exporter={false} title='List of Terminals' {...props}>
			{isSmall ? (
				<SimpleList
					primaryText={({ lga: { name } }) => name}
					secondaryText={({ name }) => name}
					tertiaryText={({ state: { name } }) => name}
				/>
			) : (
				<Datagrid>
					<TextField source='id' />
					<TextField sortable={false} source='name' />
					<TextField sortable={false} label='LGA' source='lga.name' />
					<TextField
						sortable={false}
						label='State'
						source='state.name'
					/>
					<EditButton />
				</Datagrid>
			)}
		</List>
	);
};
