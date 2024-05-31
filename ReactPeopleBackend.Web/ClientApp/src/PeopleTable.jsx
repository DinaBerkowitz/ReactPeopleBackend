

import React from 'react';
import PersonAddForm from './PersonAddForm';
import axios from 'axios';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {

    state = {
        person: { id: '', firstName: '', lastName: '', age: '' },
        people: [],
        selectedPeopleIds: [],
        isEdit: false
    }

    componentDidMount = () => {
        this.loadPeople();
    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(response => {
            this.setState({ people: response.data });
        });

    }

    onAddClick = () => {
        const { firstName, lastName, age } = this.state.person;
        axios.post('/api/people/add', { firstName: firstName, lastName: lastName, age: age }).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                },
            })
        });
    }


    onDeleteManyClick = () => {
        axios.post('api/people/deletepeople', { ids: this.state.selectedPeopleIds }).then(response => {
            this.loadPeople();
        })
    }

    onDeleteClick = (id) => {
        axios.post('api/people/deleteperson', { Id: id }).then(response => {
            this.loadPeople();
        })
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onSelectClick = (id) => {
        const { selectedPeopleIds } = this.state;

        let idsSelected = selectedPeopleIds.includes(id) ? [...selectedPeopleIds.filter(i => i !== id)] : [...selectedPeopleIds, id];
        this.setState({ selectedPeopleIds: idsSelected });
    }

    onEditClick = (p) => {
        this.setState({ person: { id: p.id, firstName: p.firstName, lastName: p.lastName, age: p.age }, isEdit: true })
        this.loadPeople()
    }

    onSelectAll = () => {
        this.setState({ selectedPeopleIds: [...this.state.people.map(p => p.id)] })
    }

    onUncheckAll = () => {
        this.setState({ selectedPeopleIds: [] })
    }

    onUpdateClick = () => {
        axios.post('/api/people/editperson', this.state.person).then(response => {
            this.loadPeople();
            this.setState({
                person: {firstName: '', lastName: '', age: '', id: ''},
            })
        });
    }



    onCancelClick = () => {
        this.setState({ person: { firstName: '', lastName: '', age: '' }, isEdit: false })
    }


    render() {
        const { person, people, selectedPeopleIds, isEdit } = this.state;
        return (
            <>
                <PersonAddForm people={people}
                    person={person}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isEdit={isEdit}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />

                <div className='row mt-2'>
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr >

                                <td>
                                    <div className="row">
                                        <div className="container col-md-4 ">

                                            <button onClick={this.onDeleteManyClick} className="btn btn-danger w-100">Delete All Selected</button>
                                            <br />
                                            <button onClick={this.onUncheckAll} className="btn btn-outline-danger w-100">Uncheck All</button>
                                            <br />
                                            <button onClick={this.onSelectAll} className="btn btn-outline-danger w-100">Check All</button>
                                        </div>
                                    </div>
                                </td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Age</td>
                                <td>Edit/Delete</td>

                            </tr>
                        </thead>)

                        <tbody>
                            {people.map(p => <PersonRow
                                person={p}
                                selected={selectedPeopleIds.includes(p.id)}
                                onSelectClick={() => this.onSelectClick(p.id)}
                                onDeleteClick={() => this.onDeleteClick(p.id)}
                                onEditClick={() => this.onEditClick(p)}
                            />)}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default PeopleTable;