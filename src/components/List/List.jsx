import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import sorting from '../../helpers/sorting';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';

const List = ({ isSorting }) => {
	const { url } = useRouteMatch();
	const itemNameURL = url.match(/\w+/)[0];
	const items = useSelector(({ data }) => {
		return itemNameURL === 'user'
			? data[itemNameURL + 's'].rows
			: data[itemNameURL + 's'];
	});
	const type = useSelector(({ filters }) =>
		itemNameURL === 'user' ? 'users' : filters.sortBy
	);

	let sortedItems = (items, type) => {
		return isSorting || itemNameURL === 'user'
			? items.sort((a, b) => sorting(a, b, type))
			: items;
	};

	return (
		<main className="main">
			{items.length === 0 ? (
				<Loading />
			) : (
				sortedItems(items, type).map((item) => (
					<Item key={item.id} item={item} type={itemNameURL} />
				))
			)}
		</main>
	);
};

export default List;
