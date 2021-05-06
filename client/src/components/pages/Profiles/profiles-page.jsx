import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PageHeader from "../../common/page-header";
import PreLoader from "../../../utils/pre-loader";
import ProfileItem from "./profile-item";
import { fetchAllProfiles } from "../../../store/profiles/profilesActions";
import SearchBar from "./search-bar";

class ProfilesPage extends Component {
	state = {
		profiles: [],
		searchInput: null,
		searchResults: null,
	};

	async componentDidMount() {
		const { fetchAllProfiles } = this.props;
		const profiles = await fetchAllProfiles();
		this.setState({ profiles });
	}

	clearSearchResults = () =>
		this.setState({ searchResults: null, searchInput: "" });

	setSearchInput = (e) => {
		if (e.target.value.length > 0) {
			this.setState({ searchInput: e.target.value });
			this.setSearchResults();
		} else {
			this.clearSearchResults();
		}
	};

	setSearchResults = () => {
		this.setState({ loading: true });
		const { searchInput } = this.state;
		if (searchInput) {
			let searchResults = this.state.profiles.filter(
				(profile) =>
					profile.name.toLowerCase().includes(searchInput.toLowerCase()) ||
					profile.bio.toLowerCase().includes(searchInput.toLowerCase()) ||
					profile.company.includes(searchInput.toLowerCase()) ||
					profile.status.includes(searchInput.toLowerCase())
			);
			this.setState({ searchResults, loading: false });
		}
	};

	render() {
		const { loading } = this.props;
		const { searchInput, searchResults, profiles } = this.state;
		return (
			<Fragment>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-12 mb-4'>
							<PageHeader
								title='Profiles Page'
								desc='Here You can view all profiles'
							/>
						</div>
					</div>
					<SearchBar
						setSearchInput={this.setSearchInput}
						searchInput={searchInput}
						setSearchResults={this.setSearchResults}
						searchResults={searchResults}
						clearSearchResults={this.clearSearchResults}
					/>
					<div className='row'>
						{loading && <PreLoader />}

						{searchResults !== null &&
							searchResults.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))}

						{!searchResults &&
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))}

						{!profiles && <h4>No profiles found...</h4>}
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	profiles: state.profiles.profiles,
	loading: state.profiles.loading,
});

export default connect(mapStateToProps, { fetchAllProfiles })(ProfilesPage);
