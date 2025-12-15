import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate() // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch('http://localhost:800/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        Cookies.set('token', data.token, { expires: 7 })
        console.log('Login successful:', data)
        navigate('/profile') // Redirect to /kanban on success
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='form h-auto w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-4'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Please sign in to your account</p>
        </div>
        
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400'
              placeholder='Enter your email'
              required
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400'
              placeholder='Enter your password'
              required
            />
          </div>
          
          <button 
            type="submit"
            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg'
          >
            Sign In
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        
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