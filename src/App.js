import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './pages/Main';
import { fetchGetData } from './redux/actions/data';
import SinglePage from './pages/SinglePage';

const App = () => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(fetchGetData('/book', 'GET_BOOKS'));
		dispatch(fetchGetData('/author', 'GET_AUTHORS'));
		dispatch(fetchGetData('/user', 'GET_USERS'));
	});
	return (
		<div className="container">
			<Sidebar />
			<Switch>
				<Route
					path="/book"
					exact
					render={(...props) => <Main {...props} title="Книг" />}
				/>
				<Route
					path="/author"
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<Main {...props} title="Авторов" />
						</Suspense>
					)}
				></Route>
				<Route
					path="/user"
					render={(props) => (
						<Suspense fallback={<Loading />}>
							<Main {...props} title="Пользователей" />
						</Suspense>
					)}
				></Route>
				<Route path="/book/:id" exact component={SinglePage} />
				<Route path="/author/:id" exact component={SinglePage} />
				<Route path="/user/:id" exact component={SinglePage} />
				<Redirect from="/" to="/book" exact />
			</Switch>
		</div>
	);
};

export default App;
