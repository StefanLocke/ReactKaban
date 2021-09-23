import logo from './logo.svg';
import plus from './plus.svg';
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import {
    addNewCategory,
    addNewPost,
    changePostName,
    getBoard,
    getBoards,
    getCategory,
    getPost,
    removePost
} from "./Utils";
import {getNodeText} from "@testing-library/react";


function App() {
  return (
      <div className={"App"}>
          <header className={"App-header"}>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                  Kaban implementation using React and JAX-RS
              </p>
              <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  GitHub sources.
              </a>
          </header>
          <div className={"App-body"}>
              <Home />
          </div>
      </div>
  );
}


/*** Board selection home ***/
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    state =  {
        boards:null,

        boardId:null,
        board:null,

        loaded:false,
        chosen:false
    }

    componentDidMount() {
        getBoards(this);
    }

    renderChosen() {
        return (
            <div>
                <Board boardid={this.state.boardId} />
            </div>
        );
    }
    renderLoaded() {
        return (
            <div>
                <h3>Choose a Board</h3>
                <div className={"Board-selection-container"}>
                    {this.state.boards.map(board =>
                        <div key={board.id} className={"Board-selection"} onClick={() => {this.setState({boardId: board.id, chosen: true});}}>
                            <h4>{board.title}</h4>
                            <div>{board.id}</div>
                        </div>
                    )
                    }
                    <div className={"Board-selection Board-selection-add"}>
                        <img src={plus} className="Add-logo" alt="logo" />
                    </div>
                </div>
            </div>
        );

    }
    renderLoading() {
        return (
            <div>
                <h3>Choose a Board</h3>
                {
                    <h3>Loading...</h3>
                }
            </div>
        );
    }
    render() {
        if (this.state.chosen) {
            return this.renderChosen()
        }
        if (this.state.loaded) {
            return this.renderLoaded()
        }
        return this.renderLoading()
    }
}





class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state.boardid = props.boardid
    }

    componentDidMount() {
        getBoard(this.state.boardid,this)
    }

    state = {
        board:null,
        boardid:null,
        loaded:false
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div className={"App-board"}>
                    <h2 className={"App-board-header"}>Loading...</h2>
                </div>
            );
        }
        return (
            <div className={"App-board"}>
                <h2 className={"App-board-header"}>{this.state.board.title}</h2>
                <div className={"Board-canvas"} >
                    <div className={"App-category-container"}>
                        {this.state.board.categories.map(category =>
                            <Category key={category} categoryid={category}/>
                        )}
                        <div className={"App-category"} onClick={() => addNewCategory(this)}>
                            Add new Category
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}



class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state.categoryid = props.categoryid;



    }

    state = {
        loaded:false,
        category:null,
        categoryid:null
    }

    componentDidMount() {
        getCategory(this.state.categoryid,this)
    }

    renderLoading() {
        return (
            <div className={"App-category"}>
                <h3 className={"App-category-header"}>Loading...</h3>
            </div>
        );
    }
    renderLoaded() {
        return (
            <div className={"App-category"}>
                <h3 className={"App-category-header"}>{this.state.category.name}</h3>

                <div className={"App-post-container"}>
                    {
                        this.state.category.posts.map(post =>
                            <div>
                                <Post parent ={this} key={post} postid={post}>

                                </Post>

                            </div>
                        )
                    }
                    <div className={"App-post-button"} onClick={() => addNewPost(this)}>
                        Add new Post
                    </div>
                </div>
            </div>
        );
    }
    render() {
        if (this.state.loaded) {
           return this.renderLoaded();
        }
        return this.renderLoading()
    }
}

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state.postid = this.props.postid;
        this.state.parent = this.props.parent
    }
    componentDidMount() {
        getPost(this.state.postid,this)
    }

    state = {
        parent:null,
        loaded:false,
        post:null,
        postid:null
    }
    renderLoading() {
        return (<div className={"App-post"}>
         <h4 className={"App-post-header"}>Loading...</h4>
            </div>);
    }
    renderLoaded() {
        return (
            <div className={"App-post"}>
                {/*<h4 className={"App-post-header"}>{this.state.post.title}</h4>*/}
                <EditableHeader category={this.state.parent} postid={this.state.postid} content={this.state.post.title} />
                <p>{this.state.post.content}</p>
                <div className={"App-post-button"} onClick={() => removePost(this.state.postid,this.state.parent)}>remove post</div>
            </div>
        );
    }

    render() {
        if (this.state.loaded ){
            return (this.renderLoaded());
        }
        return (this.renderLoading())

    }
}

class EditableHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state.content = this.props.content
        this.toggleHidden = this.toggleHidden.bind(this)
    }


    state = {
        editable:false,
        content:""

    }

    toggleHidden(){

        this.setState({editable:!this.state.editable})

    }

    renderEditable(){
        return (
            <div onDoubleClick={() => this.toggleHidden()}>
               <EditField category={this.props.category} postid={this.props.postid} func={this.toggleHidden}/>
            </div>

        );
    }

    renderHeader(){
        return (
            <div onDoubleClick={() => this.toggleHidden()}>
                <h3 className={"App-post-header"}>{this.state.content}</h3>
            </div>

        );
    }

    render() {
        if (this.state.editable) {
            return this.renderEditable()
        }
        return this.renderHeader()
    }
}

class EditField extends React.Component {
    constructor(props) {
        super(props);
        this.state.func = this.props.func
    }
    state = {
        func:null,

    }
    render() {

        return (
            <input autoFocus={true} onBlur={() => {this.state.func();changePostName(this.props.postid,"hello",this.props.category)}}/>
        );
    }
}







export default App;

