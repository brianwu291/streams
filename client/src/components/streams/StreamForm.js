import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        //console.log(meta); //從<Field傳來的屬性>
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return ( //新的syntax: {...物件} 會把這個物件作為props傳給這個input element
            <div className={className}>
                <label htmlFor={input.name}>
                    {label}
                </label>
                <input {...input} autoComplete="off" id={input.name} />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        //console.log(this.props); //被 redux-form給包起來的物件們，包含各種表單會用到的事件函數
        return (
            <form className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field name="title"
                    component={this.renderInput}
                    label="Enter Title" />
                <Field name="description"
                    component={this.renderInput}
                    label="Enter description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    //console.log(formValues);
    const error = {};
    if (!formValues.title) {
        error.title = "Title shouldn't be empty";
    }
    if (!formValues.description) {
        error.description = "Description shouldn't be empty";
    }
    return error;
};

export default reduxForm({
    form: 'streamForm',  
    validate
})(StreamForm);