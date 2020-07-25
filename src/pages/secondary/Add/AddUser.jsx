import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button/Button';
import UsersSchema from '../../../components/Formik/UsersSchema';
import { postDataThunk } from '../../../redux/actions/data';
import { useRouteMatch, useHistory } from 'react-router-dom';

const AddUser = () => {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const { url } = useRouteMatch();
	const itemNameURL = url.match(/\w+/)[0];
	return (
		<Formik
			initialValues={{
				email: '',
				title: '',
				phone: '',
				books: [],
			}}
			enableReinitialize={true}
			validationSchema={UsersSchema}
			onSubmit={(data) => {
				const [lastName, firstName] = data.title.split(' ');

				const tData = {
					email: data.email,
					firstName: firstName,
					lastName: lastName,
					phone: data.phone,
					books: [],
				};
				dispatch(postDataThunk(itemNameURL, tData, push));
			}}
		>
			{({ errors, touched, isSubmitting }) => (
				<Form className="single-page page">
					<div className="wrapper">
						<h1 className="page__title">Новый пользователь</h1>
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
							<h4 className="single-page__headers">Телефон:</h4>

							<Field
								name="phone"
								type="text"
								className="single-page__content"
								placeholder="+79997776699"
								id="phone"
							/>
							{errors.phone && touched.phone ? (
								<div className="single-page__error">{errors.phone}</div>
							) : null}
						</div>
						<div className="single-page__item">
							<h4 className="single-page__headers">Эл. почта:</h4>

							<Field
								name="email"
								type="email"
								className="single-page__content"
								placeholder="qwe@mail.ru"
								id="email"
							/>
							{errors.email && touched.email ? (
								<div className="single-page__error">{errors.email}</div>
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

export default AddUser;
