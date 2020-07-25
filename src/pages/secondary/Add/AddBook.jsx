import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button/Button';
import BooksSchema from '../../../components/Formik/BooksSchema';
import sorting from '../../../helpers/sorting';
import { postDataThunk } from '../../../redux/actions/data';
import { useRouteMatch, useHistory } from 'react-router-dom';

const AddBook = () => {
	const dispatch = useDispatch();
	const store = useSelector(({ data }) => data);
	const storeAuthors = store.authors;
	const storeUsers = store.users.rows;
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const itemNameURL = url.match(/\w+/)[0];
	return (
		<Formik
			initialValues={{
				title: '',
				authorId: 1,
				info: '',
				userId: '',
			}}
			enableReinitialize={true}
			validationSchema={BooksSchema}
			onSubmit={(data) => {
				console.log('data=', data);
				const tData = {
					title: data.title,
					authorId: +data.authorId,
					info: data.info,
					userId: data.userId !== '' ? +data.userId : null,
				};
				console.log('tdata=', tData);
				dispatch(postDataThunk(itemNameURL, tData, push));
			}}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form className="single-page page">
					<div className="wrapper">
						<h1 className="page__title">Новая книга</h1>
						<div className="single-page__item">
							<p className="single-page__headers">Название:</p>
							<Field
								name="title"
								type="text"
								className="single-page__title"
								id="title"
								placeholder="Крутое название"
							/>
							{errors.title && touched.title ? (
								<div className="single-page__error">{errors.title}</div>
							) : null}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Автор:</h4>
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
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Описание:</h4>
							<Field
								name="info"
								as="textarea"
								className="single-page__content single-page__content_area"
								id="info"
								placeholder="Крутое описание"
							/>
							{errors.info && touched.info ? (
								<div className="single-page__error">{errors.info}</div>
							) : null}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Выдана:</h4>
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
						</div>
					</div>
					<Button type="save" browserType="submit" disabled={isSubmitting}>
						Сохранить
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default AddBook;
