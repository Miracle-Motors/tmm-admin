import axios from 'axios';
const apiUrl = 'https://miraclemotors.herokuapp.com/api/v1';

export default {
	// called when the user attempts to log in
	login: ({ phoneNumber, password }) => {
		return axios
			.post(`${apiUrl}/auth/signin`, { phoneNumber, password, isAdmin: true })
			.then(({ data: { data } }) => {
				localStorage.setItem('user', JSON.stringify(data.user));
				localStorage.setItem('refreshToken', data.refreshToken);
				localStorage.setItem('token', data.accessToken);
				return data;
			});
	},
	// called when the user clicks on the logout button
	logout: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('token');
		return Promise.resolve();
	},
	// called when the API returns an error
	checkError: ({ status }) => {
		if (status === 401 || status === 403) {
			localStorage.removeItem('user');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('token');
			return Promise.reject();
		}
		return Promise.resolve();
	},
	// called when the user navigates to a new location, to check for authentication
	checkAuth: () => {
		return localStorage.getItem('token')
			? Promise.resolve()
			: Promise.reject({ redirectTo: '/login' });
	},
	// called when the user navigates to a new location, to check for permissions / roles
	getPermissions: () => Promise.resolve(),
};
