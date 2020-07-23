import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Button = (props) => {
	let btnClass = classNames({
		page__button: props.type === 'add' || props.type === 'edit',
		page__button_add: props.type === 'add',
		page__button_edit: props.type === 'edit',
	});
	if (props.type === 'add')
		return (
			<Link to={props.path} className={btnClass}>
				{props.children}
			</Link>
		);
	else return <button className={btnClass}>{props.children}</button>;
};

export default Button;
