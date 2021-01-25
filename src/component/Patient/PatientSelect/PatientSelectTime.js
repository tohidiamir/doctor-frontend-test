import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";

class PatientSelectTime extends React.Component
{
    constructor(props) {
        super(props);

    }





    render() {
        const {calenderTimes} = this.props;
        return (
            <div>
                {
                    calenderTimes.map(calenderTime => {

                        let timeStart =new Date(calenderTime.time_limit_start);
                        let timeEnd =new Date(calenderTime.time_limit_end);

                        return <Card className={"mt-2 p-3"}>
                            <Row>
                                <Col>
                                    {timeStart.toLocaleDateString()+" "+timeStart.toLocaleTimeString()}

                                </Col>
                                <Col>
                                    {timeEnd.toLocaleDateString()+" "+timeEnd.toLocaleTimeString()}
                                </Col>
                                <Col>
                                    {calenderTime.is_reserved?"reserved":"not reserved"}
                                </Col>
                                <Col>
                                    {calenderTime.is_reserved?<Button variant={"dark"}>reserved</Button>:
                                        <Button variant={"primary"}
                                        onClick={e => this.props.handleClickBooking(calenderTime)}
                                        >not reserved</Button>}
                                </Col>
                            </Row>
                        </Card>
                    })
                }
            </div>
        );
    }

}

export default PatientSelectTime;