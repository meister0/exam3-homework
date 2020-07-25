import * as Yup from 'yup';

const AuthorsSchema = Yup.object().shape({
	title: Yup.string().required('Заполните поле'),
	birthday: Yup.string().required('Заполните поле'),
	info: Yup.string().required('Заполните поле'),
	books: Yup.array(),
});
export default AuthorsSchema;
