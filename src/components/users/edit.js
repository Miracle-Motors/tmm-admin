import React from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	SelectInput,
	BooleanInput,
} from 'react-admin';
import EditFormWrapper from '../edit-form-wrapper';

export default (props) => {
	return (
		<Edit {...props}>
			<EditFormWrapper>
				<SimpleForm>
					<TextInput disabled source='id' />
					<TextInput label='First Name' source='firstName' />
					<TextInput label='Last Name' source='lastName' />
					<TextInput
						label='Email Address'
						source='email'
						name='email'
					/>
					<TextInput
						label='Phone Number'
						source='phoneNumber'
						name='phone'
					/>
					<SelectInput
						source='gender'
						choices={[
							{ id: 'female', name: 'Female' },
							{ id: 'male', name: 'Male' },
						]}
					/>
					<TextInput label='Address' source='profile.address' />
					<TextInput
						label='Next of Kin Full Name'
						source='profile.kinFullName'
					/>
					<TextInput
						label='Next of Kin Phone Number'
						source='profile.kinPhoneNumber'
					/>
					<BooleanInput label='Verified' source='verified' />
				</SimpleForm>
			</EditFormWrapper>
		</Edit>
	);
};
