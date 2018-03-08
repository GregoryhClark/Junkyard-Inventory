import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Private extends Component {
    constructor() {
        super()
        this.state = {
            localInventory:[],
            tempColor: '',
            tempMake: '',
            tempModel: '',
            tempYear: ''

        }
        this.searchInventory = this.searchInventory.bind(this)//wtf?
        this.searchAllInventory = this.searchAllInventory.bind(this)//wtf?
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

    searchInventory() {
        let searchObj = this.state;
        console.log('searchObj is now ', searchObj)
        axios.get('/inventory', searchObj)
            .then()
    }
    searchAllInventory() {
        
        axios.get('/allinventory')
            .then(res => {
                this.setState({
                    localInventory:res.data
                })

                console.log('res.data is now', res.data)
            })

    }



    render() {
        var searchResults = this.state.localInventory.map((vehicle, index) => {
            return (
                <tr>
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.color}</td>
                </tr>
        )})
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
                <h1>Search our existing inventory to see if we have what you need!</h1>



                <Link to='/profile'>
                    <button className='btn'>Edit Profile</button>
                </Link>
                <Link to='/dashboard'>
                    <button className='btn'>Dashboard</button>
                </Link>
                <Link to='/upgrade'>
                    <button className='btn'>Upgrade</button>
                </Link>
                <a href='http://localhost:3535/auth/logout'><button>Log out</button></a>

                <p>Username: {user ? user.user_name : null}</p>

                <div className="new_waitlist">


                </div>
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

                    <button onClick={this.searchInventory}>Save</button>
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
