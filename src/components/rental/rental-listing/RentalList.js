import React from 'react';
import { RentalCard } from './RentalCard';
import { connect } from 'react-redux';

import * as actions from 'actions';

class RentalList extends React.Component {

    renderRentals() {
        return this.props.rentals.map((rental, index) => {
            console.log(rental)
            return (
                <RentalCard key={index} 
                            colNum='col-md-3 col-xs-6' 
                            rental={rental} />
            )
        });
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchRentals());
    }

    render() {
        return (
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <div className='row'>
                    {this.renderRentals()}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        rentals: state.rentals.data
    }
}

export default connect(mapStateToProps)(RentalList)