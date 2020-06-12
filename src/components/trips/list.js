import React from 'react';
import { List, Datagrid, TextField, EditButton, SimpleList } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import CustomTextField from '../custom-text-field';
import moment from 'moment';

export default (props) => {
	const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	return (
		<List exporter={false} title='List of Trips' {...props}>
			{isSmall ? (
				<SimpleList
					primaryText={({ lga: { name } }) => name}
					secondaryText={({ name }) => name}
					tertiaryText={({ state: { name } }) => name}
				/>
			) : (
				<Datagrid>
					<TextField sortable={false} source='id' />
					<TextField
						sortable={false}
						label='Arrival Terminal'
						source='arrivalTerminal.name'
					/>
					<TextField
						sortable={false}
						label='Departure Terminal'
						source='departureTerminal.name'
					/>
					<CustomTextField
						sortable={false}
						label='Departure Times'
						source='departureTimestamp'
						format={(date) => moment(date).format('DD/MM/YYYY')}
					/>
					<CustomTextField
						sortable={false}
						label='Available Seats'
						source='seats'
						format={(seats) =>
							seats.filter((seat) => seat.status === 'available')
								.length
						}
					/>
					<CustomTextField
						sortable={false}
						source='price'
						format={(price) => `${price} NGN`}
					/>
					<TextField sortable={false} source='status' />
					<EditButton />
				</Datagrid>
			)}
		</List>
	);
};
