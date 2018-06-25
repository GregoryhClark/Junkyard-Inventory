import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './NewWaitlist.css';



class Private extends Component {
    constructor() {
        super()
        //set state of all data that may change on this component
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
        //Bind this function
        this.addWaitlist = this.addWaitlist.bind(this)

    }
    componentDidMount() {
        //get the user information and set some of that information to the local state.
        this.props.getUser()
            .then((res) => {
             
                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin: res.value.is_admin
                })
            })
            //axios requests to get the list of colors from the db.
        axios.get('/findcolor')
            .then(res => {
                //invoke getColorArr function (located in the reducer)passing the result from the axios request
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


    addWaitlist() {
        let carDetails = this.state;
        carDetails.user_id = this.props.user.id;

        axios.post(`/addwaitlist`, carDetails)
            .then(res => {

                alert('Vehicle added to waitlist.')


                this.setState({
                    // waitlistVisible: false,
                    // localWaitlist: res.data
                    tempColor: '',
                    tempMake: '',
                    tempModel: '',
                    tempYear: ''

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
            return (

                <tr key={index}>
                   
                    <td>{vehicle.make}</td>
                    <td>

                        {vehicle.model}
                    </td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.color}</td>

                    <td>
                        <button onClick={(e) => this.deleteWaitlist(vehicle.id)}>Delete</button>
                      
                    </td>
                </tr>
            )
        })









        return (
            <div className = "new_waitlist_wrapper">
                <div className="new_waitlist">
                    <h1>New Waitlist</h1>
                    <div className="new_waitlist_options">
                        <p>Make:</p>
                        <select value={this.state.tempMake} onChange={(e) => this.getModels(e.target.value)}>
                            <option>Select</option>
                            {makeSelection}
                        </select>
                        {}
                        <div className="new_model">
                            <p>Model:</p>
                            <select value={this.state.tempModel} onChange={(e) => this.setTempModel(e.target.value)}>
                                <option>Select</option>
                                {modelSelection}
                            </select>
                        </div>
                        <div className="new_year">
                            <p>Year:</p>
                            <select value={this.state.tempYear} onChange={(e) => this.setTempYear(e.target.value)}>
                                <option>Select</option>
                                {yearSelection}
                            </select>
                        </div>
                        <div className="new_color">
                            <p>Color:</p>
                            <select value={this.state.tempColor} onChange={(e) => this.setTempColor(e.target.value)}>
                                <option>Select</option>
                                {colorSelection}
                            </select>
                        </div>

                        <button onClick={this.addWaitlist}>Save</button>
                    </div>

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