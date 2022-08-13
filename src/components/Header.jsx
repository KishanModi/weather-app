import React from 'react';

export const Header = (props) => {
	return (
		<div className="header-box">
			<h1 id="heading">{props.text}</h1>
		</div>
	);
};
