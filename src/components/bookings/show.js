// in src/posts.js
import * as React from 'react';
import {
	Show,
	SimpleShowLayout,
	TextField,
	ArrayField,
	Datagrid,
	EmailField,
	DateField,
} from 'react-admin';
import CustomTextField from '../custom-text-field';
import moment from 'moment';

export default (props) => (
	<Show {...props}>
		<SimpleShowLayout>
			<TextField label='Reference ID' source='referenceId' />
			<TextField sortable={false} label='Type' source='type' />
			<TextField
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
			<DateField
				label='Departure Date'
				source='trip.departureTimestamp'
			/>
			<ArrayField label='Passengers' source='passengers'>
				<Datagrid>
					<TextField label='Full Name' source='name' />
					<TextField label='Phone Number' source='phoneNumber' />
					<EmailField label='Email Address' source='email' />
					<TextField label='Address' source='address' />
				</Datagrid>
			</ArrayField>
			<ArrayField source='seats'>
				<Datagrid>
					<TextField label='Seat Number' source='seatNumber' />
					<TextField label='Status' source='status' />
				</Datagrid>
			</ArrayField>
		</SimpleShowLayout>
	</Show>
);
