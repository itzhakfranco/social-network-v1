import React, { Fragment } from "react";

const ProfileSearchBar = ({
	setSearchInput,
	searchInput,
	setSearchResults,
	searchResults,
	clearSearchResults,
}) => {
	const clearSearchInput = () => {
		return (
			<button
				className='btn btn-block btn-secondary mb-5'
				type='button'
				onClick={clearSearchResults}
			>
				Clear
			</button>
		);
	};

	return (
		<Fragment>
			<div className='row'>
				<div className='col-lg-12'>
					<div className='input-group mb-3'>
						<input
							type='text'
							className='form-control'
							placeholder='Search By name, Skills or Location'
							onChange={setSearchInput}
							value={searchInput}
						/>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-lg-12'>
					{searchResults?.length > 0 && clearSearchInput()}
					{searchResults?.length === 0 && (
						<Fragment>
							<h4>No profiles found...</h4>
							{clearSearchInput()}
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileSearchBar;
