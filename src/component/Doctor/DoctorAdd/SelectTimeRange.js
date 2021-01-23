import React from "react";
import { endOfToday, set } from 'date-fns'
import TimeRange from 'react-timeline-range-slider'
import Wrapper from "../../../hoc/Wrapper/Wrapper";
import {Col, Row} from "react-bootstrap";

const now = new Date()
export const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

export const getDateAtSpecificHour = (date , hour = 12) =>
    set((date?date:now), { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)

const startTime = getTodayAtSpecificHour(7)
const endTime = endOfToday()



class  SelectTimeRange extends React.Component{

    state = {
        error: false,
        selectedInterval: [selectedStart, selectedEnd],
    }



    errorHandler = ({ error }) => this.setState({ error })

    onChangeCallback = selectedInterval => {

        let startTime = selectedInterval[0]
        let endTime = selectedInterval[1]
        console.log(startTime.getHours()+":"+startTime.getMinutes());
        console.log('x',selectedInterval)
        this.props.setPart(this.props.id , startTime , endTime , selectedInterval,this.state.error);

    }



    render() {
        const {parts} = this.props;

        let disabledIntervals = parts
        const {  error } = this.state

        console.log()
        return (
            <Wrapper>
                {/*<Row>*/}
                {/*    <Col style={{textAlign:"center"}}>*/}
                {/*        {this.props.date?this.props.date.toLocaleDateString():null}*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <Row>
                    <Col className={"text-right"}>
                        {this.props.selectedInterval?this.props.selectedInterval.start?this.props.selectedInterval.start.toLocaleString():null:null}

                    </Col>

                    <Col className={"text-left"}>
                        {this.props.selectedInterval?this.props.selectedInterval.end?this.props.selectedInterval.end.toLocaleString():null:null}

                    </Col>
                </Row>
                <Row>
                    <TimeRange
                        error={error}
                        ticksNumber={72}
                        // selectedInterval={this.props.selectedInterval}
                        timelineInterval={[getDateAtSpecificHour(this.props.date,7), getDateAtSpecificHour(this.props.date,24)]}
                        onUpdateCallback={this.errorHandler}
                        onChangeCallback={this.onChangeCallback}
                        disabledIntervals={disabledIntervals}
                    />
                </Row>
            </Wrapper>
        )
    }

}

export default SelectTimeRange;