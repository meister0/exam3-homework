import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import btnSvgEdit from '../../assets/icons/edit.svg';
import Button from '../../components/Button/Button';
import BooksSchema from '../../components/Formik/BooksSchema';
import sorting from '../../helpers/sorting';
import { SET_BOOKS } from '../../redux/actions/actionTypes';
import { patchDataThunk } from '../../redux/actions/data';

const Book = () => {
	const dispatch = useDispatch();
	const store = useSelector(({ data }) => data);
	const storeAuthors = store.authors;
	const storeUsers = store.users.rows;
	const storeBooks = store.books;

	let [isEditable, setIsEditable] = useState(false);

	const { url } = useRouteMatch();
	const itemIdURL = +url.match(/\d+/);
	const itemNameURL = url.match(/\w+/)[0];

	const book = storeBooks.find((book) => book.id === itemIdURL);
	const { id, title, info, authorId, userId } = book ? book : {};

	const author = storeAuthors.find((author) => author.id === +authorId);
	const user = storeUsers.find((user) => user.id === +userId);
	return (
		<Formik
			initialValues={{
				id: id,
				title: title,
				authorId: author && author.id ? author.id : '',
				info: info,
				userId: user && user.id ? user.id : '',
			}}
			enableReinitialize={true}
			validationSchema={BooksSchema}
			onSubmit={(data) => {
				const tData = {
					id: data.id,
					title: data.title,
					authorId: +data.authorId,
					info: data.info,
					userId: data.userId !== '' ? +data.userId : null,
				};
				dispatch(
					patchDataThunk(url, tData, SET_BOOKS, storeBooks, setIsEditable)
				);
			}}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form className="single-page page">
					<div className="wrapper">
						<div className="single-page__item">
							<Link to={`/${itemNameURL}`} className="single-page__headers">
								Список книг
							</Link>
							<span className="single-page__slash" style={{ left: 135 + 'px' }}>
								/
							</span>
							{isEditable ? (
								<>
									<Field
										name="title"
										type="text"
										className="single-page__title"
										id="title"
									/>
									{errors.title && touched.title ? (
										<div className="single-page__error">{errors.title}</div>
									) : null}
								</>
							) : (
								<p className="single-page__title">"{title ? title : null}"</p>
							)}
							<Button
								type="edit"
								browserType="button"
								onClick={() => setIsEditable(!isEditable)}
							>
								<img
									className="page-button_ico"
									src={btnSvgEdit}
									alt="Button ico"
								/>
							</Button>
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Автор:</h4>
							{isEditable ? (
								<>
									<Field
										name="authorId"
										as="select"
										className="single-page__content single-page__content_select"
										id="authorId"
									>
										{storeAuthors.map((author) => (
											<option
												key={author.id}
												value={author.id}
											>{`${author.lastName} ${author.firstName[0]}.`}</option>
										))}
									</Field>
									{errors.author && touched.author ? (
										<div className="single-page__error">{errors.author}</div>
									) : null}
								</>
							) : (
								<p className="single-page__content single-page__content_select">
									{author && author.lastName
										? `${author.lastName} ${author.firstName[0]}.`
										: null}
								</p>
							)}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Описание:</h4>
							{isEditable ? (
								<>
									<Field
										name="info"
										as="textarea"
										className="single-page__content single-page__content_area"
										id="info"
									/>
									{errors.info && touched.info ? (
										<div className="single-page__error">{errors.info}</div>
									) : null}
								</>
							) : (
								<p className="single-page__content">{info ? info : null}</p>
							)}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Выдана:</h4>
							{isEditable ? (
								<>
									<Field
										name="userId"
										as="select"
										className="single-page__content single-page__content_select"
										id="userId"
									>
										<option value="">Нет</option>
										{storeUsers
											.sort((a, b) => sorting(a, b, 'users'))
											.map((user) => (
												<option
													key={user.id}
													value={user.id}
												>{`${user.lastName} ${user.firstName[0]}.`}</option>
											))}
									</Field>
									{errors.user && touched.user ? (
										<div className="single-page__error">{errors.user}</div>
									) : null}
								</>
							) : (
								<p className="single-page__content single-page__content_select">
									{user ? `${user.lastName} ${user.firstName}` : 'Нет'}
								</p>
							)}
						</div>
					</div>
					{isEditable ? (
						<Button type="save" browserType="submit" disabled={isSubmitting}>
							Сохранить
						</Button>
					) : null}
				</Form>
			)}
		</Formik>
	);
};

export default Book;
