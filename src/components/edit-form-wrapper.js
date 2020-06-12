import { cloneElement } from 'react';

const EditFormWrapper = (props) => {
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

export default EditFormWrapper;
