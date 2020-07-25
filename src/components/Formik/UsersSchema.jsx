import * as Yup from 'yup';

const UsersSchema = Yup.object().shape({
	email: Yup.string().required('Заполните поле'),
	title: Yup.string().required('Заполните поле'),
	phone: Yup.string().required('Заполните поле'),
	books: Yup.array(),
});
export default UsersSchema;
