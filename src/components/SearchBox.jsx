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
		<div className="search-box">
			<input
				type="text"
				className="search-bar"
				placeholder="Search..."
				onChange={(e) => {
					props.setQuery(e.target.value);
				}}
				value={props.query}
				onKeyPress={props.search}
			/>
			<button id="search" onClick={props.btnClick} disabled={!btn}>
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>
		</div>
	);
};
