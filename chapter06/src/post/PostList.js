import React, { useContext } from 'react'
import { StateContext } from '../contexts'

import Post from './Post'

export default function PostList (props) {
  const { state } = useContext(StateContext)
  const { posts } = state

  // const lastPost = useRef(null)
 

    const postElements = posts.map((post, index) => {
    if (index === posts.length - 1) {
      return (
        <React.Fragment key={'post-' + index}>
          <Post 
            {...post} 
            ref={props.refProp}
            
          />
          <hr />
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment key={'post-' + index}>
          <Post {...post} />
          <hr />
        </React.Fragment>
      )
      }
    
  })

  return (
    <div>
      {postElements}
    </div>
  )
}
