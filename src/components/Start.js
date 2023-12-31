import React, { useRef } from 'react'

function Start({setUserName}) {
  const inputRef = useRef()

  function handleClick(){
    inputRef.current.value && setUserName(inputRef.current.value)
  }

  return (
    <div className='start'>
      <input className="startInput" placeholder='enter your name' 
        ref={inputRef}/>
      <button className='startButton' onClick={handleClick}>Start</button>
    </div>
  )
}

export default Start