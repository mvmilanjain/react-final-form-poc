import React, {useState} from "react";
import DateFnsUtils from "@date-io/date-fns";
import {Button, Checkbox as MuiCheckbox, Grid, Paper, Typography} from "@material-ui/core";
import {createFilterOptions} from "@material-ui/lab";
import {Form} from "react-final-form";
import {
    Autocomplete,
    Checkboxes,
    DatePicker,
    DateTimePicker,
    Debug,
    KeyboardDatePicker,
    KeyboardDateTimePicker,
    Radios,
    Select,
    Switches,
    TextField,
    TimePicker
} from "mui-rff";

import {useFormStyles} from "../styles";
import {required, validate} from "../utils";

class RenderCount extends React.Component {
    renders = 0;

    render() {
        return <>{++this.renders}</>;
    }
}

const MainForm = ({subscription}) => {
    const classes = useFormStyles();
    const [submittedValues, setSubmittedValues] = useState(undefined);

    const autocompleteData = [
        {label: 'Earth', value: 'earth'},
        {label: 'Mars', value: 'mars'},
        {label: 'Venus', value: 'venus'},
        {label: 'Brown Dwarf Glese 229B', value: '229B'},
    ];
    const checkboxData = [
        {label: 'Ack', value: 'ack'},
        {label: 'Bar', value: 'bar'},
        {label: 'Foo', value: 'foo'},
        {label: 'Indeterminate', value: 'indeterminate', indeterminate: true},
    ];
    const switchData = [
        {label: 'Ack', value: 'ack'},
        {label: 'Bar', value: 'bar'},
        {label: 'Foo', value: 'foo'},
    ];
    const selectData = [
        {label: 'Choose...', value: '', disabled: true},
        {label: 'San Diego', value: 'sandiego'},
        {label: 'San Francisco', value: 'sanfrancisco'},
        {label: 'Los Angeles', value: 'losangeles'},
        {label: 'Saigon', value: 'saigon'},
    ];
    const radioData = [
        {label: 'Female', value: 'female'},
        {label: 'Male', value: 'male'},
        {label: 'Both', value: 'both'},
    ];
    const initialValues = {
        planet_one: autocompleteData[1].value,
        planet: [autocompleteData[1].value],
        best: [],
        switch: ['bar'],
        available: false,
        terms: false,
        date: new Date('2014-08-18T21:11:54'),
        hello: 'some text',
        cities: ['losangeles'],
        gender: '',
        birthday: new Date('2014-08-18'),
        break: new Date('2019-04-20T16:20:00'),
        hidden: 'secret',
        keyboardDateTime: new Date('2017-06-21T17:20:00'),
        dateTime: new Date('2023-05-25T12:29:10'),
        dateTimeLocale: new Date('2023-04-26T12:29:10'),
    };
    const helperText = '* Required';
    const filter = createFilterOptions();

    let key = 0;

    const formFields = [
        <Autocomplete
            key={key++}
            label="Choose one planet"
            name="planet_one"
            multiple={false}
            required={required.planet}
            options={autocompleteData}
            getOptionValue={option => option.value}
            getOptionLabel={option => option.label}
            renderOption={option => option.label}
            disableCloseOnSelect={true}
            helperText={helperText}
            freeSolo={true}
            onChange={(_event, newValue, reason, details) => {
                if (newValue && reason === 'select-option' && details?.option.inputValue) {
                    autocompleteData.push({
                        value: details?.option.inputValue,
                        label: details?.option.inputValue,
                    });
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue.length) {
                    filtered.push({
                        inputValue: params.inputValue,
                        label: `Add "${params.inputValue}"`,
                        value: params.inputValue,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
        />,
        <Autocomplete
            key={key++}
            label="Choose at least one planet"
            name="planet"
            multiple={true}
            required={required.planet}
            options={autocompleteData}
            getOptionValue={option => option.value}
            getOptionLabel={option => option.label}
            disableCloseOnSelect={true}
            renderOption={(option, {selected}) =>
                option.inputValue ? (
                    option.label
                ) : (
                    <>
                        <MuiCheckbox style={{marginRight: 8}} checked={selected}/>
                        {option.label}
                    </>
                )
            }
            helperText={helperText}
            freeSolo={true}
            onChange={(_event, newValue, reason, details) => {
                if (newValue && reason === 'select-option' && details?.option.inputValue) {
                    // Create a new value from the user input
                    autocompleteData.push({
                        value: details?.option.inputValue,
                        label: details?.option.inputValue,
                    });
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        label: `Add "${params.inputValue}"`,
                        value: params.inputValue,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
        />,
        <Switches
            key={key++}
            label="Available"
            name="available"
            required={required.available}
            data={{label: 'available', value: 'available'}}
            helperText={helperText}
        />,
        <Switches
            key={key++}
            label="Check at least one..."
            name="switch"
            required={required.switch}
            data={switchData}
            helperText={helperText}
        />,
        <Checkboxes
            key={key++}
            label="Check at least one..."
            name="best"
            required={required.best}
            data={checkboxData}
            helperText={helperText}
        />,
        <Radios
            key={key++}
            label="Pick a gender"
            name="gender"
            required={required.gender}
            data={radioData}
            helperText={helperText}
        />,
        <KeyboardDatePicker
            key={key++}
            label="Pick a date"
            name="date"
            required={required.date}
            dateFunsUtils={DateFnsUtils}
            helperText={helperText}
        />,
        <KeyboardDateTimePicker
            key={key++}
            label="Pick a date and time"
            name="keyboardDateTime"
            required={required.keyboardDateTime}
            dateFunsUtils={DateFnsUtils}
            helperText={helperText}
        />,
        <DatePicker
            key={key++}
            label="Birthday"
            name="birthday"
            required={required.birthday}
            dateFunsUtils={DateFnsUtils}
            helperText={helperText}
        />,
        <TimePicker
            key={key++}
            label="Break time"
            name="break"
            required={required.break}
            dateFunsUtils={DateFnsUtils}
            helperText={helperText}
        />,
        <DateTimePicker
            key={key++}
            label="Pick a date and time"
            name="dateTime"
            required={required.dateTime}
            dateFunsUtils={DateFnsUtils}
            helperText={helperText}
        />,
        <DateTimePicker
            key={key++}
            label="Pick a date and time (russian locale)"
            name="dateTimeLocale"
            required={required.dateTimeLocale}
            dateFunsUtils={DateFnsUtils}
            helperText={helperText}
        />,
        <TextField key={key++} label="Hello world" name="hello" required={required.hello} helperText={helperText}/>,
        <TextField
            key={key++}
            label="Hidden text"
            name="hidden"
            type="password"
            autoComplete="new-password"
            required={required.hidden}
            helperText={helperText}
        />,
        <Select
            key={key++}
            label="Pick some cities..."
            name="cities"
            required={required.cities}
            data={selectData}
            multiple={true}
            helperText="Woah helper text"
        />,
        <Checkboxes
            key={key++}
            name="terms"
            required={required.terms}
            data={{
                label: 'Do you accept the terms?',
                value: true,
            }}
            helperText={helperText}
        />,
    ];

    const onReset = () => setSubmittedValues(undefined);

    const onSubmit = (values) => setSubmittedValues(values);

    return (
        <Paper className={classes.paper}>
            <Form
                onSubmit={onSubmit}
                initialValues={submittedValues ? submittedValues : initialValues}
                subscription={subscription}
                validate={validate}
                key={subscription}
                render={({handleSubmit, submitting}) => (
                    <form onSubmit={handleSubmit} noValidate={true} autoComplete="new-password">
                        <Grid container>
                            <Grid item xs={6}>
                                {formFields.map((field, index) => (
                                    <Grid item key={index}>
                                        {field}
                                    </Grid>
                                ))}
                                <Grid item className={classes.buttons}>
                                    <Button type="button" variant="contained" onClick={onReset} disabled={submitting}>
                                        Reset
                                    </Button>
                                    <Button variant="contained" color="primary" type="submit" disabled={submitting}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item>
                                    <Paper className={classes.paperInner} elevation={3}>
                                        <Typography>
                                            <strong>Render count:</strong> <RenderCount/>
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paperInner} elevation={3}>
                                        <Typography>
                                            <strong>Form field data</strong>
                                        </Typography>
                                        <Debug/>
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={classes.paperInner} elevation={3}>
                                        <Typography>
                                            <strong>Submitted data</strong>
                                        </Typography>
                                        <pre>
											{JSON.stringify(submittedValues ? submittedValues : {}, undefined, 2)}
										</pre>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </Paper>
    );
}

export default MainForm;
