import { NavLink } from "react-router-dom";

const GuestLinks = () => (
	<>
		<ul className='navbar-nav mr-auto'>
			<li className='nav-item'>
				<NavLink className='nav-link btn text-dark' to='/profiles'>
					<i className='fas fa-users mx-2 '></i>Profiles
				</NavLink>
			</li>
		
		</ul>
		<ul className='navbar-nav ml-auto'>
			<li className='nav-item'>
				<NavLink
					className='btn btn-dark nav-link text-white mr-4'
					to='/user/signup'
				>
					<i className='fas fa-user-plus mx-1'></i>Signup
				</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink className='btn btn-dark nav-link text-white' to='/user/signin'>
					<i className='fas fa-sign-in-alt mx-1'></i>Signin
				</NavLink>
			</li>
		</ul>
	</>
);

export default GuestLinks;
