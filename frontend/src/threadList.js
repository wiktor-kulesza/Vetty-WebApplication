import {Col, Container, ListGroup, Row} from "react-bootstrap"
import ThreadPreview from "./threadPreview"

const ThreadList = (threads) => {

    console.log("threads", threads)
    console.log("thread type", typeof threads.threads)

    return (
        <Container>
            <Row>
                <Col>
                    <ListGroup>
                        {threads.threads.map((thread) => (
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