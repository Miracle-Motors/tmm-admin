import React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	ReferenceInput,
	SelectInput,
} from 'react-admin';

export default (props) => (
	<Create {...props}>
		<SimpleForm>
			<ReferenceInput source='userId' reference='users'>
				<SelectInput optionText='name' />
			</ReferenceInput>
			<TextInput multiline source='body' />
		</SimpleForm>
	</Create>
);
