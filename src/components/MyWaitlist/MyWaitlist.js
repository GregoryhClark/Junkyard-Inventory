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


    }
    componentDidMount() {

        this.props.getUser()
            .then((res) => {
                console.log('here it is!', res.value)
                console.log(this.props.user.id)
                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin: res.value.is_admin
                })
                // axios.get(`/user_waitlist/${res.value.id}`).then(

                //     this.setState({
                //         localWaitlist:res.data
                //     })
                // )
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
        axios.get(`/user_waitlist/${this.props.user.id}`).then(res => {

            this.setState({
                localWaitlist: res.data
            })
        })

        // console.log(this.props.user)



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


    }
    setTempYear(selectedYear) {
        this.setState({
            tempYear: selectedYear
        })
    }

    deleteWaitlist(id) {
        console.log('the id to delete is ', id)
        axios.delete(`/delete_waitlist/${id}`)
            .then(this.AdjustWaitlistVisibility())
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

                    <td>{vehicle.make}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.year}</td>
                    <td>{vehicle.color}</td>

                    <td>
                        <button onClick={(e) => this.deleteWaitlist(vehicle.id)}>Delete</button>

                    </td>
                </tr>
            )
        })

        return (
            <div>


                <div className="waitlist_wrapper">


                    <table className="user_waitlist_display">
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