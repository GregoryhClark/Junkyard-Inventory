import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Inventory.css';


class Private extends Component {
    constructor() {
        super()
        this.state = {
            localInventory: [],
            tempColor: '',
            tempMake: '',
            tempModel: '',
            tempYear: '',
            editWasClicked: false,
            filteredColor: '',
            filteredMake: '',
            filteredModel: '',
            filteredYear: ''


        }
        this.enterInventory = this.enterInventory.bind(this);//wtf?
        this.searchAllInventory = this.searchAllInventory.bind(this);//wtf?
        this.deleteInventory = this.deleteInventory.bind(this);//wtf?
        this.editInventory = this.editInventory.bind(this);
        this.displayCorrectModelSchtuff = this.displayCorrectModelSchtuff.bind(this);
        this.searchInventoryFiltered = this.searchInventoryFiltered.bind(this);
    }
    componentDidMount() {

        this.props.getUser();

        axios.get('/findcolor')
            .then(res => {
                // console.log('color res.data is now', res.data)
                this.props.getColorArr(res.data);
            })

        axios.get('/findmakes')
            .then(res => {
                // console.log(' make res.data is now', res.data)
                this.props.getMakeArr(res.data);
            })

        axios.get('/findyear')
            .then(res => {
                // console.log('year res.data is now', res.data)
                this.props.getYearArr(res.data);
            })
        axios.get('/allinventory')
            .then(res => {
                this.setState({
                    localInventory: res.data
                })

                console.log('all inv res.data is now', res.data)
            })


    }
    searchInventoryFiltered() {
        
        axios.get(`/filteredinventory/${this.state.filteredMake}/${this.state.filteredModel}/${this.state.filteredYear}/${this.state.filteredColor}`)
            .then(res => {
                console.log('filtered res.data is finally', res.data)
                this.setState({
                    
                    localInventory:res.data
                })

                console.log('filtered res.data is now', res.data)
            })
    }


    getModels(selectedMake) {
        // console.log(selectedMake)
        this.setState({
            tempMake: selectedMake
        })
        axios.get(`/findmodels/${selectedMake}`)
            .then(res => {
                console.log('New res.data is now', res.data)
                this.props.getModelArr(res.data);
            })
    }

    // getModelsToEdit(selectedMake) {
    //     this.setState({
    //         tempMakeToEdit:selectedMake
    //     })
    //     axios.get(`/findmodels/${selectedMake}`)
    //         .then(res => {
    //             console.log('New res.data is now', res.data)
    //             this.props.getModelArr(res.data);
    //         })
    // }

    setTempModel(selectedModel) {
        this.setState({
            tempModel: selectedModel
        })
    }
    setTempColor(selectedColor) {
        this.setState({
            tempColor: selectedColor
        })
        // console.log('now state is ', this.state)

    }
    setTempYear(selectedYear) {
        this.setState({
            tempYear: selectedYear
        })
    }

    enterInventory() {
        let newCar = this.state;
        console.log('newCar is now ', newCar)
        axios.post(`/enterinventory`, newCar)
            .then(res => {
                console.log('enterinv res.data is finally', res.data)
                this.setState({

                    localInventory: res.data
                })

                console.log('filtered res.data is now', res.data)
            })
        axios.post('/send_email', newCar)
            .then(res => {
                console.log('In theory, the email sent.')
            })
    }
    searchAllInventory() {

        axios.get('/allinventory')
            .then(res => {
                this.setState({
                    localInventory: res.data
                })

                console.log('all inv res.data is now', res.data)
            })

    }
    deleteInventory(id) {
        console.log('the id to delete is ', id)
        axios.delete(`/delete_inventory/${id}`)
            .then()//I should really put schtuff here.
    }
    editInventory() {

        axios.put(`/edit_inventory`, )
            .then()//I should really put schtuff here.
    }
    displayCorrectModelSchtuff() {
        if (this.props.modelArr.length < 1) {
            return (
                <option >Select Make First</option>
            )
        } else {
            return (this.props.modelArr.map((model, index) => {
                return (<option key={index}>{model.model}</option>)
            }))
        }

    }





    // var modelSelection = this.props.modelArr.map((model, index) => {
    //     console.log(modelSelection)

    //     if (this.props.modelArr.length < 1) {
    //         return (
    //             <option >Select Make First</option>

    //         )
    //     } else {
    //         return (
    //             <option key={index}>{model.model}</option>

    //         )
    //     }
    // })



