import { useNavigate } from "react-router"
import Button from "../../components/Button"
import Input from "../../components/Input"

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Log in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <Input id='email' name='email' type='email' label='Email address' />
          <Input id='password' name='password' type='password' label='Password' />
          <Button type='submit' text='Log in' />
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <button onClick={() => navigate('/signup')} className="font-semibold text-indigo-600 hover:text-indigo-500, cursor-pointer"> Sign Up</button>
        </p>
      </div>
    </div>

  )
}

export default Login
