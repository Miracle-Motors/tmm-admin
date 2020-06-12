import React from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	NumberInput,
	useNotify,
	DateInput,
	useRedirect,
} from 'react-admin';

export default (props) => {
	const notify = useNotify();
	const redirect = useRedirect();
	const onSuccess = () => {
		notify('Trip updated successfully'); // default message is 'ra.notification.updated'
		redirect('list', props.basePath);
	};
	const transform = (data) => {
		console.log(data);
		return {
			...data,
		};
	};
	console.log(props);
	return (
		<Edit {...props} transform={transform} onSuccess={onSuccess}>
			<SimpleForm>
				<TextInput disabled source='id' />
				<TextInput
					label='Arrival Terminal ID'
					source='arrivalTerminal.id'
					// name='arrivalTerminalId'
				/>
				<TextInput
					label='Departure Terminal ID'
					source='departureTerminal.id'
					// name='departureTerminalId'
				/>
				<DateInput label='Departure Time' source='departureTimestamp' />
				<TextInput
					label='Vehicle ID'
					source='vehicle.id'
					// name='vehicleId'
				/>
				<NumberInput label='Price' source='price' />
			</SimpleForm>
		</Edit>
	);
};
