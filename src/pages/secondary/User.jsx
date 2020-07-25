import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import btnSvgEdit from '../../assets/icons/edit.svg';
import Button from '../../components/Button/Button';
import UsersSchema from '../../components/Formik/UsersSchema';
import { SET_USERS } from '../../redux/actions/actionTypes';
import { patchDataThunk } from '../../redux/actions/data';

const User = () => {
	const dispatch = useDispatch();
	const store = useSelector(({ data }) => data);
	const storeUsers = store.users.rows;
	const count = store.users.count;
	const storeBooks = store.books;

	let [isEditable, setIsEditable] = useState(false);

	const { url } = useRouteMatch();
	const itemIdURL = +url.match(/\d+/);
	const itemNameURL = url.match(/\w+/)[0];

	const user =
		storeUsers &&
		storeUsers.length !== 0 &&
		storeUsers.find((user) => user.id === +itemIdURL);
	const { id, email, firstName, lastName, phone, books } = user ? user : {};
	let title = `${lastName} ${firstName}`;

	return (
		<Formik
			initialValues={{
				id: id,
				email: email,
				title: `${lastName} ${firstName}`,
				phone: phone,
				books: books,
			}}
			enableReinitialize={true}
			validationSchema={UsersSchema}
			onSubmit={(data) => {
				const [lastName, firstName] = data.title.split(' ');

				const tData = {
					id: data.id,
					email: data.email,
					firstName: firstName,
					lastName: lastName,
					phone: data.phone,
				};
				dispatch(
					patchDataThunk(
						url,
						tData,
						SET_USERS,
						storeUsers,
						setIsEditable,
						count
					)
				);
			}}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form className="single-page page">
					<div className="wrapper">
						<div className="single-page__item">
							<Link to={`/${itemNameURL}`} className="single-page__headers">
								Список user'ов
							</Link>
							<span className="single-page__slash" style={{ left: 150 + 'px' }}>
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
							<h4 className="single-page__headers">Телефон:</h4>
							{isEditable ? (
								<>
									<Field
										name="phone"
										type="text"
										className="single-page__content"
										id="phone"
									/>
									{errors.phone && touched.phone ? (
										<div className="single-page__error">{errors.phone}</div>
									) : null}
								</>
							) : (
								<p className="single-page__content">{phone ? phone : null}</p>
							)}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Эл. почта:</h4>
							{isEditable ? (
								<>
									<Field
										name="email"
										type="email"
										className="single-page__content"
										id="email"
									/>
									{errors.email && touched.email ? (
										<div className="single-page__error">{errors.email}</div>
									) : null}
								</>
							) : (
								<p className="single-page__content">{email ? email : null}</p>
							)}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Список книг:</h4>
							<div className="single-page__content">
								{books && books.length !== 0
									? books.map((book) => (
											<span key={book.id}>
												{storeBooks.map((storeBook) => {
													return book.id === storeBook.id ? (
														<span key={storeBook.id}>
															"{storeBook.title}",{' '}
														</span>
													) : (
														''
													);
												})}
											</span>
									  ))
									: 'Нет ни одной'}
							</div>
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

export default User;
