import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';

const Item = ({ item }) => {
	const { path } = useRouteMatch();
	const history = useHistory();
	const authors = useSelector((state) => state.data.authors);

	let authorName = '';
	authors.map((author) => {
		if (author.id === item.authorId)
			authorName = author.lastName + ' ' + author.firstName[0] + '.';
		return author;
	});

	return (
		<div className="item" onClick={() => history.push(`${path}/${item.id}`)}>
			<span className="item__title">{item.title} </span>
			<span className="item__author">{authorName}</span>
		</div>
	);
};

export default Item;
