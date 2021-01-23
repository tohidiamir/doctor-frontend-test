import React from 'react'
import {Button, ButtonGroup, Container, Form,} from "react-bootstrap";
import {SingleDatePicker} from "react-dates/esm";
import SelectTimeRange from "./SelectTimeRange";
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import axios from "../../../services/AxoisOrder/AxoisOrder";
import {toast} from "react-toastify";

const DoctorAdd = props => {

    const [timeZone, setTimeZone] = React.useState(null);
    const [value, onChange] = React.useState(null);
    const [datepickerFocus, setDatePickerFocus] = React.useState(false)

    const [state, setState] = React.useState({
        parts: [],
        partsValue: [],
        countPart: 1
    });


    React.useEffect(() => {
        const timezoneOffset = (new Date()).getTimezoneOffset();
        setTimeZone((timezoneOffset / 60) * -1);
    }, []);

    function setPart(id, start, end, selectedInterval, error,) {
        let partTime = {key: id, start: start, end: end, error: error}
        let partsNew = state.parts.filter(item => item.key != id);


        setState({
            ...state,
            parts: [
                ...partsNew,
                partTime
            ]
        })
    }

    function sendRequest()
    {
        axios.post('/api/doctor/calender/add',{
            params: {
                appointment_date_at: value,
                time_zone : timeZone,
                timeSelect : state.parts
            }
        }).then(res => {
            console.log(res.data.status)
            if(res.data.status == 'success')
            {
                toast.success('Success Submit', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch(error => {
            toast.error('Error ',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })

    }




    return <Wrapper>
        <Container className={"pt-3"}>
            <Form>
                <Form.Group>
                    <Form.Label>TimeZone</Form.Label>
                    <Form.Control type={"text"} placeholder={"Time Zone"}
                                  value={"UTC " + (timeZone > 0 ? "+" : "-") + timeZone}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Token Doctor</Form.Label>
                    <Form.Control type={"text"} placeholder={"Token"}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <SingleDatePicker
                        id="date_input"
                        date={value}
                        focused={datepickerFocus}
                        onDateChange={(value) => {
                            console.log(value._d)
                            onChange(value)
                            setState({
                                countPart: 1,
                                parts: []
                            })
                        }}
                        onFocusChange={(e) => {
                            console.log(e)
                            setDatePickerFocus(e.focused)
                        }}
                    />
                    {/*<Form.Control type={"text"} placeholder={"Date"} />*/}
                </Form.Group>
                <Form.Group>
                    <ButtonGroup>
                        <Button
                            disabled={(!value)}
                            onClick={() => {
                                let d = state.parts.find(item => item.key == state.countPart - 1)

                                if (!d)
                                    alert('select time')
                                else if (d.error)
                                    alert('error')
                                else
                                    setState({
                                        ...state,
                                        countPart: state.countPart + 1
                                    })
                            }}>Plus</Button>
                        <Button
                            disabled={(!value)}
                            onClick={() => {
                                setState({
                                    ...state,
                                    parts: state.parts.filter(item => item.key != state.countPart - 1),
                                    countPart: state.countPart - 1
                                })
                            }}>Minus</Button>
                    </ButtonGroup>
                </Form.Group>
                <Form.Group>
                    {Array(state.countPart).fill(0).map((item, index) => {

                        // let find = state.parts.find(item => item.key == index)

                        return <div style={{position: "relative" , zIndex:'-1 !important'}}>
                            {(state.countPart > index + 1 || !value) ?
                                <div style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 1000,
                                    backgroundColor: "white",
                                    opacity: "0.3"
                                }}>

                                </div>
                                : null}
                            <SelectTimeRange
                                date={value ? value._d : null}
                                parts={state.parts.filter(item => item.key != index)}
                                id={index}
                                setPart={setPart}
                                selectedInterval={state.parts.find(item => item.key == index)}
                            />
                        </div>
                    })}


                </Form.Group>
                <Form.Group>
                    <Button onClick={sendRequest}>
                        Submit Time
                    </Button>
                </Form.Group>


            </Form>
        </Container>
    </Wrapper>
}

export default DoctorAdd;