import './App.css'
import Cover from './pages/cover/Cover'
import Login from './pages/login/Login'

function App() {

  return (
    <>
      <div className='flex justify-center'>
        <div className='block sm:hidden'>
          <Cover/>
        </div>
        <div className='hidden sm:block'>
          <Login/>
        </div>
      </div>
    </>
  )
}

export default App
