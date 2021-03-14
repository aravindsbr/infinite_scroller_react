import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Table from "./Table"
import axios from 'axios';

class FetchPosts extends Component {

    state = { 
        posts: [],
        baseUrl: "https://serverfake.herokuapp.com/posts/",
        pageParam: "?_page=",
        favParam: "&isFavourite=true",
        currentPage: 1,
        pages: 10,
        hasMore: true
     }
  
    async componentDidMount(){
      if (this.props.onlyFavourites === "true"){
        var url = this.state.baseUrl+this.state.pageParam+this.state.currentPage+this.state.favParam;
      }
      else{
        url = this.state.baseUrl+this.state.pageParam+this.state.currentPage;
      }
      const response = await fetch(url);
      
      if ( response.status === 200) {
        const data = await response.json();
        this.setState({ posts: data, errorMessage: "" });
      }
      else if( response.status === 404 ) {
        this.setState({ errorMessage: "URL Not found"});
      }
      else if( response.status === 500 ) {
        this.setState({ errorMessage: "Internal Server Error"});
      }
    }

    handleFavourite = (post) => {
      var { posts } = this.state;
      var userInd = posts.findIndex((u) => u.id === post.id);
      posts[userInd].isFavourite = !post.isFavourite;
      this.setState({ posts: posts});
      const url = this.state.baseUrl+post.id;
      axios.put(url, posts[userInd]);
    }

    fetchMoreData = () =>{
      var favParam = "";
      if (this.props.onlyFavourites === "true")
        favParam = this.state.favParam;
      if(this.state.pages - this.state.currentPage !== 0){
        fetch(this.state.baseUrl+this.state.pageParam+`${this.state.currentPage+1}`+favParam)
        .then(res => res.json())
        .then(res =>{
          this.setState({posts: [...this.state.posts, ...res], currentPage: this.state.currentPage+1})
        })   
      }    
    }

    render() {
      return(
      <div>
        <Table posts = {this.state.posts} onHandleFavourite={this.handleFavourite} onFetchMoreData={this.fetchMoreData} onlyFavourites={this.props.onlyFavourites}/>
      </div>
      );
    }
}
 
export default FetchPosts;