    render() {

        const user = this.props.user;
        var makeSelection = this.props.makeArr.map((make, index) => {
            return (

                <option key={index}>{make.make}</option>
            )
        })
        var colorSelection = this.props.colorArr.map((color, index) => {

            return (

                <option key={index}>{color.color}</option>
            )
        })

        var yearSelection = this.props.yearArr.map((year, index) => {
            return (

                <option key={index}>{year.year}</option>
            )
        })
        // var modelSelection = this.props.modelArr.map((model, index) => {
        //     console.log(modelSelection)

        //     if (this.props.modelArr.length < 1) {
        //         return (
        //             <option >Select Make First</option>

        //         )
        //     } else {
        //         return (
        //             <option key={index}>{model.model}</option>

        //         )
        //     }
        // })

        var modelSelection = this.displayCorrectModelSchtuff();
        var searchResults = this.state.localInventory.map((vehicle, index) => {
            // console.log(vehicle)
            // console.log(makeSelection)
            return (
                <tr key={index}>
                    <td>{vehicle.make} <select onChange={(e) => this.getModels(e.target.value)}><option>Select</option>{makeSelection}</select></td>
                    <td>{vehicle.model}<select><option>Select</option>{modelSelection}</select></td>
                    <td>{vehicle.year}<select><option>Select</option>{yearSelection}</select></td>
                    <td>{vehicle.color}<select><option>Select</option>{colorSelection}</select></td>
                    <td>{vehicle.date_entered}</td>
                    <td>
                        <button onClick={(e) => this.deleteInventory(vehicle.id)}>Delete</button>
                        <button onClick={(e) => this.deleteInventory(vehicle.id)}>Edit</button>
                    </td>
                </tr>
            )
        })
        return (
            <div>

                <h1>Manage Invetory Here</h1>

                <p>Username: {user ? user.user_name : null}</p>

                <div className="new_waitlist">


                </div>
                <div className="inv_button_wrapper">
                    
                    <div>
                        {/* <button onClick={}>Search Filtered</button> */}
                    </div>
                    <div>
                        {/* <button onClick={}>Add New</button> */}
                    </div>
                    <div>
                        <button onClick={this.searchAllInventory}>Clear Filters</button>
                    </div>
                </div>

                <table className="search_results">
                    <tbody>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Color</th>
                            <th>Date Entered</th>
                            <th>Adjust</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {searchResults}
                    </tbody>
                </table>



                <div className='search_results'>

                </div>

                <h1>Enter New Vehicle</h1>
                <div className="new_make">
                    <p>Make:</p>
                    <select onChange={(e) => this.getModels(e.target.value)}>
                        <option>Select</option>
                        {makeSelection}
                    </select>
                    
                    <div className="new_model">
                        <p>Model:</p>
                        <select onChange={(e) => this.setTempModel(e.target.value)}>
                            {modelSelection}
                        </select>
                    </div>
                    <div className="new_year">
                        <p>Year:</p>
                        <select onChange={(e) => this.setTempYear(e.target.value)}>
                            <option>Select</option>
                            {yearSelection}
                        </select>
                    </div>
                    <div className="new_color">
                        <p>Color:</p>
                        <select onChange={(e) => this.setTempColor(e.target.value)}>
                            <option>Select</option>
                            {colorSelection}
                        </select>
                    </div>

                    <button onClick={this.enterInventory}>Save Entry</button>
                </div>

                <div className="search_form">
                <h1>Filtered search fields</h1>
                <div className="new_make">
                    <p>Make:</p>
                    <select onChange={(e) => this.getModels(e.target.value)}>
                        <option>Select</option>
                        {makeSelection}
                    </select>
                    
                    <div className="new_model">
                        <p>Model:</p>
                        <select onChange={(e) => this.setTempModel(e.target.value)}>
                            {modelSelection}
                        </select>
                    </div>
                    <div className="new_year">
                        <p>Year:</p>
                        <select onChange={(e) => this.setTempYear(e.target.value)}>
                            <option>Select</option>
                            {yearSelection}
                        </select>
                    </div>
                    <div className="new_color">
                        <p>Color:</p>
                        <select onChange={(e) => this.setTempColor(e.target.value)}>
                            <option>Select</option>
                            {colorSelection}
                        </select>
                    </div>

                    <button onClick={this.searchInventoryFiltered}>Filter</button>
                </div>
                </div>


            </div >




        )
    }

}

function mapStateToProps(state) {
    const { user, colorArr, makeArr, modelArr, yearArr } = state
    return {
        user,
        colorArr,
        makeArr,
        modelArr,
        yearArr,
    }
}

export default connect(mapStateToProps, { getUser, getColorArr, getMakeArr, getModelArr, getYearArr })(Private)
