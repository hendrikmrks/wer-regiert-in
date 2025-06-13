import React from 'react';
import {Card, Col, Row} from "react-bootstrap";

const Coalition = ({state, colors}) => {
    const coalition = state["coalition"];
    return(
        <Row>
            {coalition.map((coa, index) => (
                <Col sm={6} className="mb-4" key={`coa-${index}`}>
                    <Card
                        className="h-100"
                        style={{
                            backgroundColor:
                                colors[coa]["color"],
                            color: "#f7f5f5",
                        }}
                    >
                        <Card.Body>
                            <Card.Title>{coa}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default Coalition;
