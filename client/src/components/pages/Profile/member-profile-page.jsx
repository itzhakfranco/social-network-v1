import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUserProfile } from "../../../store/profile/profileActions";
import PreLoader from "../../../utils/pre-loader";
import PageHeader from "../../common/page-header";
import ProfileHeader from "./profile-header";
import ProfilleActions from "./profile-actions";
import ExperienceSection from "./experience-section";
import EducationSection from "./education-section";

const MemberProfilePage = ({ fetchUserProfile, profile, loading, user_id }) => {
	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile]);

	return (
		<>
			<div className='container'>
				<PageHeader
					title='My Profile'
					desc='Here you can view, edit or delete your profile'
				/>
			</div>

			{loading && <PreLoader />}
			{!loading && profile && (
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
	profile: state.profile.memberProfile,
	loading: state.profile.loading,
	user_id: state.user.user_id,
});

export default connect(mapStateToProps, { fetchUserProfile })(
	MemberProfilePage
);
