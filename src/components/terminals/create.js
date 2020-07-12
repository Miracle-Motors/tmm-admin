import React, { useState, useEffect } from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	useNotify,
	useRedirect,
	useDataProvider,
	SelectInput,
} from 'react-admin';
import { getLgasOptionsByState, getStatesOptions } from '../../libs';

export default (props) => {
	const [locations, setLocation] = useState([]);
	const [stateId, setStateId] = useState('');
	const notify = useNotify();
	const redirect = useRedirect();
	const onSuccess = () => {
		notify('Terminal created successfully'); // default message is 'ra.notification.updated'
		redirect('list', props.basePath);
	};
	const dataProvider = useDataProvider();

	useEffect(() => {
		dataProvider
			.getList('locations/states', {
				pagination: { page: '', perPage: '' },
			})
			.then(({ data }) => {
				setLocation(data);
			})
			.catch((error) => {
				console.log('error', error);
			});
	}, [dataProvider]);

	return (
		<Create {...props} onSuccess={onSuccess}>
			<SimpleForm redirect='list'>
				<TextInput label='Name' source='name' />
				<SelectInput
					label='State'
					source='stateId'
					choices={getStatesOptions(locations)}
					onChange={({ target: { value } }) => setStateId(value)}
				/>
				<SelectInput
					label='LGA'
					source='lgaId'
					choices={getLgasOptionsByState(stateId, locations)}
				/>
			</SimpleForm>
		</Create>
	);
};
