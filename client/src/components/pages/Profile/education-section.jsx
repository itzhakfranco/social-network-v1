import React from "react";
import Moment from "react-moment";
import moment from "moment";

const EducationSection = ({ education }) => {
	return (
		education?.length > 0 && (
			<>
				<div className='row'>
					<div class='col-lg-12'>
						<h4 class='font-weight-bold text-dark my-4'>Educations</h4>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						{education.map((edu) => (
							<div key={edu._id} className='card'>
								<div className='card-header'>
									<Moment format='YYYY/MM/DD'>{moment.utc(edu.from)}</Moment>-
									{!education.to ? (
										" Now"
									) : (
										<Moment format='YYYY/MM/DD'>{moment.utc(edu.to)}</Moment>
									)}
								</div>
								<div className='card-body'>
									<h4>Field Of Study {edu.fieldofstudy}</h4>
									<span>
										<strong>Description</strong>
									</span>
									<p>{edu.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</>
		)
	);
};

export default EducationSection;
