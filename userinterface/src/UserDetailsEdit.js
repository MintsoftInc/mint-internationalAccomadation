import {Component} from "react";
import {withRouter} from "react-router-dom";

class UserDetailsEdit extends Component {
    emptyItem = {
        id: '',
        email: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const user = await (await fetch('/v1/userDetails/${this.props.match.params.id}')).json();
            this.setState({item: user})
        }
    }
}

export default withRouter(UserDetailsEdit);