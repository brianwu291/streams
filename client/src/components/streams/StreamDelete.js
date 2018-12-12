import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';
import Modal from '../Modal.js';
import history from '../../history.js';

class StreamDelete extends React.Component{
    componentDidMount(){
        //console.log(this.props);
        this.props.fetchStream(this.props.match.params.id);
    }
    renderActions(){
        const { id } = this.props.match.params;
        return(
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} 
                        className="ui button negative">
                    Delete
                </button>
                <Link to="/" className="ui primary button">Cancel</Link>
            </React.Fragment>
        );
    }
    
    renderContent(){
        if (!this.props.stream) {
            return'Are you sure you want to delete this stream?'
        }

        return`Are you sure you want to delete this stream with title: ${this.props.stream.title}?`
    }

    render(){
        return (
            <Modal 
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}                   
                onDismiss={() => history.push('/')}
                />
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    //console.log(ownProps);
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);