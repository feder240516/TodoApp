import React, {Component} from 'react'
import Card from './Card'
import styles from './ListCards.module.scss'


export default class ListCards extends Component{
  constructor(props){
    super(props);
    this.state={cards:[],selectedCache:props.selected,expandedCard:-1}
    
  }

  componentDidMount(){
    let cards = localStorage.getItem(`Category${this.props.selected}`) || "[]"
    this.setState({cards:JSON.parse(cards)})
  }

  static getDerivedStateFromProps(props,state){
    if(props.selected !== state.selectedCache){
      let cards = localStorage.getItem(`Category${props.selected}`) || "[]"
      return {selectedCache: props.selected, cards:JSON.parse(cards)}
    }
    return {}
  }

  addCard = ()=>{
    
    console.log('clicked')

    let nextId = localStorage.getItem('nextId') || "1";
    nextId = parseInt(nextId);
    localStorage.setItem('nextId',nextId+1);
    this.setState((state,props)=>{
      
      let newCards = state.cards.concat([nextId]);
      localStorage.setItem(`Card${nextId}`,JSON.stringify({title:'Nueva tarjeta', subtasks:[]}));
      
      localStorage.setItem(`Category${this.props.selected}`,JSON.stringify(newCards));
      
      return {cards:newCards};
    })
  }

  deleteCard = (id)=>{
    this.setState((state,props)=>{
      let cards = state.cards.filter(cardId=>cardId !== id);
      localStorage.removeItem(`Card${id}`)
      localStorage.setItem(`Category${state.selectedCache}`,JSON.stringify(cards))
      return {cards}
    })
  }

  render(){
    return (
      <>
        {/* <ShowSideButton/> */}
        {/* <div></div> */}
        <div className={styles.todoList}>
          {/* <h3 className={styles.categoryTitle}>{this.props.selectedName}</h3> */}
          {this.state.cards.map((id,i)=>(<Card cardId={id} key={id} expanded={id===this.state.expandedCard} expandCard={(id)=>this.setState({expandedCard:id})} changeTitle={this.props.changeTitle} onComplete={this.props.onComplete} deleteCard={this.deleteCard}/>)) }
          {this.props.selected === -1?'':<button className={styles.addButton} onClick={this.addCard}><i className={`material-icons`}>add</i></button>}
        </div>
      </>
    )
  }
}
