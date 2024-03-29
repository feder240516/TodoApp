import React, {Component} from 'react'
import styles from './SideBar.module.scss'
import ShowSideButton from '../Extra/ShowSideButton'

export default class SideBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      categories:[],
      newCatId:1,
      renaming:-1,
      open: false,
    }
  }

  componentDidMount(){
    let categories = localStorage.getItem('categories') || JSON.stringify([
      {name:'Work', id:1},
      {name:'Study', id:2},
    ]);
    categories = JSON.parse(categories)
    let newCatId = categories.reduce((a,b)=>Math.max(a,b.id),0) + 1;
    localStorage.setItem('newCatId',newCatId);
    this.setState({categories,newCatId});
    this.props.onSelected(categories[0].id,categories[0].name);
  }

  newCategory = ()=>{
    this.setState((state,props)=>{
      let categories = state.categories.concat({name:'Categoría nueva', id:state.newCatId});
      // localStorage.setItem(`Category${state.newCatId}`,'[]');
      localStorage.setItem(`categories`,JSON.stringify(categories));
      return {categories,newCatId: state.newCatId+1}
    })
  }

  
  startRename = (i)=>{
    this.setState({renaming:i});
    this.saveChanges();
  }

  handleChangeName = (i,name)=>{
    this.setState((state,props)=>{
      let categories = [...state.categories];
      categories[i] = {...categories[i], name};
      return {categories}
    })
  }

  endRename = ()=>{
    this.setState({renaming:-1})
    this.saveChanges();
  }


  saveChanges = ()=>{
    this.setState((state,props)=>{
      localStorage.setItem('categories', JSON.stringify(state.categories));
    })
  }

  deleteCategory = (id)=>{
    this.setState((state,props)=>{
      let categories = state.categories.filter(cat=>cat.id !== id)
      return {categories}
    })
    this.props.onSelected(-1,'')
    this.saveChanges();
  }

  handleClick = (event, category)=>{
    // ! si algun boton es oprimido
    let objType = 'parent'
    for(let cl of event.target.classList){
      if (cl === 'material-icons') objType = 'icon'
    }
    if (objType === 'parent') {
      this.props.onSelected(category.id,category.name)
    }
    //if (event.target.onClick !== this.handleClick)
  }

  toggleSideBar = ()=>{
    // alert('jajajajaj')
    this.setState((state,props)=>{
      return {open: !state.open};
    })
  }

  render(){
    return (
      <div className={`${styles.sideBar} ${styles[this.state.open? 'sideBar--open':'sideBar--close']}`}>
        <ShowSideButton onClick = {this.toggleSideBar}/>
        <div className={`${styles.sideBar__header}`}>
          <span>Categorías</span>
          <button className={`${styles.yellowBall}`} onClick={this.newCategory}>
            <i className={`material-icons ${styles.icon}`}>add</i>
          </button>
        </div>
        {/* <div className={styles.sideBar__add}>+</div> */}
        {/* <ul> */}
          {this.state.categories.map((category,i)=>
            category.id === this.state.renaming?(
              <div className={`${styles.sideBar__item} ${this.props.selected === category.id? styles['sideBar__item--selected']: ''}`}>
              <input type='text' value={category.name} className={styles.changeName} 
                            onChange={(event)=>this.handleChangeName(i,event.target.value)}/>
                <i className={`material-icons ${styles.icon }`} onClick={()=>this.endRename()}>done</i>
                
                
              </div>
            ):(

              <div className={`${styles.sideBar__item} ${this.props.selected === category.id? styles['sideBar__item--selected']: ''}`} onClick={(event)=>{this.handleClick(event,category)}} >
                
                  <span className={`${styles.categoryTag}`}>{category.name}</span>
                  <i className={`material-icons ${styles.icon }`} onClick={()=>this.startRename(category.id)}>edit</i>
                  <i className={`material-icons ${styles.icon }`} onClick={()=>this.deleteCategory(category.id)}>delete</i>
              </div>
            ))}
        {/* </ul> */}
      </div>
    )
  }
}