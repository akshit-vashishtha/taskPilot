import React from 'react'
import { Link } from 'react-router-dom'
export default function Login() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='form h-auto w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-4'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Please sign in to your account</p>
        </div>
        
        <div className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <input 
              type="email" 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400'
              placeholder='Enter your email'
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input 
              type="password" 
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400'
              placeholder='Enter your password'
            />
          </div>
          
          <button 
            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg'
          >
            Sign In
          </button>
        </div>
        
        <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
                Don't have an account? 
                <Link to="/signup">
                    <p className='text-blue-600 hover:text-blue-800 font-medium ml-1'>Sign up</p>
                </Link>
            </p>
          
        </div>
      </div>
    </div>
  )
}