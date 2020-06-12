import React from 'react';

const CustomTextField = ({ record = {}, source, format }) => {
	return <span>{format ? format(record[source]) : record[source]}</span>;
};

export default CustomTextField;
