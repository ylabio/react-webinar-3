import React from 'react'
import { Link } from 'react-router-dom'

function CommentsForm() {
  return (
    <div>
        <form>
            <textarea value={"dfadasdas"}></textarea>
        </form>
        <p><Link>Войдите</Link>, чтобы иметь возможность комментировать</p>
    </div>
  )
}

export default CommentsForm