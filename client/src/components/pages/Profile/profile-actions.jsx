import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { swalConfirmDelete } from "../../../config.json";
import Swal from "sweetalert2";
import { deleteProfile } from "../../../store/profile/profileActions";
import { toast } from "react-toastify";

class ProfileActions extends Component {
	onDelete = async (profileId) => {
		const result = await Swal.fire(swalConfirmDelete);
		if (result.value) this.handleDelete(profileId);
	};

	handleDelete(profileId) {
		this.props.deleteProfile(profileId);
		this.props.history.replace("/user/dashboard");
		toast.success("Profile was delete successfully");
	}
	render() {
		const { profile, user_id } = this.props;
		return (
			<div className='row'>
				<div className='col-lg-12 mt-4'>
					<Link className='btn btn-dark ' to='/profiles'>
						Back To Profiles
					</Link>
					{user_id && user_id === profile?.user_id && (
						<>
							<Link
								className='btn btn-primary float-right mr-2'
								to={`/user/profile/edit/${profile._id}`}
							>
								Update Profile
							</Link>
							<Link
								onClick={() => this.onDelete(profile._id)}
								className='btn btn-danger float-right mr-2'
								to='#'
							>
								Delete Profile
							</Link>
						</>
					)}
				</div>
			</div>
		);
	}
}

export default connect(null, { deleteProfile })(withRouter(ProfileActions));
