import React from 'react';
import { List, ListItem, ListItemText, ListSubheader, ListItemSecondaryAction, IconButton, Divider, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

const Wrapper = styled.div`{
    display: flex;
    flex-flow: column;
    width: 100%;
}`;
const FullWidthList = styled(List)`{
    width: 100%;
}`;

interface Props {
    onChange();
}

interface State {
    cities: string[]
}

export default class CityList extends React.Component<Props, State> {
    cityInputRef;

    constructor(props) {
        super(props);

        this.cityInputRef = React.createRef();

        this.state = {
            cities: []
        };
    }

    handleDelete(index) {
        let array = this.state.cities;
        array.splice(index, 1);
        this.setState({
            cities: array
        }, () => {
            this.props.onChange();
        });
    }

    handleAdd() {
        if (this.cityInputRef.current.value.length === 0) {
            return;
        }

        this.setState({
            cities: [...this.state.cities, this.cityInputRef.current.value ]
        }, () => {
            this.props.onChange();
        });
        this.cityInputRef.current.value = "";
    }

    getValue() {
        return this.state.cities;
    }

    render() {
        return <Wrapper>
            <FullWidthList subheader={<ListSubheader component="div" id="nested-list-subheader">Városok</ListSubheader>}>
                {
                    this.state.cities.map((value, index) => {
                        return <ListItem key={index}>
                            <ListItemText primary={value} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => this.handleDelete(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })
                }
                <Divider />
                <ListItem>
                    <TextField inputRef={this.cityInputRef} fullWidth label="Város" />
                    <IconButton edge="end" aria-label="delete" onClick={this.handleAdd.bind(this)}>
                        <AddIcon />
                    </IconButton>
                </ListItem>
            </FullWidthList>
        </Wrapper>;
    }
}