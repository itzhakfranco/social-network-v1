import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { Redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { signin } from "../../../store/user/userActions";
import PreLoader from "../../../utils/pre-loader";
import PageHeader from "../../common/page-header";

class Signin extends Form {
	state = {
		data: { email: "", password: "" },
		errors: {},
	};

	schema = {
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(6).label("Password"),
	};

	componentDidUpdate(previousProps) {
		if (previousProps.error !== this.props.error) {
			this.setState({ errors: { email: this.props.error } });
		}
	}

	doSubmit = () => {
		const { signin } = this.props;
		const { email, password } = this.state.data;
		signin(email, password);
	};

	render() {
		const { token, loading } = this.props;

		if (token) return <Redirect to='/user/dashboard' />;
		if (loading) return <PreLoader />;
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-lg-6 m-auto'>
						<PageHeader
							title='Signin Page'
							desc='Here You can Signin to your account'
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-6 m-auto'>
						<form
							onSubmit={this.handleSubmit}
							action=''
							method='POST'
							className='mt-4'
							autoComplete='off'
						>
							{this.renderInput("email", "Email", "email")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Signin")}
							<Link to='/' className='btn btn-dark ml-4'>
								Cancel
							</Link>
						</form>

						<p className='font-weight-light text-muted mt-4'>
							Dont have an account? <Link to='/user/signup'>Sign Up</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	token: state.user.token,
	loading: state.user.loading,
	error: state.user.error,
});

export default connect(mapStateToProps, { signin })(Signin);
