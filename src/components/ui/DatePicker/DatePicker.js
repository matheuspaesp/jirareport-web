import React, { Component } from "react";

import PropTypes from "prop-types";
import classnames from "classnames";
import { format, parse } from "date-fns";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./DatePicker.scss";

const datePattern = "dd/MM/yyyy";

class DatePicker extends Component {
    state = {
        focused: false,
        date: this.props.value ? parse(this.props.value, datePattern, new Date()) : null
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value && this.props.value !== prevProps.value) {
            this.setState({
                date: this.props.value ? parse(this.props.value, datePattern, new Date()) : null
            });
        }
    }

    handleFocus = () => {
        this.setState({ focused: true });
    };

    handleBlur = () => {
        this.setState({ focused: false });
    };

    handleDateChange = date => {
        this.setState({
            date
        });

        const { changeValue, name } = this.props;
        changeValue(name, date ? format(date, datePattern) : "");
    };

    render() {
        const { name, label, errors } = this.props;
        const { date, focused } = this.state;

        return <div className="input-field">
            <ReactDatePicker
                selected={date}
                onChange={this.handleDateChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                dateFormat={datePattern}
                placeholderText=""
                id={name}
                className="browser-default"
                showIcon
            />
            <label htmlFor={name} className={classnames({
                "active": Boolean(date),
                "date-picker__label--focused": focused
            })}>{label}</label>
            {errors && errors.map(e => <span key={e} className="helper-text red-text darken-1">{e}</span>)}
        </div>;
    }
}

DatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    label: PropTypes.string,
    changeValue: PropTypes.func.isRequired
};

export default DatePicker;
