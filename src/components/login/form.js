import * as React from 'react';
import { Field, Form } from 'react-final-form';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {
	useTranslate,
	useLogin,
	useNotify,
	useSafeSetState,
} from 'react-admin';

const useStyles = makeStyles(
	(theme) => ({
		form: {
			padding: '0 1em 1em 1em',
		},
		input: {
			marginTop: '1em',
		},
		button: {
			width: '100%',
		},
		icon: {
			marginRight: theme.spacing(1),
		},
	}),
	{ name: 'RaLoginForm' }
);

const Input = ({
	meta: { touched, error }, // eslint-disable-line react/prop-types
	input: inputProps, // eslint-disable-line react/prop-types
	...props
}) => (
	<TextField
		error={!!(touched && error)}
		helperText={touched && error}
		{...props}
		{...inputProps}
		fullWidth
	/>
);

export default (props) => {
	const redirectTo = '/';
	const [loading, setLoading] = useSafeSetState(false);
	const login = useLogin();
	const translate = useTranslate();
	const notify = useNotify();
	const classes = useStyles(props);

	const validate = (values) => {
		const errors = { phoneNumber: undefined, password: undefined };

		if (!values.phoneNumber) {
			errors.phoneNumber = translate('ra.validation.required');
		}
		if (!values.password) {
			errors.password = translate('ra.validation.required');
		}
		return errors;
	};

	const submit = async (values) => {
		setLoading(true);
		try {
			await login(values, redirectTo);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			notify(
				error.response.data.message || 'ra.auth.sign_in_error',
				'warning'
			);
		}
	};

	return (
		<Form
			onSubmit={submit}
			validate={validate}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} noValidate>
					<div className={classes.form}>
						<div className={classes.input}>
							<Field
								autoFocus
								id='phoneNumber'
								name='phoneNumber'
								component={Input}
								label='Phone Number'
								disabled={loading}
								type='phone'
							/>
						</div>
						<div className={classes.input}>
							<Field
								id='password'
								name='password'
								component={Input}
								label={translate('ra.auth.password')}
								type='password'
								disabled={loading}
								autoComplete='current-password'
							/>
						</div>
					</div>
					<CardActions>
						<Button
							variant='contained'
							type='submit'
							color='primary'
							disabled={loading}
							className={classes.button}>
							{loading && (
								<CircularProgress
									className={classes.icon}
									size={18}
									thickness={2}
								/>
							)}
							{translate('ra.auth.sign_in')}
						</Button>
					</CardActions>
				</form>
			)}
		/>
	);
};
