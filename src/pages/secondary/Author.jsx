import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

const Author = () => {
	const store = useSelector(({ data }) => data);
	const storeAuthors = store.authors;
	const storeBooks = store.books;

	const { url } = useRouteMatch();
	const itemIdURL = +url.match(/\d+/);
	const itemNameURL = url.match(/\w+/)[0];

	const author = storeAuthors.find((author) => author.id === itemIdURL);

	const { id, firstName, lastName, info, birthday } = author ? author : {};
	const birthdayFormated = moment(birthday).format('D MMMM yyyy');

	const books = storeBooks.filter((book) => book.authorId === id);
	return (
		<div className="single-page page">
			<div className="wrapper">
				<div className="single-page__item">
					<Link to={`/${itemNameURL}`} className="single-page__headers">
						Список авторов
					</Link>
					<span className="single-page__slash">/</span>
					<p className="single-page__title">
						{lastName} {firstName}
					</p>
				</div>
				<div className="single-page__item">
					<h4 className="single-page__headers">Дата рождения:</h4>{' '}
					<p className="single-page__content">{birthdayFormated}</p>
				</div>
				<div className="single-page__item">
					<h4 className="single-page__headers">Описание:</h4>{' '}
					<p className="single-page__content">{info}</p>
				</div>
				<div className="single-page__item">
					<h4 className="single-page__headers">Список книг:</h4>
					{
						<p className="single-page__content">
							{books.map((book, i) => (
								<span key={book.id}>
									"{book.title}"{books.length - 1 === i ? '.' : ', '}
								</span>
							))}
						</p>
					}
				</div>
			</div>
		</div>
	);
};

export default Author;
