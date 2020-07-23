import React from 'react';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const Loading = () => {
	return (
		<BeatLoader
			css={css`
				display: block;
				margin: calc(25%) auto;
				width: 80px;
				max-height: 80vh;
			`}
			size={20}
			color={'#9d379d'}
			loading={true}
		/>
	);
};

export default Loading;
