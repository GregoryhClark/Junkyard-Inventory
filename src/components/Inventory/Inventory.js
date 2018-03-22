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
            filteredYear: '',
            userIsAdmin: false,
            userIsPremium: false,
            isEditing: false,
            editingIndex: -1,
            filterClicked: false



        }
        this.enterInventory = this.enterInventory.bind(this);//wtf?
        this.searchAllInventory = this.searchAllInventory.bind(this);//wtf?
        this.deleteInventory = this.deleteInventory.bind(this);//wtf?
        this.editInventory = this.editInventory.bind(this);
        this.displayCorrectModelSchtuff = this.displayCorrectModelSchtuff.bind(this);
        this.searchInventoryFiltered = this.searchInventoryFiltered.bind(this);
        this.editClick = this.editClick.bind(this);
    }
    componentDidMount() {

        this.props.getUser()
            .then((res) => {
                console.log('here it is!', res.value)
                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin: res.value.is_admin,
                    userIsPremium: res.value.is_premium
                })
            })

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

                // console.log('all inv res.data is now', res.data)
            })
    }
    searchInventoryFiltered() {
        // if()

        let searchObj = this.state;
        let { tempMake, tempColor, tempModel, tempYear } = this.state;
        if (tempMake && tempColor && tempModel && tempYear) {

            axios.get(`/filteredinventory/${tempMake}/${tempModel}/${tempYear}/${tempColor}`)
                .then(res => {
                    console.log('filtered res.data is finally', res.data)
                    this.setState({

                        localInventory: res.data,
                        filterClicked: true
                    })

                    console.log('filtered res.data is now', res.data)
                })
        } else {
            alert('You must select all values.')
        }
    }


    getModels(selectedMake) {
        // console.log(selectedMake)
        this.setState({
            tempMake: selectedMake
        })
        axios.get(`/findmodels/${selectedMake}`)
            .then(res => {
                // console.log('New res.data is now', res.data)
                this.props.getModelArr(res.data);
            })
    }

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
        // console.log('newCar is now ', newCar)
        if (newCar.tempColor && newCar.tempMake && newCar.tempModel && newCar.tempYear) {
            axios.post(`/enterinventory`, newCar)
                .then(res => {
                    // console.log('enterinv res.data is finally', res.data)
                    this.setState({

                        localInventory: res.data
                    })

                    // console.log('filtered res.data is now', res.data)
                })
            axios.post('/send_email', newCar)
            .then(this.searchAllInventory)
        } else {
            alert('You must select all values.')
        }
    }
    searchAllInventory() {

        axios.get('/allinventory')
            .then(res => {
                this.setState({
                    localInventory: res.data,
                    isEditing: false,
                    editingIndex: -1
                })

                // console.log('all inv res.data is now', res.data)
            })

    }
    deleteInventory(id) {
        console.log('the id to delete is ', id)
        axios.delete(`/delete_inventory/${id}`)
            .then(this.searchAllInventory)
    }
    editInventory(vehicleID) {


        var editObj = {
            make: this.state.tempMake,
            model: this.state.tempModel,
            year: this.state.tempYear,
            color: this.state.tempColor,
            id: vehicleID
        }
        if (this.state.tempColor && this.state.tempMake && this.state.tempModel && this.state.tempYear) {
            axios.put(`/edit_inventory`, editObj)
                .then(this.searchAllInventory)//I should really put schtuff here.

        }
        else {
            alert('You must select all values.')
        }
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


    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    editClick(invID) {
        this.setState({
            editingIndex: invID,
            isEditing: true
        })
        console.log(this.state.isEditing, this.state.editingIndex)



    }


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

        var modelSelection = this.displayCorrectModelSchtuff();

        var searchResultHeaders = this.state.localInventory.length ?

            <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Date Entered</th>
            </tr>
            : this.state.filterClicked ? <div>
                <p>Oops, it looks like we don't have any of those. <Link to="/dashboard/new_waitlist">Click here</Link> to add to your waitlist.
            </p>
            </div>
                : null;

        var searchResults = this.state.localInventory.map((vehicle, index) => {
            // console.log(vehicle)
            // console.log(makeSelection)
            function shortenDate(fullDate) {
                var shortDate = fullDate.substring(0, 10)
                return shortDate;
            }
            return (


                this.state.editingIndex !== index ?
                    <tr key={index}>
                        <td>{vehicle.make}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.year}</td>
                        <td>{vehicle.color}</td>
                        <td>{shortenDate(vehicle.date_entered)}</td>
                        <td>
                            <button onClick={(e) => this.deleteInventory(vehicle.id)}>Delete</button>
                            <button onClick={(e) => this.editClick(index)}>Edit</button>
                        </td>
                    </tr>
                    :
                    <tr key={index}>
                        <td><select onChange={(e) => this.getModels(e.target.value)}>
                            <option>Select</option>
                            {makeSelection}
                        </select></td>

                        <td><select onChange={(e) => this.setTempModel(e.target.value)}>
                            {modelSelection}
                        </select></td>


                        <td><select onChange={(e) => this.setTempYear(e.target.value)}>
                            <option>Select</option>
                            {yearSelection}
                        </select></td>


                        <td><select onChange={(e) => this.setTempColor(e.target.value)}>
                            <option>Select</option>
                            {colorSelection}
                        </select></td>

                        <td>Cannot Change Date</td>

                        <td>
                            <button onClick={(e) => this.deleteInventory(vehicle.id)}>Delete</button>
                            <button onClick={(e) => this.editInventory(vehicle.id)}>save</button></td>
                    </tr>


            )
        })
        return (
            <div>
                <div className="topnav" id="myTopnav">
                    <a href="/#/dashboard" >Dashboard</a>
                    <a href="/#/search">Search</a>
                    {this.state.userIsAdmin ?
                        <a href="/#/inventory" className="active">Inventory</a> : null
                    }
                    {this.state.userIsPremium ? null :
                        <a href="/#/upgrade" >Upgrade</a>}


                    <a href="/#/profile">Profile</a>
                    <a href="http://localhost:3535/auth/logout">Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>&#9776;</a>
                </div>
                <h1>Manage Invetory Here</h1>

                <div className="search_bar">

                    <div className="new_make">
                        <p>Make:</p>
                        <select onChange={(e) => this.getModels(e.target.value)}>
                            <option>Select</option>
                            {makeSelection}
                        </select>
                    </div>
                    <div className="new_model">
                        <p>Model:</p>
                        <select onChange={(e) => this.setTempModel(e.target.value)}>
                            <option>Select</option>
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


                    <button onClick={this.searchAllInventory}>Clear Filters</button>


                </div>




                {/* <div className="new_waitlist">


                </div> */}


                <div className='inventory_body_wrapper'>

                    <div className="search_results_wrapper">
                        <table className="search_results">
                            <tbody>
                                {searchResultHeaders}
                            </tbody>
                            <tbody>
                                {searchResults}
                            </tbody>
                        </table>
                    </div>




                    {/* <div className='search_results'>

                </div> */}

                    <div className="new_entry_form">
                        <h1 className='new_waitlist_title'>Enter New Vehicle</h1>
                        <div className="new_make">
                            <p>Make:</p>
                            <select onChange={(e) => this.getModels(e.target.value)}>
                                <option>Select</option>
                                {makeSelection}
                            </select>

                            <div className="new_model">
                                <p>Model:</p>
                                <select onChange={(e) => this.setTempModel(e.target.value)}>
                                <option>Select</option>
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
                    </div>

                    {/* <div className="search_form">
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
                    </div> */}

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
