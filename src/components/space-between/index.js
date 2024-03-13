import React from 'react'

function SpaceBetween({children}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
        {children}
    </div>
  )
}

export default SpaceBetween