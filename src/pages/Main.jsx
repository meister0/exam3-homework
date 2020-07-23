import React from 'react';
import Button from '../components/Button/Button';
import btnSvg from '../assets/icons/plus.svg';
import List from '../components/List/List';
import SortPopup from '../components/SortPopup/SortPopup';
import { setSortBy } from '../redux/actions/filters';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';
import SinglePage from './SinglePage';

const Main = ({ title }) => {
	const dispatch = useDispatch();
	const { sortBy } = useSelector(({ filters }) => filters);
	const { path } = useRouteMatch();

	const sortIems = [
		{ name: 'Книгам', type: 'books' },
		{ name: 'Авторам', type: 'authors' },
	];

	const onSelectSortType = React.useCallback(
		(type) => {
			dispatch(setSortBy(type));
		},
		[dispatch]
	);

	return (
		<div className="page">
			<div className="wrapper">
				<header className="page__header">
					<div className="box">
						<h1 className="page__title">Список {title}</h1>
						{title === 'Книг' ? (
							<SortPopup
								activeSortType={sortBy}
								items={sortIems}
								onClickSortType={onSelectSortType}
							/>
						) : null}
					</div>
					<Button type="add" path={`${path}/add`}>
						<img className="page-button_ico" src={btnSvg} alt="Button ico" />
					</Button>
				</header>
				<List />
			</div>
			<Route path={`${path}/:id`}>
				<SinglePage />
			</Route>
		</div>
	);
};

export default Main;
