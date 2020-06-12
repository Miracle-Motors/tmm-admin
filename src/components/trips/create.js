import React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	NumberInput,
	useNotify,
	useRedirect,
	DateInput,
} from 'react-admin';

export default (props) => {
	const notify = useNotify();
	const redirect = useRedirect();
	const onSuccess = () => {
		notify('Trip created successfully'); // default message is 'ra.notification.updated'
		redirect('list', props.basePath);
	};

	return (
		<Create {...props} onSuccess={onSuccess}>
			<SimpleForm redirect='list'>
				<TextInput
					label='Arrival Terminal ID'
					source='arrivalTerminalId'
				/>
				<TextInput
					label='Departure Terminal ID'
					source='departureTerminalId'
				/>
				<DateInput label='Departure Time' source='departureTimestamp' />
				<TextInput label='Vehicle ID' source='vehicleId' />
				<NumberInput label='Price' source='price' />
			</SimpleForm>
		</Create>
	);
};
