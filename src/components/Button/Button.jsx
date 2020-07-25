import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Button = ({ type, path, children, onClick, browserType, disabled }) => {
	let btnClass = classNames({
		page__button: type === 'add' || type === 'edit',
		page__button_add: type === 'add',
		page__button_edit: type === 'edit',
		page__button_submit: type === 'save',
	});

	return type === 'add' ? (
		<Link to={path} className={btnClass}>
			{children}
		</Link>
	) : (
		<button
			onClick={onClick ? onClick : null}
			disabled={disabled ? disabled : false}
			className={btnClass}
			type={browserType}
		>
			{children}
		</button>
	);
};

export default Button;
