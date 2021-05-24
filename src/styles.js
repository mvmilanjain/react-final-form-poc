import {createMuiTheme, makeStyles} from "@material-ui/core";

export const theme = createMuiTheme({
    props: {
        MuiTextField: {margin: 'normal'},
        MuiFormControl: {margin: 'normal'}
    }
});

export const useStyles = makeStyles(theme => ({
    subscription: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
    },
    wrap: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));

export const useFormStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
        marginBottom: theme.spacing(5),
    },
    paperInner: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
    },
    buttons: {
        '& > *': {
            marginTop: theme.spacing(3),
            marginRight: theme.spacing(1),
        }
    }
}));
