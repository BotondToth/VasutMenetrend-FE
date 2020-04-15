import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
class MainPage extends React.Component {
    render() {
        // TODO: Separate header component
        return <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">Vasútmenetrend</Typography>
            </Toolbar>
        </AppBar>
    }
}

export default MainPage;