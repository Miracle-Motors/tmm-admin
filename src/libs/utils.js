export const getStatesOptions = (locations = []) =>
	locations.map(({ name, id }) => ({ name, id }));

export const getLgasOptionsByState = (stateId = '', locations = []) => {
	const state = locations.find(({ id }) => id === stateId);
	return state?.lgas.map(({ name, id }) => ({ name, id })) || [];
};
