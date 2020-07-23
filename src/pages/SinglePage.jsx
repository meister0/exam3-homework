import React, { useEffect } from 'react';
import Button from '../components/Button/Button';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetData } from '../redux/actions/data';
const SinglePage = (props) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const state = useSelector((state) => state.state);
	const { url } = useRouteMatch();

	const obj = { book: 'GET_BOOK', author: 'GET_AUTHOR', user: 'GET_USER' };

	useEffect(() => {
		dispatch(fetchGetData(url, 'GET_BOOK'));
	});
	// const { title, info, authorId, userId } = props.data;

	// const store = [];
	// const { data: authorsList } = store.library.authors;
	// const { data: usersList } = store.library.users;

	// const author = authorsList.find((author) => author.id === authorId);
	// const user = usersList.find((user) => user.id === userId);

	return (
		<>
			Название:
			{/* {title}
			{author ? (
				<>
					Автор: {author.firstName} {author.lastName}
				</>
			) : null}
			Информация: {info}
			{user ? (
				<>
					Статус: Выдана {user.firstName} {user.lastName}
				</>
			) : (
				<>Статус: Доступна</>
			)}
			<Button type="primary" onClick={() => props.onBtnClick(id)}>
				Изменить
			</Button> */}
		</>
	);
};

export default SinglePage;
