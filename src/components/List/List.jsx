import React from 'react';
import { useSelector } from 'react-redux';
import Item from '../Item/Item';
import Loading from '../Loading/Loading';

const List = () => {
	const items = useSelector(({ data }) => data.books);
	const type = useSelector(({ filters }) => filters.sortBy);

	const sorting = (a, b, type) => {
		switch (type) {
			case 'authors':
				return a.authorId > b.authorId ? 1 : a.authorId < b.authorId ? -1 : 0;
			case 'books':
				return a.title[0] > b.title[0] ? 1 : a.title[0] < b.title[0] ? -1 : 0;
			default:
				throw new Error('[List.jsx]');
		}
	};

	let sortedItems = (items, type) => {
		return items.sort((a, b) => sorting(a, b, type));
	};

	return (
		<main className="main">
			{items.length === 0 ? (
				<Loading />
			) : (
				sortedItems(items, type).map((item) => (
					<Item key={item.id} item={item} />
				))
			)}
		</main>
	);
};

export default List;
