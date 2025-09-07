import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <h1 className='text-2xl font-bold'>
      {text1} <span className='underline text-cyan-400'>
        {text2}</span>
    </h1>
  )
}

export default Title
