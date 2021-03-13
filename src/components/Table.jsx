import React from "react";
import { Link } from 'react-router-dom'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { IconContext } from "react-icons";
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Table extends React.Component {
    
    // nextPath(path) {
    //   this.props.history.push(path);
    // }
    
    render(){
        var { posts, onHandleFavourite, onFetchMoreData, onlyFavourites } = this.props;
        
        if (posts.length === 0)
          return <center><p><b>Loading posts...</b></p></center>   

        return (
          <div> 
            <div className="mt-2">
              <center>
                  { onlyFavourites  === "false" && 
                    <h1><b>List of recent posts</b></h1>
                  }
                  { onlyFavourites  === "true" && 
                    <h1><b>List of favourite posts</b></h1>
                  }
                
                <p><b>Showing {posts.length} posts from the URL</b></p>
                <div className="mr-3 mb-3">
                  { onlyFavourites  === "false" && 
                    <Link to="/favourites" className="btn btn-danger fav_button">Favourites</Link>
                  }
                  { onlyFavourites  === "true" && 
                    <Link to="/" className="btn btn-danger fav_button">Home</Link>
                  }
                </div>
              </center>
            </div>
            <div>
              <InfiniteScroll
                dataLength={posts.length}
                next={onFetchMoreData} 
                hasMore={true}
                >
                <table className="table">
                  <thead>
                      <tr>
                      <th>User ID</th>
                      <th>Post ID</th>
                      <th>Favourite</th>
                      <th>Title</th>
                      <th>Body</th>
                      <th>Edit</th>
                      </tr>
                  </thead>
                  <tbody>
                    
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td>{post.userId}</td>
                        <td>{post.id}</td>
                        <td>{post.isFavourite.toString()}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>
                        { post.isFavourite.toString()  === "true" && 
                        <IconContext.Provider value={{ color: "red", size: "2em"}}>
                          <div>
                            <MdFavorite className="fav_icon" onClick={()=> onHandleFavourite(post)}/>
                          </div>
                        </IconContext.Provider>
                        }
                        { post.isFavourite.toString()  === "false" && 
                        <IconContext.Provider value={{ size: "2em"}}>
                          <div>
                            <MdFavoriteBorder className="fav_icon" onClick={()=> onHandleFavourite(post)}/>
                          </div>
                        </IconContext.Provider>
                        }
                        </td>
                      </tr>
                      
                    ))}
              
                  </tbody>
                </table>
              </InfiniteScroll>
            </div>
          </div>
        );    
    }
  }