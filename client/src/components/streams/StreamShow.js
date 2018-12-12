import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component{
    constructor(props){
        super(props);

        this.vidoeRef = React.createRef();
    }

    componentDidMount(){
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        //console.log("I was Unmounted!");
        this.player.destroy();
    }

    buildPlayer(){
        if (this.player || !this.props.stream) {
            return;
        }

        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.vidoeRef.current);
        this.player.load();
    }

    render(){
        if (!this.props.stream) {
            return(
                <div>Loading...</div>
            );
        }

        const {title, description} = this.props.stream;

        return (
            <div>
                <video ref={this.vidoeRef} style={ {width:"100%"} } controls={true}/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
};

const mpaStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mpaStateToProps, { fetchStream })(StreamShow);