import React, {Component} from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';

import Header from './Extra/Header'
import ListCards from './Todo/ListCards'
import SideBar from './SideBar/SideBar';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      selected: 1,
      selectedName:'',
      /*categories:[
        {name:'Work',     id:1},
        {name:'Study',    id:2},
        {name:'Home',     id:3},
        {name:'Hobbies',  id:4},
        /*{name:'Work', id:1, tasks:[
          {name:'Crear página web', subtasks:[
            'Hacer el diseño UI', 'Comprar el hosting', 'Desarrollar el backend'
          ]},
          {name:'Comprar', subtasks:[
            'Hacer el diseño UI', 'Comprar el hosting', 'Desarrollar el backend'
          ]},
          {name:'Crear página web', subtasks:[
            'Hacer el diseño UI', 'Comprar el hosting', 'Desarrollar el backend'
          ]},
          {name:'Crear página web', subtasks:[
            'Hacer el diseño UI', 'Comprar el hosting', 'Desarrollar el backend'
          ]},
        ]},
        {name:'Study', tasks:[
          {name:'Crear página web', subtasks:[
            'Hacer el diseño UI', 'Comprar el hosting', 'Desarrollar el backend'
          ]}
        ]},
        {name:'Home', tasks:[
          {name:'Crear página web', subtasks:[
            'Hacer el diseño UI', 'Comprar el hosting', 'Desarrollar el backend'
          ]}
        ]},
        {name:'Hobbies', tasks:[
          {name:'Crear página web', subtasks:[
            'Hacer el diseño UI', 'Comprar el hosting', 'Desarrollar el backend'
          ]}
        ]},*/
      /*],
      cards:[
        
        {name: 'Crear página web', categoryId:1, id:2, subtasks:[
          {text:'Hacer el diseño UI', completed: false},
          {text:'Hacer el diseño UI', completed: false}, 
          {text:'Hacer el diseño UI', completed: false},
        ]},
        {name: 'Crear página web', categoryId:2, id:3, subtasks:[
          {text:'Hacer el diseño UI', completed: false},
          {text:'Hacer el diseño UI', completed: false}, 
          {text:'Hacer el diseño UI', completed: false},
        ]},
        {name: 'Crear página web', categoryId:3, id:4, subtasks:[
          {text:'Hacer el diseño UI', completed: false},
          {text:'Hacer el diseño UI', completed: false}, 
          {text:'Hacer el diseño UI', completed: false},
        ]},
        {name: 'Crear página web', categoryId:4, id:5, subtasks:[
          {text:'Hacer el diseño UI', completed: false},
          {text:'Hacer el diseño UI', completed: false}, 
          {text:'Hacer el diseño UI', completed: false},
        ]},
        {name: 'Crear página web', categoryId:4, id:6, subtasks:[
          {text:'Hacer el diseño UI', completed: false},
          {text:'Hacer el diseño UI', completed: false}, 
          {text:'Hacer el diseño UI', completed: false},
        ]},
      ],*/
      //categoryNewId: 5,
      //cardNewId: 7,
    }
  }

  componentDidMount(){
    let nextId = localStorage.getItem('nextId') || 1
    if (nextId == 1)localStorage.setItem('nextId',nextId)
  }

  changeCategory = (id,name)=>{
    this.setState({selected: id, selectedName: name});
    // console.log({id})
  }

  /*addCard = ()=>{
    this.setState((state,props)=>{
      let newCard = {name:'New Card', categoryId:this.state.selected,id:this.state.cardNewId,subtasks:[]};
      return {
        cards: this.state.cards.concat(newCard),
        cardNewId: this.state.cardNewId + 1,
      }
    })
  }*/

  /*findCardById = (cards, id)=>{
    let cardChangedIndex = -1;
    cards.forEach((card,i)=>{
      if (card.id === id) cardChangedIndex = i;
    })
    return cardChangedIndex;
  }

  changeTitle = (title, id)=>{
    this.setState((state,props)=>{
      let cards = [...state.cards];
      let cardChangedIndex = this.findCardById(cards, id);
      cards[cardChangedIndex] = {...cards[cardChangedIndex], name:title};
      return {cards};
    })
  }

  onComplete = (cardId, subtaskIndex)=>{
    
    this.setState((state,props)=>{
      let cards = [...state.cards];
      let cardChangedIndex = this.findCardById(cards, cardId);
      console.log({cardChangedIndex,subtaskIndex})
      let c = cards[cardChangedIndex]
      let subtasks = [...c.subtasks];
      let sub = subtasks[subtaskIndex]
      subtasks[subtaskIndex] = {...subtasks[subtaskIndex], completed:!sub.completed}
      //subtasks[subtaskIndex].completed = !(subtasks[subtaskIndex].completed)
      console.log({subtasks})
      cards[cardChangedIndex] = {...c, subtasks}
      console.log({cards})
      return {cards}
    })
  }*/

  render(){
    
    return (
      <div className={styles.app}>
        {/* <ShowSideButton/> */}

        <Header/>
        <SideBar onSelected={this.changeCategory} selected={this.state.selected}/>
        <ListCards selected = {this.state.selected} selectedName={this.state.selectedName}/>
        
      </div>
    );
  }
}

export default App;
