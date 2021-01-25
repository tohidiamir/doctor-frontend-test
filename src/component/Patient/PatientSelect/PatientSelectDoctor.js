import React from "react";
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import axios from '../../../services/AxoisOrder/AxoisOrderWithAuth'
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import PatientSelectTime from "./PatientSelectTime";
import * as classes from '../Patient.module.css'
import {SingleDatePicker} from "react-dates/esm";
import {toast} from "react-toastify";

class PatientSelectDoctor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            selectDoctor: null,
            time_zone: null,
            datepickerFocus: false,
            date: null,
            isLoadingTime: false,
            calenderTimes : []
        }

        this.handleClickDoctor = this.handleClickDoctor.bind(this)
        this.handleClickBooking = this.handleClickBooking.bind(this)
        this.FetchTime = this.FetchTime.bind(this)
    }

    componentDidMount() {
        axios.get('/api/doctor/get').then(res => {
            console.log(res.data)
            this.setState({
                doctors: res.data
            })
        }).catch(err => {
            console.log(err)
        })

        const timezoneOffset = (new Date()).getTimezoneOffset();
        this.setState({
            time_zone: ((timezoneOffset / 60) * -1)
        })
    }

    handleClickDoctor = (doctor) => {
        this.setState({
            selectDoctor: doctor
        });

        this.FetchTime(doctor, this.state.date)
    }

    FetchTime = (doctor, date) => {
        console.log(doctor, date)

        if (doctor && date) {
            this.setState({
                isLoadingTime: true
            })


            axios.get('/api/doctor/calender/get', {
                params: {
                    doctor: doctor._id,
                    date: date._d
                }
            }).then(res => {
                console.log(res.data)

                if(res.data.status && res.data.status  == 'fail')
                {
                    toast.error('doctor dont have time ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    this.setState({
                        calenderTimes : [],
                        isLoadingTime : false
                    })
                }
                else
                {
                    this.setState({
                        calenderTimes : res.data,
                        isLoadingTime : false
                    })
                }

            }).catch(error => {
                console.log(error)
            })

        }
    }

    handleClickBooking = (calenderTime) => {

        axios.post('/api/patient/booking',{
            params : {
                x:"x",
                doctorCalenderPartId : calenderTime._id
            }
        }).then(res => {
            let data = res.data;
            if(res.data.status && res.data.status == 'success')
            {
                toast.success('reserved')

                calenderTime.is_reserved = true;

                let calenderTimes = this.state.calenderTimes.map(t => {
                    if(t._id == calenderTime._id)
                    {
                        t.is_reserved = true;
                    }
                    return t;
                })
                this.setState({
                    calenderTimes : calenderTimes
                })
            }

        }).catch(err => {

        })
    }

    render() {

        const {doctors, selectDoctor, datepickerFocus, date, time_zone ,calenderTimes} = this.state;

        return <Wrapper>
            <Form>
                <Form.Group>
                    <Form.Label>TimeZone</Form.Label>
                    <Form.Control type={"text"} placeholder={"Time Zone"}
                                  value={"UTC " + (time_zone > 0 ? "+" : "-") + time_zone}/>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <SingleDatePicker
                        id="date_input"
                        date={date}
                        focused={datepickerFocus}
                        onDateChange={(value) => {
                            console.log(value._d)
                            this.setState({
                                date: value
                            })
                            this.FetchTime(selectDoctor, value)
                        }}
                        onFocusChange={(e) => {
                            this.setState({
                                datepickerFocus: e.focused
                            })
                        }}
                    />
                    {/*<Form.Control type={"text"} placeholder={"Date"} />*/}
                </Form.Group>

                <Form.Group>
                    <Row>
                        {doctors.map((doctor, index) => {
                            return <Col xs={4} key={index}>
                                <Card onClick={e => this.handleClickDoctor(doctor)}
                                      className={(selectDoctor && doctor._id === selectDoctor._id) ? classes.active : null}>
                                    {doctor.name}
                                </Card>
                            </Col>
                        })}
                    </Row>
                </Form.Group>

                {date ? selectDoctor ? !this.state.isLoadingTime ? <PatientSelectTime
                    doctor={selectDoctor}
                    date={date}
                    calenderTimes={calenderTimes}
                    handleClickBooking={this.handleClickBooking}
                /> : <Wrapper>Please select time</Wrapper> : <Wrapper>
                    Please Select Doctor
                </Wrapper> : <Wrapper>Please Select Time</Wrapper>}

            </Form>
        </Wrapper>
    }

}

export default PatientSelectDoctor;