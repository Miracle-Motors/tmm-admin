import { cloneElement } from 'react';

const FormWrapper = (props) => {
	const { save, children, ...rest } = props;
	return children
		? cloneElement(props.children, {
				...rest,
				save: props.handleSubmit
					? (data) => props.handleSubmit(data, save)
					: save,
		  })
		: null;
};

export default FormWrapper;
