import { useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import useforget from '@/hooks/useforget'

const Profile = () => {
  const { user } = useAuthContext()
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [email, setEmail] = useState(user?.email || '')
  const [newPassword, setNewPassword] = useState('')

  const [message, setMessage] = useState('')

  const {forget,loading} = useforget();
  const handleResetPassword = async (e:any) => {
    e.preventDefault()
  

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters')
      return
    }

    try {

      await forget({email,newPassword});

     
      
    
    } catch (error) {
      setMessage('Failed to reset password')
    }
  }

  return (
    <div className='h-[74vh] bg-black overflow-auto'>
      <div className='max-w-lg mx-auto px-4 py-6'>
        {!showResetPassword ? (
          <div className='flex flex-col items-center gap-6'>
            {/* Profile Avatar */}
            <div className='h-24 w-24 text-4xl flex justify-center items-center font-semibold rounded-full bg-blue-600 text-white'>
              {user.userName[0].toUpperCase()}
            </div>

            {/* User Info Card */}
            <div className='w-full bg-gray-900 border border-gray-800 rounded-lg p-6'>
              <h2 className='text-white text-2xl font-semibold mb-5 text-center'>
                {user.userName[0].toUpperCase() + user.userName.slice(1)}
              </h2>
              
              <div className='space-y-3'>
                <div className='bg-black rounded-md p-3 border border-gray-800'>
                  <p className='text-blue-400 text-xs font-medium mb-1'>Email</p>
                  <p className='text-white text-sm'>{user.email}</p>
                </div>
                
                <div className='bg-black rounded-md p-3 border border-gray-800'>
                  <p className='text-blue-400 text-xs font-medium mb-1'>Username</p>
                  <p className='text-white text-sm'>{user.userName}</p>
                </div>

             
              </div>

              {/* Reset Password Button */}
              <button
                onClick={() => setShowResetPassword(true)}
                className='w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors'
              >
                Reset Password
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <button
              onClick={() => {
                setShowResetPassword(false)
                setMessage('')
                setNewPassword('')
              
              }}
              className='text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-2 transition-colors text-sm'
            >
              <span>←</span> Back to Profile
            </button>

            {/* Reset Password Form */}
            <div className='bg-gray-900 border border-gray-800 rounded-lg p-6'>
              <h2 className='text-white text-2xl font-semibold mb-5 text-center'>
                Reset Password
              </h2>

              <div className='space-y-4'>
                <div>
                  <label className='text-blue-400 text-xs font-medium mb-1.5 block'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full bg-black border border-gray-800 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-600 transition-colors'
                    placeholder='Enter your email'
                    required
                  />
                </div>

                <div>
                  <label className='text-blue-400 text-xs font-medium mb-1.5 block'>
                    New Password
                  </label>
                  <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='w-full bg-black border border-gray-800 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-600 transition-colors'
                    placeholder='Enter new password'
                    required
                  />
                </div>

             
                {message && (
                  <div className={`text-center py-2 px-3 rounded-md text-sm ${
                    message.includes('successful') 
                      ? 'bg-green-900/30 text-green-400 border border-green-800' 
                      : 'bg-red-900/30 text-red-400 border border-red-800'
                  }`}>
                    {message}
                  </div>
                )}

                <button
                  onClick={handleResetPassword}
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors'
                >
                {
                  loading ? "Changing password ..." :  " Reset Password"
                }
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile