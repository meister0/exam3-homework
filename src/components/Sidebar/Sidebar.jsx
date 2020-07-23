import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {
	return (
		<aside className="sidebar">
			<h2 className="sidebar__title">Меню</h2>
			<nav className="nav">
				<NavLink className="nav__link" to="/book">
					Книги
				</NavLink>
				<NavLink className="nav__link" to="/author">
					Авторы
				</NavLink>
				<NavLink className="nav__link" to="/user">
					Пользователи
				</NavLink>
			</nav>
		</aside>
	);
};

export default Sidebar;
