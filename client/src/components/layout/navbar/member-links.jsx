import { NavLink } from "react-router-dom";

const MemberLinks = ({ hasProfile, name, logout }) => (
	<>
		<ul className='navbar-nav mr-auto'>
			<li className='nav-item'>
				<NavLink className='nav-link btn text-dark' to='/profiles'>
					<i className='fas fa-users mx-2 '></i>Profiles
				</NavLink>
			</li>
			<li className='nav-item '>
				<NavLink className='nav-link btn text-dark' to='/posts'>
					<i className='fas fa-clipboard mx-2 '></i>Posts
				</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink className='nav-link btn text-dark' to='/user/dashboard'>
					<i className='fas fa-tachometer-alt ml-2'></i> Dashboard
				</NavLink>
			</li>
		</ul>
		<ul className='navbar-nav ml-auto'>
			<li className='nav-item'>
				<NavLink
					className='btn btn-primary nav-link text-white mr-4'
					to='/add-post'
				>
					<i className='fas fa-plus-circle mx-1'></i>Add Post
				</NavLink>
			</li>

			{hasProfile ? (
				<li className='nav-item'>
					<NavLink
						className='nav-link btn btn-secondary text-white mr-4'
						to={"/user/profile"}
					>
						<i className='far fa-user mx-1'></i>
						{`${name} Profile`}
					</NavLink>
				</li>
			) : (
				<li className='nav-item '>
					<NavLink
						className='nav-link btn btn-secondary text-white mr-4'
						to={`/user/create-profile`}
					>
						<i className='far fa-user mx-1'></i> Create Profile
					</NavLink>
				</li>
			)}

			<li className='nav-item'>
				<NavLink
					onClick={() => {
						logout();
					}}
					className='btn btn-dark nav-link text-white'
					to='#'
				>
					<i className='fas fa-sign-out-alt mx-1'></i>Signout
				</NavLink>
			</li>
		</ul>
	</>
);
export default MemberLinks;
