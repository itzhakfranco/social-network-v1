import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
	fetchProfileById,
	fetchUserProfile,
} from "../../../store/profile/profileActions";
import PreLoader from "../../../utils/pre-loader";
import ProfileHeader from "./profile-header";
import ProfilleActions from "./profile-actions";
import ExperienceSection from "./experience-section";
import EducationSection from "./education-section";

import PageHeader from "../../common/page-header";

const ProfilePage = ({
	fetchProfileById,
	fetchUserProfile,
	match,
	profile,
	loading,
	user_id,
}) => {
	useEffect(() => {
		if (match.params.id) {
			fetchProfileById(match.params.id);
		} else {
			fetchUserProfile();
		}
	}, [match.params.id, fetchProfileById, fetchUserProfile]);

	return loading ? (
		<PreLoader />
	) : (
		<>
			<div className='container'>
				<PageHeader title='title' desc='desc' />
			</div>
			{profile && (
				<div className='container'>
					<ProfilleActions profile={profile} user_id={user_id} />
					<ProfileHeader profile={profile} />
					<ExperienceSection experience={profile?.experience} />
					<EducationSection education={profile?.education} />
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.guestProfile,
	loading: state.profile.loading,
	user_id: state.user.user_id,
});

export default connect(mapStateToProps, { fetchProfileById, fetchUserProfile })(
	ProfilePage
);
