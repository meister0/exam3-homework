import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import btnSvgAdd from '../assets/icons/plus.svg';
import Button from '../components/Button/Button';
import List from '../components/List/List';
import SortPopup from '../components/SortPopup/SortPopup';
import { setSortBy } from '../redux/actions/filters';

const Main = ({ title, isSorting, isCount }) => {
	const dispatch = useDispatch();
	const { sortBy } = useSelector(({ filters }) => filters);
	const { count } = useSelector(({ data }) => data.users);
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
						{isCount ? <div className="page__count">{count}</div> : null}
						{isSorting ? (
							<SortPopup
								activeSortType={sortBy}
								items={sortIems}
								onClickSortType={onSelectSortType}
							/>
						) : null}
					</div>
					<Button type="add" path={`${path}/add`}>
						<img className="page-button_ico" src={btnSvgAdd} alt="Button ico" />
					</Button>
				</header>
				<List isSorting={isSorting} />
			</div>
		</div>
	);
};

export default Main;
