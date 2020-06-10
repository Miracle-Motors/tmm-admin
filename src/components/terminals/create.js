import React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	NumberInput,
	useNotify,
	useRedirect,
} from 'react-admin';

export default (props) => {
	const notify = useNotify();
	const redirect = useRedirect();
	const onSuccess = () => {
		notify('Terminal created successfully'); // default message is 'ra.notification.updated'
		redirect('list', props.basePath);
	};
	return (
		<Create {...props} onSuccess={onSuccess}>
			<SimpleForm redirect='list'>
				<TextInput label='Name' source='name' />
				<NumberInput label='State ID' source='stateId' />
				<NumberInput label='LGA ID' source='lgaId' />
			</SimpleForm>
		</Create>
	);
};
