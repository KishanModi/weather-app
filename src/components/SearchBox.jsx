import React from 'react';
import { useState, useEffect } from 'react';

export const SearchBox = (props) => {
	const [btn, setBtn] = useState(false);

	useEffect(() => {
		if (props.query !== '') {
			setBtn(true);
		} else {
			setBtn(false);
		}
		return () => {};
	}, [props.query]);
	return (
		<div className='search-box'>
			<input
				type='text'
				className='search-bar'
				style={
					props.results.length !== 0 ? {} : { borderRadius: '16px' }
				}
				placeholder='Search...'
				onChange={(e) => {
					if (e.target.value === '') {
						props.setUpdate(false);
						props.setQuery('');
					} else {
						props.setUpdate(true);
						props.setQuery(e.target.value);
					}
				}}
				value={props.query}
			/>
			<button id='search' onClick={props.btnClick} disabled={!btn}>
				<i className='fa-solid fa-magnifying-glass'></i>
			</button>
		</div>
	);
};
