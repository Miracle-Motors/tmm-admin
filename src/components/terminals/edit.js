import React from 'react';
import {
	Edit,
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
		notify('Terminal updated successfully'); // default message is 'ra.notification.updated'
		redirect('list', props.basePath);
	};
	return (
		<Edit {...props} onSuccess={onSuccess}>
			<SimpleForm>
				<TextInput disabled source='id' />
				<TextInput source='name' />
				<NumberInput source='state' format={(record) => record.id} />
				<NumberInput source='lga' format={(record) => record.id} />
			</SimpleForm>
		</Edit>
	);
};
