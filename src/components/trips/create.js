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
import FormWrapper from '../form-wrapper';
import moment from 'moment';
import { omit } from 'lodash';

export default (props) => {
	const notify = useNotify();
	const redirect = useRedirect();
	const [vehicles, setVehicles] = useState([]);

	const onSuccess = () => {
		notify('Trip created successfully'); // default message is 'ra.notification.updated'
		redirect('list', props.basePath);
	};

	const dataProvider = useDataProvider();

	const handleSubmit = (data, onSave) => {
		
		const creationData = {
			...omit(data, ['departureTimestamp']),
			departureTimestamp: moment(data.departureTimestamp).format(
				'YYYY-MM-DD HH:mm:ss'
			),
		};
		return onSave(creationData);
	};

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
			<FormWrapper handleSubmit={handleSubmit}>
				<SimpleForm redirect='list'>
					<TextInput
						label='Departure Terminal ID'
						source='departureTerminalId'
					/>
					<TextInput
						label='Arrival Terminal ID'
						source='arrivalTerminalId'
					/>
					<DateInput
						label='Departure Time'
						source='departureTimestamp'
					/>
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
			</FormWrapper>
		</Create>
	);
};
