import {Component} from "react";
import {Button, Container} from "reactstrap";

function AppNavbar() {
    return null;
}

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/v1/userDetails">User Details</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;