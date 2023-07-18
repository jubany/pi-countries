import React from 'react'
import Form from "../../components/Form/Form"
import style from './createActivity.module.css'
export const CreateActivity = () => {
  return (
    <>
      <div className={style.FormBox}>
        <h1 className={style.title}> Create an activity </h1>
        <Form/>
      </div>
    </>
  )
}

export default CreateActivity;