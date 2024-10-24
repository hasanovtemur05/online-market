import loadable from "@loadable/component"
import { Loading } from "@components"


const SignIn = loadable(()=> import ("./auth/pages/signIn"),{
    fallback: <Loading/>
})

const Register = loadable(()=> import ("./auth/pages/register"),{
    fallback: <Loading/>
})


export { SignIn, Register }