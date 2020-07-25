import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button/Button';
import AuthorsSchema from '../../../components/Formik/AuthorsSchema';
import { postDataThunk } from '../../../redux/actions/data';
import { useRouteMatch, useHistory } from 'react-router-dom';

const AddAuthor = () => {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const itemNameURL = url.match(/\w+/)[0];
	return (
		<Formik
			initialValues={{
				title: '',
				birthday: '',
				info: '',
				books: [],
			}}
			enableReinitialize={true}
			validationSchema={AuthorsSchema}
			onSubmit={(data) => {
				const [lastName, firstName] = data.title.split(' ');
				const tData = {
					firstName: firstName,
					lastName: lastName,
					birthday: data.birthday,
					info: data.info,
					books: [],
				};
				dispatch(postDataThunk(itemNameURL, tData, push));
			}}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form className="single-page page">
					<div className="wrapper">
					<h1 className="page__title">Новый автор</h1>
						<div className="single-page__item">
							<h4 className="single-page__headers">ФИ:</h4>
							<Field
								name="title"
								type="text"
								className="single-page__title"
								placeholder="Фролов Аркадий"
								id="title"
							/>
							{errors.title && touched.title ? (
								<div className="single-page__error">{errors.title}</div>
							) : null}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Дата рождения:</h4>

							<Field
								name="birthday"
								type="text"
								className="single-page__content"
								id="birthday"
								placeholder="01.01.1980"
							/>
							{errors.birthday && touched.birthday ? (
								<div className="single-page__error">{errors.birthday}</div>
							) : null}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Описание:</h4>

							<Field
								name="info"
								type="info"
								className="single-page__content"
								placeholder="Крутое описание"
								id="info"
							/>
							{errors.info && touched.info ? (
								<div className="single-page__error">{errors.info}</div>
							) : null}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Список книг:</h4>
							<div className="single-page__content">Нет ни одной</div>
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

export default AddAuthor;
