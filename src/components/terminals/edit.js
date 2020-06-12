import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';
import EditFormWrapper from '../edit-form-wrapper';

export default (props) => {
	const handleSubmit = (data, onSave) => {
		const {
			state: { id: state },
			lga: { id: lga },
			name,
		} = data;
		const editdata = {
			lga,
			state,
			name,
		};
		return onSave(editdata);
	};
	return (
		<Edit {...props}>
			<EditFormWrapper handleSubmit={handleSubmit}>
				<SimpleForm>
					<TextInput disabled source='id' />
					<TextInput source='name' />
					<NumberInput
						source='state'
						format={(record) => record.id}
					/>
					<NumberInput source='lga' format={(record) => record.id} />
				</SimpleForm>
			</EditFormWrapper>
		</Edit>
	);
};
