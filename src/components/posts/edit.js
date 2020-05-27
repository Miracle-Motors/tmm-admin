import React from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	ReferenceInput,
	SelectInput,
} from 'react-admin';

export default (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled source='id' />
			<ReferenceInput source='userId' reference='users'>
				<SelectInput optionText='name' />
			</ReferenceInput>
			<TextInput multiline source='body' />
		</SimpleForm>
	</Edit>
);
