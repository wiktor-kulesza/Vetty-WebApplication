import {Col, Container, ListGroup, Row} from "react-bootstrap"
import ThreadPreview from "./threadPreview"
import {useEffect, useState} from "react";

const ThreadList = (params) => {
    const [threadsToShow, setThreadsToShow] = useState(params.threads);

    useEffect(() => {
        setThreadsToShow(params.threads);
    }, [params]);
    console.log("threads", threadsToShow);
    return (
        <Container>
            <Row>
                <Col>
                    <ListGroup>
                        {threadsToShow && threadsToShow.map((thread) => (
                            <ListGroup.Item key={thread.id}>
                                <ThreadPreview thread={thread}/>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default ThreadList