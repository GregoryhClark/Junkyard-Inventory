import React, { Component } from 'react'
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { getUser, getColorArr, getMakeArr, getModelArr, getYearArr } from './../../ducks/users';
import { Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './MyWaitlist.css';
import 'react-confirm-alert/src/react-confirm-alert.css'



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

                this.setState({
                    localUserID: res.value.id,
                    userIsAdmin: res.value.is_admin
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
        axios.get(`/user_waitlist/${this.props.user.id}`).then(res => {

            this.setState({
                localWaitlist: res.data
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

    deleteWaitlist(id) {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: ()=>{
                        axios.delete(`/delete_waitlist/${id}`)
                        .then(        axios.get(`/user_waitlist/${this.props.user.id}`).then(res => {
            
                            this.setState({
                                localWaitlist: res.data
                            })
                        }))
                    }
                },
                {
                    label: 'No',
                    onClick: () => null
                  }
            ]
        })
    }

    render() {
        const user = this.props.user;

        var waitlistButtonText = () => {
            if (!this.state.waitlistVisible) {
                return 'View Waitlist'
            } else { return 'Close Waitlist' }
        }

        var searchResultsHeaders = this.state.localWaitlist.length ?
    
            <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Date Entered</th>
            </tr>
            
            :null;

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
                        <div>
                            <tbody>
                               {searchResultsHeaders}
                            </tbody>
                            <tbody>
                                {userWaitlist}
                            </tbody>
                        </div>
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