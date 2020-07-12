import React, { useState, useEffect } from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	NumberInput,
	useNotify,
	useRedirect,
	DateInput,
	useDataProvider,
	SelectInput,
} from 'react-admin';

export default (props) => {
	const notify = useNotify();
	const redirect = useRedirect();
	const [vehicles, setVehicles] = useState([]);

	const onSuccess = () => {
		notify('Trip created successfully'); // default message is 'ra.notification.updated'
		redirect('list', props.basePath);
	};

	console.log('vehicles', vehicles);

	const dataProvider = useDataProvider();

	useEffect(() => {
		dataProvider
			.getList('vehicles', {
				pagination: { page: '', perPage: '' },
			})
			.then(({ data }) => {
				setVehicles(data);
			})
			.catch((error) => {
				console.log('error', error);
			});
	}, [dataProvider]);

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
				<SelectInput
					label='Vehicle'
					source='vehicleId'
					choices={vehicles.map(
						({ plateNumber, id, type: { model } }) => ({
							id,
							name: `${model
								.split(' ')
								.map(
									(item) =>
										item.charAt(0).toUpperCase() +
										item.substr(1)
								)
								.join(' ')} - ${plateNumber}`,
						})
					)}
				/>
				<NumberInput label='Price' source='price' />
			</SimpleForm>
		</Create>
	);
};
