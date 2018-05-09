import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Search.css';
const { REACT_APP_LOGOUT } = process.env

class Private extends Component {
    constructor() {
        super()
        this.state = {
            localInventory: [],
            tempColor: '',
            tempMake: '',
            tempModel: '',
            tempYear: '',
            userIsAdmin: false,
            userIsPremium: false,
            filterClicked: false,
            searchByColor: ''

        }
        this.searchInventoryFiltered = this.searchInventoryFiltered.bind(this)//wtf?
        this.searchAllInventory = this.searchAllInventory.bind(this)//wtf?
    }
    componentDidMount() {

        this.props.getUser()
            .then((res) => {
                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin: res.value.is_admin,
                    userIsPremium: res.value.is_premium
                })
            })

        axios.get('/findcolor')
            .then(res => {
                this.props.getColorArr(res.data);
            })

        axios.get('/findmakes')
            .then(res => {
                this.props.getMakeArr(res.data);
            })

        axios.get('/findyear')
            .then(res => {
                this.props.getYearArr(res.data);
            })
        axios.get('allinventory')
            .then(res => {
                this.setState({
                    localInventory: res.data
                })
            })


    }


    getModels(selectedMake) {

        this.setState({
            tempMake: selectedMake
        })
        axios.get(`/findmodels/${selectedMake}`)
            .then(res => {
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
    }
    setTempYear(selectedYear) {
        this.setState({
            tempYear: selectedYear
        })
    }
    searchByQuery() {
        axios.get(`/vehicles?color=${this.state.searchByColor}`).then(res => {
            this.setState({
                localInventory: res.data,
                filterClicked: true
            })
        })
    }
    updateSearchByColor(color) {
        this.setState({
            searchByColor: color
        })

    }

    searchInventoryFiltered() {
        let searchObj = this.state;
        let { tempMake, tempColor, tempModel, tempYear } = this.state;
        if (tempMake && tempColor && tempModel && tempYear) {

            axios.get(`/filteredinventory/${tempMake}/${tempModel}/${tempYear}/${tempColor}`)
                .then(res => {
                    this.setState({

                        localInventory: res.data,
                        filterClicked: true
                    })
                })
        } else {
            alert('You must select all values.')
        }
    }
    searchAllInventory() {

        axios.get('/allinventory')
            .then(res => {
                this.setState({
                    localInventory: res.data,
                    filterClicked: false
                })
            })

    }

    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    render() {

        var mappedSearchResults = this.state.localInventory.map((vehicle, index) => {
            function shortenDate(fullDate) {
                var shortDate = fullDate.substring(0, 10)
                return shortDate;
            }
            return (
                <tr key={index}>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.color}</td>
                    <td>{shortenDate(vehicle.date_entered)}</td>
                </tr>
            )
        })

        var linkToNewWaitlist = <Link to='/dashboard/new_waitlist'><p>Click</p></Link>

        var searchResultsHeaders = this.state.localInventory.length ?

            <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Date Entered</th>
            </tr>
            : this.state.filterClicked ? <div>
                <p className="oops">Oops, it looks like we don't have any of those. <Link to="/dashboard/new_waitlist">Click here</Link> to add to your waitlist.
                </p>
            </div>
                : null;


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
        var modelSelection = this.props.modelArr.map((model, index) => {

            if (this.props.modelArr.length > 0) {
                return (
                    <option key={index}>{model.model}</option>

                )
            } else {
                return (

                    <option >Select Make First</option>
                )
            }
        })
        return (
            <div>
                <div className="topnav" id="myTopnav">
                    <a href="/#/dashboard" >Dashboard</a>
                    <a href="/#/search" className="active">Search</a>
                    {this.props.user.is_admin ?
                        <a href="/#/inventory">Inventory</a> : null
                    }

                    {this.props.is_premium ? null :
                        <a href="/#/upgrade" >Upgrade</a>}

                    <a href="/#/profile">Profile</a>
                    <a href={REACT_APP_LOGOUT}>Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>&#9776;</a>
                </div>

                <h1 className="search_header">Search our existing inventory to see if we have what you need!</h1>

                <input onChange={(e) => this.updateSearchByColor(e.target.value)} type="text" className="url_query" />
                <button onClick={() => this.searchByQuery()}>Filter By Color</button>

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
                </div>

                <div className="filter_buttons">
                    <button onClick={this.searchInventoryFiltered}>Filter</button>
                    <button onClick={this.searchAllInventory}>Clear Filters</button>
                </div>








                <div className="search_search_wrapper">
                    <table className="search_search_results">

                        <tbody>
                            {searchResultsHeaders}
                        </tbody>
                        <tbody>
                            {mappedSearchResults}
                        </tbody>
                    </table>
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
