import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';

class ToDoList extends Component {
    state = {
        item: '',
        id: uuidv4(),
        list: [],
        editItem: false
    }

    handleChange = (e) => {
        this.setState({
            item: e.target.value
        });
    }

    handleSubmit = () => {
        let newItem = {
            id: this.state.id,
            item: this.state.item
        }

        let updatedItems = [...this.state.list, newItem];

        this.setState({
            list: updatedItems,
            item: '',
            id: uuidv4(),
            editItem: false
        });
    }

    handleEdit = id => {
        let filteredItems = this.state.list.filter(val => val.id !== id);

        let selectedItem = this.state.list.find(val => val.id === id);

        this.setState({
            list: filteredItems,
            item: selectedItem.item,
            id: id,
            editItem: true
        });
    }

    handleDelete = id => {
        let filteredItems = this.state.list.filter(val => val.id !== id);

        this.setState({
            list: filteredItems
        });
    }

    clearList = () => {
        this.setState({
            list: []
        });
    }

    render() {
        return(
            <div style={{margin: "15px"}}>
                <input
                    style={{marginRight: "10px"}}
                    onChange={this.handleChange}
                    value={this.state.item}
                    type="text"/>
                <button onClick={this.handleSubmit}>{this.state.editItem ? 'Edit Item' : 'Add to List'}</button>
                <ul>
                    {
                        this.state.list.map( i => (
                            <li key={i.id}>
                                {i.item}
                                <span onClick={() => this.handleEdit(i.id)} role="img" aria-label="edit"> &#9998;</span>
                                <span onClick={() => this.handleDelete(i.id)} style={{cursor: "pointer"}} role="img" aria-label="delete"> &#10060;</span>
                            </li>
                        ))
                    }
                </ul>
                <div>
                    <button onClick={this.clearList}>Clear List</button>
                </div>
            </div>
        )
    };
}

export default ToDoList;