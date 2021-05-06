import React from "react";
import { Link } from "react-router-dom";

export const ProfileItem = ({ profile }) => {
	return (
		<div className='col-md-6 col-lg-4 mb-4'>
			<div className='card'>
				<div className='card-header'>
					<i className='fa fa-user'></i>
					<strong className='card-title pl-2'>{profile.name}</strong>
				</div>
				<div className='card-body'>
					<div className='mx-auto d-block'>
						<img
							className='rounded-circle mx-auto d-block'
							style={{ width: "75px", height: "75px" }}
							src={
								profile.image
									? profile.image
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
							}
							alt='Card cap'
						/>
						<h5 className='text-sm-center mt-2 mb-1'>{profile.name}</h5>
						<div className='text-sm-center'>
							<i className='fa fa-map-marker'></i> {profile.location}
						</div>
						<hr />
						<h6 className='text-sm-center'>Skills</h6>
						<div className='d-flex justify-content-center'>
							{profile.skills.map((skill, index) => (
								<div key={index}>
									<span className='badge badge-pill badge-primary mx-2'>
										{skill}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className='card-footer'>
					<Link to={`/profiles/${profile._id}`} className='btn btn-dark'>
						View profile
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProfileItem;
