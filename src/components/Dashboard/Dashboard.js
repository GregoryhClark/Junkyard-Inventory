import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

class Private extends Component {
    constructor() {
        super()
        this.state = {
            tempColor: '',
            tempMake: '',
            tempModel: '',
            tempYear: ''

        }
        this.addWaitlist = this.addWaitlist.bind(this)//wtf?
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
                // console.log('New res.data is now', res.data)
                this.props.getModelArr(res.data);


                // return (
                //     <div>


                //     </div>
                // )
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
            .then()//You will need to put some schtuff here.


    }

    render() {
        const user = this.props.user;
        console.log("user is now ", user)
        console.log("colorArr is now", this.props.colorArr)


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


                <nav class="nav">

                    <div class="nav-wrapper">

                        <div class="logo">
                            Logo here
                        </div>

                        <ul class="links">
                            <li class="link"><a href="/#/search"><div class="link">Search</div></a></li>
                            <li class="link"><a href="/#/upgrade"><div class="link">Upgrade</div></a></li>
                            <li class="link"><a href="/#/dashboard"><div class="link">Dashboard</div></a></li>
                            <li class="link"><a href="/#/profile"><div class="link">Edit Profile</div></a></li>
                            <li class="link"><a href="/#/inventory"><div class="link">Inventory</div></a></li>
                            <li class="link"><a href="http://localhost:3535/auth/logout"><div class="link">Logout</div></a></li>
                        </ul>

                        <div class="nav-mobile">
                            MENU <span>|||</span>
                        </div>

                    </div>





                </nav>



                <h1>Only you can see this. No one else.</h1>

                <p>{user ? <img src={user.image_url} /> : null}</p>
                <p>Username: {user ? user.user_name : null}</p>
                <p>Email: {user ? user.email : null}</p>

                <p>ID: {user ? user.auth_id : null}</p>

                {/* <h1>{console.log('the log in the jsx is ',this.props.colorArr)}</h1> */}


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

                <div className="current_waitlist"></div>

            </div>
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