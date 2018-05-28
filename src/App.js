import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Button from './components/Button';
import Header from './components/Header';
import NewCharacterForm from './components/NewCharacterForm';
import ItemSummary from './components/ItemSummary';


class App extends Component {
  state = {
    character: null,
    characterIndex: -1,
    makeNewCharacter: false,
    characters: [],
  };

  componentWillMount(){
    axios.get('http://localhost:3002/characters/')
      .then(response => {
        console.log(response);
        this.setState({
          characters: [
            ...response.data
          ],
        })
      })
    .catch(err => console.warn(err));

    axios.get('https://swapi.co/api/planets')
      .then(response => {
        console.log(response);
        this.setState({
          planets: [
            ...response.data.results
          ],
        })
      })
      .catch(err => console.warn(err));
  }

  render() {
    const characterList = this.state.characters
      .map((c, i) => (
        <ItemSummary 
          name={c.name}
          title={c.title}
          homePlanet={c.homePlanet}
          affiliation={c.affiliation}
          key={`items-${i}`}
          clickItem={() => this.editCharacter(c,i)}
          removeItem={e => {e.stopPropagation();
            this.deleteCharacter(i)}}
        />
//          <h3>{ c.name }</h3>
//          {c.title} | {c.affiliation} | {c.homePlanet}
//        <br />
//        <Button onClick={e => {e.stopPropagation();
//        this.deleteCharacter(i)}}>Remove</Button>
//        </li>
      ));

//
//    const inputFields = inputs
//      .map((input, i) => (
//        <div>
//          <div key={`new-character-form-${i}`}>
//            <label>
//              {input.label}:
//              <input 
//                type='text' 
//                value={this.state[input.property]}
//                onChange={e => this.handleChange(e,input.property)} 
//                name={input.property} />
//            </label>
//            </div>
//        </div>
//      ));

    
      return (
      <div className='App'>

      <Header />

        {
          (!this.state.makeNewCharacter && !this.state.character) &&
            <Button clickItem={() => this.showNewCharacterForm()}>
              Add
            </Button>
        }

        {
          (this.state.makeNewCharacter || this.state.character) &&
            <NewCharacterForm
              character={this.state.character || {}}
              onSubmit={
                this.state.character ?
                  (e, update) => this.updateCharacter(e, update) :
                  (e, nc) => this.handleSubmit(e, nc)
              } />
        }



        <ul className='itemList'>
          {characterList}
        </ul>
      </div>
    );
  }

//  handleChange(event, name) {
//    //const { target: { value } } = event;
//    const value = event.target.value;
//    this.setState({ [name] : value });
//  }

handleSubmit(e, newCharacter){
    e.preventDefault();

 
    
    return axios.post('/characters', newCharacter)
      .then(response => {
        const characters = [
          ...this.state.characters,
          response.data,
        ];

        this.setState({ 
          characters,
          makeNewCharacter: false,
        });
      })
      .catch(err => {
        console.warn('character couldn\'t be added');
        console.info(err);
        throw err;
      });
  }

  showNewCharacterForm() {
    this.setState({
      makeNewCharacter: true,
    });
  }
  
  editCharacter(character, index) {
    this.setState({
      character,
      characterIndex: index,
    });
  }
  
  updateCharacter(e, character) {
    return axios.patch('/characters/' + this.state.characterIndex, character)
      .then(response => {
        const characters = this.state.characters.slice();
        
        characters[this.state.characterIndex] = response.data;
        
        this.setState({
          character: null,
          characterIndex: -1,
          characters,
        });
      })
  }
  
  deleteCharacter(index) {
    axios.delete('/characters/' + index)
      .then(() => {
        this.setState({
          characters: this.state.characters.filter((c, i) => i !== index),
        });
      });
  }


  //addOne() {
  //  this.setState({
  //    count: this.state.count + 1,
  //  });
  //}




}

export default App;
