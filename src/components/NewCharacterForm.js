import React, { Component } from 'react';

import Button from './Button';

class NewCharacterForm extends Component {
    inputs = [
        {
          label: 'Name',
          property: 'name',
        },
        {
          label: 'Title',
          property: 'title',
        },
        {
            label: 'Affiliation',
            property: 'affiliation',
        },
        {
            label: 'Home Planet',
            property: 'homePlanet',
        }
    ];

    constructor(props) {

        super(props);


        this.state = {
            name: (props.character && props.character.name) || '',
            title: (props.character && props.character.title) || '',
            affiliation: (props.character && props.character.affiliation) || '',
            homePlanet: (props.character && props.character.homePlanet) || '',
          };
    }

    render() {
        const inputs = this.inputs
          .map((input, i) => (
            <div  key={`new-character-form-${i}`}>
              <div>
                <label>
                  {input.label}:
                  <input 
                    type='text' 
                    value={this.state[input.property]}
                    onChange={e => this.handleChange(e,input.property)} 
                    name={input.property} />
                </label>
                </div>
            </div>
          ));

        return(
            <form name='add-character-form' >
            {inputs}

            <Button className='raised' type='submit' onClick={e => this.handleSubmit(e)}>
              Add
            </Button><br/>
          </form>
        );
    };


    handleChange(event, name) {
        const value = event.target.value;
        this.setState({ [name] : value });
    };
    
    
    handleSubmit(e){
        e.preventDefault(); 
        const { name, title, affiliation, homePlanet } = this.state;    
        const newCharacter = {name, title, affiliation, homePlanet};

        if (this.props.onSubmit){
            this.props.onSubmit(e, newCharacter)
                //.then(() => {
                //    this.setState({
                //        name: '',
                //        title: '',
                //        affiliation: '',
                //        homePlanet: ''
                //    });
                //});
        }
    }


    
    
}



export default NewCharacterForm;