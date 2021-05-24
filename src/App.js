import React, {useState} from 'react';
import 'date-fns';
import {Checkbox as MuiCheckbox, CssBaseline, FormControlLabel, Link, Paper, ThemeProvider} from '@material-ui/core';
import {theme, useStyles} from './styles';

import MainForm from "./components/MainForm";

const App = () => {
    const classes = useStyles();

    const subscription = {submitting: true};
    const [subscriptionState, setSubscriptionState] = useState(subscription);

    const onChange = () => {
        setSubscriptionState(subscriptionState === undefined ? subscription : undefined);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.wrap}>
                <CssBaseline/>
                <Paper className={classes.subscription}>
                    <FormControlLabel
                        control={
                            <MuiCheckbox
                                checked={subscriptionState !== undefined}
                                onChange={onChange} value={true}
                            />
                        }
                        label="Enable React Final Form subscription render optimization. Watch the render count when interacting with the form."
                    />
                    <Link
                        href="https://final-form.org/docs/react-final-form/types/FormProps#subscription"
                        target="_blank"
                    >
                        Documentation
                    </Link>
                </Paper>
                <MainForm subscription={subscriptionState}/>
            </div>
        </ThemeProvider>
    );
}

export default App;
