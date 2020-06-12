import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'https://miraclemotors.herokuapp.com/api/v1';

const httpClient = (url, options = {}) => {
	if (!options.headers) {
		options.headers = new Headers({ Accept: 'application/json' });
	}
	const token = localStorage.getItem('token');
	options.headers.set('Authorization', `Bearer ${token}`);
	return fetchUtils.fetchJson(url, options);
};

export default {
	getList: (resource, params) => {
		const { page, perPage: limit } = params.pagination;
		const query = {
			page,
			limit,
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ json }) => {
			return {
				data: json.data,
				total: json.data.length,
			};
		});
	},

	getOne: (resource, params) => {
		if (resource === 'terminals' || resource === 'trips')
			return Promise.resolve({
				currentPage: 1,
				data: {},
				message: 'OK',
				nextPage: null,
				prevPage: null,
				status: true,
				totalPages: 1,
			});
		return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
			({ json }) => ({
				data: json,
			})
		);
	},

	getMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;
		return httpClient(url).then(({ json }) => ({ data: json }));
	},

	getManyReference: (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify({
				...params.filter,
				[params.target]: params.id,
			}),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		return httpClient(url).then(({ headers, json }) => ({
			data: json,
			total: parseInt(headers.get('content-range').split('/').pop(), 10),
		}));
	},

	update: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json })),

	updateMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		};
		return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
			method: 'PUT',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},

	create: (resource, params) =>
		httpClient(`${apiUrl}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
		})),

	delete: (resource, params) =>
		httpClient(`${apiUrl}/${resource}/${params.id}`, {
			method: 'DELETE',
		}).then(({ json }) => ({ data: json })),

	deleteMany: (resource, params) => {
		const query = {
			filter: JSON.stringify({ id: params.ids }),
		};
		return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
			method: 'DELETE',
			body: JSON.stringify(params.data),
		}).then(({ json }) => ({ data: json }));
	},
};
