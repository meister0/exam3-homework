import * as Yup from 'yup';

const BooksSchema = Yup.object().shape({
	title: Yup.string().required('Заполните поле'),
	authorId: Yup.number().required(),
	info: Yup.string().required('Заполните поле'),
	userId: Yup.mixed(),
});
export default BooksSchema;
