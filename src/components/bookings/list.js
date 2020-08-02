import React from 'react';
import { List, Datagrid, TextField, SimpleList, ShowButton } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import CustomTextField from '../custom-text-field';
import moment from 'moment';

export default (props) => {
	const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
	return (
		<List
			exporter={false}
			bulkActionButtons={false}
			title='List of Bookings'
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
					<TextField
						sortable={false}
						label='Booking ID'
						source='id'
					/>
					<TextField
						sortable={false}
						label='Reference ID'
						source='referenceId'
					/>
					<TextField sortable={false} label='Type' source='type' />
					<TextField
						sortable={false}
						label='Number Of Travellers'
						source='numberOfTravellers'
					/>
					<TextField
						sortable={false}
						label='Payment'
						source='payment.method'
					/>
					<TextField
						sortable={false}
						label='Amount'
						source='payment.amount'
					/>
					<TextField
						sortable={false}
						label='Departure Terminal'
						source='trip.departureTerminal.name'
					/>
					<TextField
						sortable={false}
						label='Arrival Terminal'
						source='trip.arrivalTerminal.name'
					/>
					<CustomTextField
						sortable={false}
						label='Departure Date'
						source='trip.departureTimestamp'
						format={(date) => moment(date).format('DD/MM/YYYY')}
					/>
					<ShowButton />
				</Datagrid>
			)}
		</List>
	);
};
