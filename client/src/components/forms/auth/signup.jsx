import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../../store/user/userActions";
import PageHeader from "../../common/page-header";
import PreLoader from "../../../utils/pre-loader";

class Signup extends Form {
	state = {
		data: { name: "", email: "", password: "" },
		errors: {},
	};
	schema = {
		name: Joi.string().required().min(2).label("Name"),
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(6).label("Password"),
	};

	componentDidUpdate(previousProps) {
		if (previousProps.error !== this.props.error) {
			this.setState({ errors: { email: this.props.error } });
		}
	}

	doSubmit = () => {
		const data = { ...this.state.data };
		const { signup } = this.props;
		signup(data);
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
							title='Signup Page'
							desc='Here You can Signup for a new Account'
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
							{this.renderInput("name", "Your Name")}
							{this.renderInput("email", "Email", "email")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Signup Now")}
							<Link to='/' className='btn btn-dark ml-4'>
								Cancel
							</Link>
						</form>
						<p className='font-weight-light text-muted mt-4'>
							Already have an account? <Link to='/user/signin'>Sign In</Link>
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

export default connect(mapStateToProps, { signup })(Signup);
