import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './Car_logo.png';
import './Dashboard.css';
import TestComp from '../TestComp/TestComp'
import Profile from '../Profile/Profile';
import MyWaitlist from '../MyWaitlist/MyWaitlist';
import NewWaitlist from '../NewWaitlist/NewWaitlist';

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
        this.AdjustWaitlistVisibility = this.AdjustWaitlistVisibility.bind(this);
        this.testRouteRender = this.testRouteRender.bind(this);
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
    AdjustWaitlistVisibility() {
        const user = this.props.user
        axios.get(`/user_waitlist/${user.id}`).then(res => {
            console.log(res.data)
            this.setState({
                localWaitlist: res.data
            })
            if (this.state.waitlistVisible) {
                this.setState({
                    waitlistVisible: false,
                    waitlistClassName: 'waitlist_invisible'
                });
            } else if (!this.state.waitlistVisible) {
                this.setState({
                    waitlistVisible: true,
                    waitlistClassName: 'waitlist_visible'
                })
            };

            // console.log('I did it', this.state.waitlistVisible, this.state.waitlistClassName)
        }
        )
    }
    deleteWaitlist(id) {
        console.log('the id to delete is ', id)
        axios.delete(`/delete_waitlist/${id}`)
            .then(this.AdjustWaitlistVisibility())
    }
    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    testRouteRender() {
        console.log(this.state.viewingWaitlist)
        !this.state.viewingWaitlist ?
            this.setState({
                viewingWaitlist: true
            })
            :
            this.setState({
                viewingWaitlist: false
            })
            ;
        console.log(this.state.viewingWaitlist)
    }
    render() {
        const user = this.props.user;
        // console.log("user is now ", user)
        // console.log("colorArr is now", this.props.colorArr)

        var waitlistButtonText = () => {
            if (!this.state.waitlistVisible) {
                return 'View Waitlist'
            } else { return 'Close Waitlist' }
        }

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
            <div className='dashboard_wrapper'>

                <div className="topnav" id="myTopnav">
                    <a href="/#/dashboard" className="active">Dashboard</a>
                    <a href="/#/search">Search</a>
                    {this.state.userIsAdmin ?
                        <a href="/#/inventory">Inventory</a> : null
                    }
                    {this.state.userIsPremium ? null :
                        <a href="/#/upgrade" >Upgrade</a>}


                    <a href="/#/profile">Profile</a>
                    <a href="http://localhost:3535/auth/logout">Logout</a>
                    <a href="javascript:void(0);" className="icon" onClick={this.myFunction}>&#9776;</a>
                </div>

                <div className="dash_nav">
                    <a href = "/#/dashboard/my_waitlist">My Waitlists</a>
                    <a href="/#/dashboard/new_waitlist">New Waitlist</a>
                </div>

                

                <div className="dash_profile_wrapper">
                    <div className="dash_pic">
                        {user ? <img src={user.image_url} alt='user profile' /> : null}
                    </div>
                    <div className='the_ps'>
                        <p className='p1'>{user ? user.user_name : null}</p>
                        <p className='p2'>{user ? user.email : null}</p>
                    </div>
                </div>

                <Switch>
                    <Route  path='/dashboard/test' component = {TestComp}/>
                    <Route path='/dashboard/my_waitlist' component = {MyWaitlist}/>
                    <Route  path='/dashboard/new_waitlist' component = {NewWaitlist}/>
                </Switch>



                {/* <div className="waitlist_wrapper">

                    <button onClick={this.AdjustWaitlistVisibility}>{waitlistButtonText()}</button>
                    <table className={this.state.waitlistClassName}>
                        <tbody>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Year</th>
                                <th>Color</th>
                                <th>Adjust</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {userWaitlist}
                        </tbody>
                    </table>

                </div> */}




                {/* <div className="new_waitlist">
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


                </div> */}



                {/* <div className="current_waitlist"></div> */}

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