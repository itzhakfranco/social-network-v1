import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUserProfile } from "../../../store/profile/profileActions";

import PageHeader from "../../common/page-header";
import ExperienceTable from "./experience-table";
import EducationTable from "./education-table";
import LinkButton from "../../common/link-button";

import PreLoader from "../../../utils/pre-loader";

class Dashboard extends Component {
	componentDidMount() {
		!this.props.profile && this.props.fetchUserProfile();
	}
	render() {
		const { name, loading, experience, education, profile } = this.props;

		return (
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12 m-auto'>
						<PageHeader
							title={`${name}'s Dashboard`}
							desc='Here You can view and create your credential'
						/>
					</div>
				</div>
				{loading && <PreLoader />}
				{!profile && (
					<LinkButton to='/user/create-profile'>Create Profile</LinkButton>
				)}
				{profile && experience?.length === 0 && (
					<LinkButton to={"/user/create-experience"}>Add Experience</LinkButton>
				)}
				{experience?.length > 0 && <ExperienceTable experience={experience} />}

				{profile && education?.length === 0 && (
					<LinkButton to={"/user/create-education"}>Add Education</LinkButton>
				)}
				{education?.length > 0 && <EducationTable education={education} />}
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	name: state.user.name,
	profile: state.profile.memberProfile,
	experience: state.profile?.memberProfile?.experience,
	education: state.profile?.memberProfile?.education,
	loading: state.profile.loading,
});

export default connect(mapStateToProps, {
	fetchUserProfile,
})(Dashboard);
