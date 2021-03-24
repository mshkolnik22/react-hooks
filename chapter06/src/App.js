import React, { useReducer, useEffect, useState, forwardRef, useRef } from 'react'

import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import Header from './Header'
import { ThemeContext, StateContext } from './contexts'
import ChangeTheme from './ChangeTheme'
import appReducer from './reducers'
import ScrollArrow from './ScrollArrow'
import upArrow from '../src/images/uparrow.jpg'
import downArrow from '../src/images/downarrow.jpg'

export default function App () {
    const [ theme, setTheme ] = useState({
        primaryColor: 'deepskyblue',
        secondaryColor: 'coral'
    })

    const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: [] })
    const { user } = state
    
    useEffect(() => {
        fetch('/api/posts')
            .then(result => result.json())
            .then(posts => dispatch({ type: 'FETCH_POSTS', posts }))
    }, [])

    useEffect(() => {
        if (user) {
            document.title = `${user} - React Hooks Blog`
        } else {
            document.title = 'React Hooks Blog'
        }
    }, [user])

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
// not leave as null, some value initially OR 
    const lastPost = useRef()
    // jump to the element
    const scrollToBottom = () => {
        console.log("lastPost")
        console.log(lastPost)
        console.log({lastPost})
        lastPost.current.scrollIntoView({ behavior: "smooth" } )

    }

   


    return (
        <StateContext.Provider value={{ state, dispatch }}>
            <ThemeContext.Provider value={theme}>
                <div style={{ padding: 8 }}>
                    <Header text="React Hooks Blog" />
                    <ChangeTheme theme={theme} setTheme={setTheme} />
                    <br />
                    <UserBar />
                    <br />
                    {user && <CreatePost />}
                    <br />
                    <img width="40px" height="40px" src={downArrow} onClick={scrollToBottom} />
                    <hr />
                    <PostList refProp={lastPost}/>
                    <img width="40px" height="40px" src={upArrow} onClick={scrollTop} />
                </div>
            </ThemeContext.Provider>
        </StateContext.Provider>
    )
}
