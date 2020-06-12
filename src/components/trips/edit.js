import React from 'react';
import {
	Edit,
	SimpleForm,
	TextInput,
	NumberInput,
	DateInput,
} from 'react-admin';
import EditFormWrapper from '../edit-form-wrapper';

export default (props) => {
	const handleSubmit = (data, onSave) => {
		const {
			arrivalTerminal: { id: arrivalTerminalId },
			departureTerminal: { id: departureTerminalId },
			departureTimestamp,
			vehicle: { id: vehicleId },
			price,
		} = data;
		const editdata = {
			arrivalTerminalId,
			departureTerminalId,
			departureTimestamp,
			vehicleId,
			price,
		};
		return onSave(editdata);
	};

	return (
		<Edit {...props}>
			<EditFormWrapper handleSubmit={handleSubmit}>
				<SimpleForm>
					<TextInput disabled source='id' />
					<TextInput
						label='Arrival Terminal ID'
						source='arrivalTerminal.id'
					/>
					<TextInput
						label='Departure Terminal ID'
						source='departureTerminal.id'
					/>
					<DateInput
						label='Departure Time'
						source='departureTimestamp'
					/>
					<TextInput label='Vehicle ID' source='vehicle.id' />
					<NumberInput label='Price' source='price' />
				</SimpleForm>
			</EditFormWrapper>
		</Edit>
	);
};
