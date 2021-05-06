import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ path, component: Component, token, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!token)
					return (
						<Redirect
							to={{
								pathname: "/user/signin",
							}}
						/>
					);
				return Component && <Component {...props} />;
			}}
		/>
	);
};

const mapStateToProps = (state) => ({
	token: state.user.token,
});

export default connect(mapStateToProps, {})(ProtectedRoute);
