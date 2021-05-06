import React from "react";
import { NavLink } from "react-router-dom";

const SortFilterButton = ({ posts, setPosts }) => {
	const handleFilterButton = (e) => {
		const sortedPosts = [...posts.sort((a, b) => (a.date > b.date ? 1 : -1))];
		if (e.target.innerText === "Oldest") {
			setPosts(sortedPosts);
		} else {
			setPosts(sortedPosts.reverse());
		}
	};
	return (
		<div className='btn-group mt-5'>
			<NavLink
				onClick={(e) => handleFilterButton(e)}
				to='#'
				className='btn btn-dark mx-1'
			>
				Newest
			</NavLink>
			<NavLink
				onClick={(e) => handleFilterButton(e)}
				to='#'
				className='btn btn-dark'
			>
				Oldest
			</NavLink>
		</div>
	);
};

export default SortFilterButton;
