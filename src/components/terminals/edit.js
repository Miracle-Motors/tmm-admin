import React, { useState, useEffect } from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	useDataProvider,
	SelectInput,
	useEditController,
} from 'react-admin';
import FormWrapper from '../form-wrapper';
import { getLgasOptionsByState, getStatesOptions } from '../../libs';

export default (props) => {
	const [locations, setLocation] = useState([]);
	const [stateId, setStateId] = useState('');
	const { record } = useEditController(props);

	const handleSubmit = (data, onSave) => {
		const {
			state: { id: stateId },
			lga: { id: lgaId },
			name,
		} = data;
		const editdata = {
			lgaId,
			stateId,
			name,
		};
		return onSave(editdata);
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

	useEffect(() => {
		if (record) {
			setStateId(record.state.id);
		}
	}, [record]);

	return (
		<Edit {...props}>
			<FormWrapper handleSubmit={handleSubmit}>
				<SimpleForm>
					<TextInput disabled source='id' />
					<TextInput source='name' />
					<SelectInput
						label='State'
						source='state'
						format={(record) => record.id}
						choices={getStatesOptions(locations)}
						onChange={({ target: { value } }) => setStateId(value)}
					/>
					<SelectInput
						label='LGA'
						source='lga'
						format={(record) => record.id}
						choices={getLgasOptionsByState(stateId, locations)}
					/>
				</SimpleForm>
			</FormWrapper>
		</Edit>
	);
};
