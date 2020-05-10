import React from 'react';
import { Chip } from '@material-ui/core';
import styled from 'styled-components';

const ChipList = styled.div`{
    display: flex;
    flex-flow: row;
}`;
const ChipWrapper = styled.div`{
    margin-right: 5px;
}`;

interface CategoryProps
{
    categories: string[];
    onChange;
}

interface CategoryState
{
    enabled: boolean[]
}

export default class CategoryChips extends React.Component<CategoryProps, CategoryState>
{
    constructor(props) {
        super(props);

        let list: boolean[] = [];
        props.categories.forEach(key => {
            list.push(true);
        });
        this.state = { 
            enabled: list
        };
    }

    toggleEnable(index) {
        let en: boolean[] = this.state.enabled;
        en[index] = !en[index];
        this.setState({
            enabled: en
        }, () => {
            this.props.onChange();
        });
    }

    getValue() {
        return this.state.enabled;
    }

    render() {
        return <ChipList>
            {
                this.props.categories.map((name, index) => {
                    return <ChipWrapper key={index}>
                        <Chip label={name}  
                              clickable
                              color={this.state.enabled[index] ? "primary" : "default"}
                              onClick={(() => {
                                  this.toggleEnable(index);
                              })} />
                    </ChipWrapper>;
                })
            }
        </ChipList>;
    }
}