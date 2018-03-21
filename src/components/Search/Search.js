import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Search.css';


class Private extends Component {
    constructor() {
        super()
        this.state = {
            localInventory:[],
            tempColor: '',
            tempMake: '',
            tempModel: '',
            tempYear: '',
            userIsAdmin:false,
            userIsPremium:false

        }
        this.searchInventoryFiltered = this.searchInventoryFiltered.bind(this)//wtf?
        this.searchAllInventory = this.searchAllInventory.bind(this)//wtf?
    }
    componentDidMount() {

        this.props.getUser()
            .then((res) => {
                console.log('here it is!',res.value)
                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin:res.value.is_admin,
                    userIsPremium:res.value.is_premium
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

    searchInventoryFiltered() {
        let searchObj = this.state;
        console.log('searchObj is now ', searchObj)
        axios.get(`/filteredinventory/${this.state.tempMake}/${this.state.tempModel}/${this.state.tempYear}/${this.state.tempColor}`)
            .then(res => {
                console.log('filtered res.data is finally', res.data)
                this.setState({
                    
                    localInventory:res.data
                })

                console.log('filtered res.data is now', res.data)
            })
    }
    searchAllInventory() {
        
        axios.get('/allinventory')
            .then(res => {
                this.setState({
                    localInventory:res.data
                })

                console.log('all inv res.data is now', res.data)
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

        var searchResults = this.state.localInventory.length > 0 ?

        this.state.localInventory.map((vehicle, index) => {
            function shortenDate(fullDate){
                var shortDate = fullDate.substring(0,10)
                return shortDate;
            }
            return (
                <tr key = {index}>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.color}</td>
                    <td>{shortenDate(vehicle.date_entered)}</td>
                </tr>
        )})
        : "Oops, it looks like we don't have any of those."


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
            console.log(modelSelection)

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
                    {this.state.userIsAdmin ?
                    <a href="/#/inventory">Inventory</a> : null
                    }
                    {this.state.userIsPremium ? null:
                    <a href="/#/upgrade" >Upgrade</a> }
                    
                    
                    <a href="/#/profile">Profile</a>
                    <a href="http://localhost:3535/auth/logout">Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>&#9776;</a>
                </div>
    
                <h1>Search our existing inventory to see if we have what you need!</h1>


                <p>Username: {user ? user.user_name : null}</p>


                <div>
                    <button onClick={this.searchAllInventory}>Search All</button>
                </div>

                <table className="search_results">
                    <tbody>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Color</th>
                            <th>Date Entered</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {searchResults}
                    </tbody>
                </table>



                <div className='search_results'>






                </div>











                <h1>Filter Here</h1>
                <div className="new_make">
                    <p>Make:</p>
                    <select onChange={(e) => this.getModels(e.target.value)}>
                        <option>Select</option>
                        {makeSelection}
                    </select>
                    {}
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
