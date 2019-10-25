import React from 'react';
import { RentalList } from './RentalList';
import { connect } from 'react-redux';

import { toUpperCase } from 'helpers';
import * as actions from 'actions';

class RentalSearchListing extends React.Component {

    constructor() {
        super();

        this.state = {
            searchCity: ''
        }
    }

    componentWillMount() {
        this.searchRentalsByCity();
    }

    componentDidUpdate(prevProps) {
        const currentUrlParam = this.props.match.params.city;
        const prevUrlParam = prevProps.match.params.city;

        if (currentUrlParam !== prevUrlParam) {
            this.searchRentalsByCity();
        }
    }

    searchRentalsByCity() {
        const searchCity = this.props.match.params.city;
        this.setState({searchCity})

        this.props.dispatch(actions.fetchRentals(searchCity));
    }

    renderTitle() {
        const { errors, data } = this.props.rentals;
        const { searchCity } = this.state;
        let title = '';

        if(errors.length > 0) {
            title = errors[0].detail;
        } 
        
        if(data.length > 0) {
            title = `Your Home in City of ${toUpperCase(searchCity)}`;
        }

        return <h1 className='page-title'>{title}</h1>
    }

    render() {
        return (
            <section id='rentalListing'>
                {this.renderTitle()}
                <RentalList rentals={this.props.rentals.data} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals
    }
}

export default connect(mapStateToProps)(RentalSearchListing)