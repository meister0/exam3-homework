import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import Sidebar from './components/Sidebar/Sidebar';
import { getAllData } from './redux/actions/data';

const Main = React.lazy(() => import('./pages/Main'));
const Author = React.lazy(() => import('./pages/secondary/Author'));
const Book = React.lazy(() => import('./pages/secondary/Book'));
const User = React.lazy(() => import('./pages/secondary/User'));
const AddAuthor = React.lazy(() => import('./pages/secondary/Add/AddAuthor'));
const AddBook = React.lazy(() => import('./pages/secondary/Add/AddBook'));
const AddUser = React.lazy(() => import('./pages/secondary/Add/AddUser'));

const App = () => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getAllData());
	});
	return (
		<div className="container">
			<Sidebar />
			<Switch>
				<Route
					path="/book"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<Main {...props} title="книг" isSorting />
						</Suspense>
					)}
				/>
				<Route
					path="/author"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<Main {...props} title="авторов" />
						</Suspense>
					)}
				/>
				<Route
					path="/user"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<Main {...props} title="пользователей" isCount />
						</Suspense>
					)}
				/>
				<Route
					path="/book/add"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<AddBook {...props} />
						</Suspense>
					)}
				/>
				<Route
					path="/author/add"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<AddAuthor {...props} />
						</Suspense>
					)}
				/>
				<Route
					path="/user/add"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<AddUser {...props} />
						</Suspense>
					)}
				/>
				<Route
					path="/book/:id"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<Book {...props} />
						</Suspense>
					)}
				/>
				<Route
					path="/author/:id"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<Author {...props} />
						</Suspense>
					)}
				/>
				<Route
					path="/user/:id"
					exact
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<User {...props} />
						</Suspense>
					)}
				/>
				<Redirect from="/" to="/book" />
			</Switch>
		</div>
	);
};

export default App;
