import React from 'react';
import { TextInput, ReferenceInput, SelectInput, Filter } from 'react-admin';

export default (props) => (
	<Filter {...props}>
		<TextInput label='Search' source='q' alwaysOn />
		<ReferenceInput
			label='User'
			source='userId'
			reference='users'
			allowEmpty>
			<SelectInput optionText='name' />
		</ReferenceInput>
	</Filter>
);
