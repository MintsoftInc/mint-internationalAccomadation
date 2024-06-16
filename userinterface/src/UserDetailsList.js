import React, {Component} from "react";
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Table} from 'reactstrap';

class UserDetailsList extends Component {

    constructor(props) {
        super(props);
        this.state = {userDetails: []}
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/v1/userDetails')
            .then(response => response.json())
            .then(data => this.setState({userDetails: data}))
    }

    async remove (id) {
       await fetch(`/v1/userDetails/${id}`, {
           method: 'DELETE',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           }
       }).then(() => {
           let updateUser = [...this.state.userDetails].filter(i => i.id !== id);
           this.setState({userDetails: updateUser})
       });
    }
    render () {
        const {userDetails, isLoading} = this.state;
        if (isLoading) {
            return <p>Loading...</p>
        }
        const userDetailsList = userDetails.map(userDetail => {
            return <tr key={userDetail.id}>
                <td style={{whiteSpace: 'nowrap'}}>{userDetail.emailAddress}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/v1/userDetails/" + userDetail.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(userDetail.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/v1/userDetails/new">Add User</Button>
                    </div>
                    <h3>Clients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Email</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userDetailsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const userDetail = await (await fetch (`v1/userDetails/${this.props.match.params.id}`)).json()
            this.setState({item: userDetail});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = value.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit() {
        event.preventDefault();
        const {item} = this.state;
        await fetch('/v1/userDetails' + (item.id ? '/' + item.id: ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push('/v1/userDetails')
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit User' : 'Add UserDetail'}</h2>;
        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    {/*<FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>*/}
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={item.email || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/v1/userDetails">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default UserDetailsList;