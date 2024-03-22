import {memo} from 'react';
import './style.css'


function Comment({item}) {



  return (
    <>
        <div className='Comment-container'>
            <div className='Comment-title'>
                {item.author._id}
            </div>
            <div className='Comment-text'>
                {item.text}
            </div>
            <div className='Comment-action'>
                <a>Ответить</a>
            </div>
        </div>

    </>
  )
}

export default memo(Comment);