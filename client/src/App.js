import Navbar from "./components/layout/navbar/navbar.jsx";

import "./App.css";
import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "./components/common/protectedRoute";
import Signin from "./components/forms/auth/signin";
import Signup from "./components/forms/auth/signup";
import Dashboard from "./components/pages/Dashbord/dashboard-page";

import ExperienceForm from "./components/forms/profile/experience-form";
import EducationForm from "./components/forms/profile/education-form";
import ProfileForm from "./components/forms/profile/profile-form";

import GuestProfilePage from "./components/pages/Profile/guest-profile-page";
import MemberProfilePage from "./components/pages/Profile/member-profile-page";
import PostsPage from "./components/pages/Posts/posts-page";
import HomePage from "./components/pages/HomePage/home-page";
import ProfilesPage from "./components/pages/Profiles/profiles-page";
import AddPost from "./components/pages/Posts/add-post";

import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<header>
				<Navbar />
				<ToastContainer />
			</header>
			<main style={{ minHeight: "900px" }}>
				<Switch>
					<Route path='/user/signup' component={Signup} />
					<Route path='/user/signin' component={Signin} />
					<Route path='/profiles/:id' component={GuestProfilePage} />
					<Route path='/profiles' component={ProfilesPage} />
					<Route path='/posts' component={PostsPage} />
					<ProtectedRoute path='/user/dashboard' component={Dashboard} />
					<ProtectedRoute path='/add-post' component={AddPost} />

					<ProtectedRoute path='/user/create-profile' component={ProfileForm} />

					<ProtectedRoute
						path='/user/experience/edit/:id'
						component={ExperienceForm}
					/>
					<ProtectedRoute
						path='/user/education/edit/:id'
						component={EducationForm}
					/>
					<ProtectedRoute
						path='/user/create-experience'
						component={ExperienceForm}
					/>
					<ProtectedRoute
						path='/user/create-education'
						component={EducationForm}
					/>
					<ProtectedRoute
						exact
						path='/user/profile/edit/:id'
						component={ProfileForm}
					/>
					<ProtectedRoute path='/user/profile/' component={MemberProfilePage} />
					<Route path='/' component={HomePage} />
				</Switch>
			</main>
			<footer></footer>
		</>
	);
}

export default App;
