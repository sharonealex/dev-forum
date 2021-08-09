import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import Spinner from '../Spinner'
import {getPost} from '../../actions/post'
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";


const Post = ({getPost, post: {post, loading}, match}) => {
 
    useEffect (()=>{
        getPost(match.params.id);
    }, [getPost, match.params.id])

  return loading || post === null ? (<Spinner/>) :  (
    <div>
       <Link to="/posts" className="btn">
        Back To Posts
      </Link>
     <PostItem post={post} showActionsPane={false}/>
     <CommentForm postId={post._id} />
    </div>
  );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };


  const mapStateToProps = state => ({
      post: state.post
  })
  
  export default connect (mapStateToProps, {getPost}) (Post);