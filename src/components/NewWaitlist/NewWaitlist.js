import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';



class Private extends Component {
    constructor() {
        super()
        this.state = {
            localUserID: -1,
            localWaitlist: [],
            tempColor: '',
            tempMake: '',
            tempModel: '',
            tempYear: '',
            waitlistVisible: false,
            waitlistClassName: 'waitlist_invisible',
            userIsAdmin: false,
            userIsPremium: false,
            viewingWaitlist: false


        }
        this.addWaitlist = this.addWaitlist.bind(this)//wtf?

    }
    componentDidMount() {

        this.props.getUser()
            .then((res) => {
                console.log('here it is!', res.value)
                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin: res.value.is_admin
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

        console.log(this.props.user)



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


    addWaitlist() {
        let carDetails = this.state;
        carDetails.user_id = this.props.user.id;
        console.log('carDetails on dash is now ', carDetails)

        axios.post(`/addwaitlist`, carDetails)
            .then(res => {

                this.setState({
                    waitlistVisible: false,
                    localWaitlist: res.data
                })
            }
            )//You will need to put some schtuff here.

    }
    render() {
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
        var userWaitlist = this.state.localWaitlist.map((vehicle, index) => {
            console.log(this.state.localWaitlist)
            return (

                <tr key={index}>
                    {/* I can add the edit functionality later if needed */}
                    {/* <td>{vehicle.make} <select onChange={(e) => this.getModels(e.target.value)}><option>Select</option>{makeSelection}</select></td>
                <td>{vehicle.model}<select><option>Select</option>{modelSelection}</select></td>
                <td>{vehicle.year}<select><option>Select</option>{yearSelection}</select></td>
                <td>{vehicle.color}<select><option>Select</option>{colorSelection}</select></td> */}
                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.color}</td>

                    <td>
                        <button onClick={(e) => this.deleteWaitlist(vehicle.id)}>Delete</button>
                        {/* <button onClick={(e) => this.deleteInventory(vehicle.id)}>Edit</button> */}
                    </td>
                </tr>
            )
        })









        return (

            <div className="new_waitlist">
                <h1>New Waitlist</h1>
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

                    <button onClick={this.addWaitlist}>Save</button>
                </div>


            </div>



        )
    }
}
function mapStateToProps(state) {
    const { user, colorArr, makeArr, modelArr, yearArr, navbarSlide } = state
    return {
        user,
        colorArr,
        makeArr,
        modelArr,
        yearArr,
        navbarSlide
    }
}

export default connect(mapStateToProps, { getUser, getColorArr, getMakeArr, getModelArr, getYearArr })(Private)