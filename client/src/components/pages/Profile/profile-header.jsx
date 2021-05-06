import React from "react";

const ProfileHeader = ({ profile }) => {
	return (
		<>
			<div className='row'>
				<div className='col-lg-12'>
					<div className='text-center bg-dark my-4 py-5'>
						<div className='col-md-8 col-lg-6 col-xl-5 p-0 mx-auto'>
							<h4 className='font-weight-bold text-white my-4'>
								{profile.name}
							</h4>
							<div className='text-white '>{`${profile.status} at ${profile.company}`}</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-lg-12'>
					<div className='text-center bg-light border'>
						<div className='col-md-8 col-lg-6 col-xl-5 p-0 mx-auto'>
							<h4 className='font-weight-bold text-dark my-4'>
								{`${profile.name}'s Bio`}
							</h4>
							<p>{profile.bio}</p>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-md-12 mb-4'>
					<div className='text-center bg-light border'>
						<div className='col-md-8 col-lg-6 col-xl-5 p-0 mx-auto mb-4'>
							<h4 className='font-weight-bold text-dark my-4'>Skill Set</h4>
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
			</div>
		</>
	);
};

export default ProfileHeader;
