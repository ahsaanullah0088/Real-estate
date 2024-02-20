import React from 'react'
import {  useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser}= useSelector((state)=> state.user)
  return (
    <div className=' p-3 max-w-lg mx-auto'>

      <h1 className=' text-3xl font-semibold my-7 text-center'>Profile</h1>
      <form className=' flex flex-col gap-4'> 
        <img 
        className=' rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2  '
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt=" profile image" />
        <input type="text"  placeholder=' username' className=' border p-3 rounded-lg' id='username'/>
        <input type="text"  placeholder=' email' className=' border p-3 rounded-lg' id='email'/>
        <input type="text"  placeholder=' password' className=' border p-3 rounded-lg' id='password'/>

        <button className=' bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> update</button>
      </form>
      <div className=' flex justify-between mt-5 '>
        <span className=' text-red-700 cursor-pointer'>
          Delete ccount
        </span>
        <span className=' text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
    </div>
  )
}
