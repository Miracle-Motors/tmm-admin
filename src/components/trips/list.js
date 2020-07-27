import React from 'react';
import { List, Datagrid, TextField, SimpleList } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import CustomTextField from '../custom-text-field';
import moment from 'moment';

export default (props) => {
	const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	return (
		<List
			exporter={false}
			bulkActionButtons={false}
			title='List of Trips'
			{...props}>
			{isSmall ? (
				<SimpleList
					primaryText={({ arrivalTerminal: { name } }) => name}
					secondaryText={({ departureTerminal: { name } }) => name}
					tertiaryText={({ departureTimestamp }) =>
						moment(departureTimestamp).format('DD/MM/YYYY')
					}
				/>
			) : (
				<Datagrid>
					<TextField sortable={false} label='Trip ID' source='id' />
					<TextField
						sortable={false}
						label='Departure Terminal'
						source='departureTerminal.name'
					/>
					<TextField
						sortable={false}
						label='Arrival Terminal'
						source='arrivalTerminal.name'
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
							seats?.filter(
								(seat) => seat?.status === 'available'
							)?.length
						}
					/>
					<CustomTextField
						sortable={false}
						source='price'
						format={(price) => `${price} NGN`}
					/>
					<TextField sortable={false} source='status' />
				</Datagrid>
			)}
		</List>
	);
};
