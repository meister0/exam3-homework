const sorting = (a, b, type) => {
	switch (type) {
		case 'authors':
			return a.authorId > b.authorId ? 1 : a.authorId < b.authorId ? -1 : 0;
		case 'books':
			return a.title[0] > b.title[0] ? 1 : a.title[0] < b.title[0] ? -1 : 0;
		case 'users':
			return a.lastName[0] > b.lastName[0]
				? 1
				: a.lastName[0] < b.lastName[0]
				? -1
				: 0;
		default:
			throw new Error('[List.jsx]');
	}
};

export default sorting;
