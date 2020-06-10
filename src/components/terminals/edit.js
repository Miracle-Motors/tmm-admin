import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export default (props) => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput disabled source='id' />
			<TextInput source='name' />
		</SimpleForm>
	</Edit>
);
