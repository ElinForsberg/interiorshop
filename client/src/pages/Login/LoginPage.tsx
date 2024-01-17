
import Header from '../../components/Header'
import LoginUserForm from './LoginUserForm'
import RegisterUserForm from './RegisterUserForm'

function Login() {
  return (
    <div>
      <Header/>
        <RegisterUserForm/>
        <LoginUserForm/>
    </div>
  )
}

export default Login


