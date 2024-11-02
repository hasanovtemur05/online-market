import loadable from "@loadable/component"
import { Loading } from "@components"


const SignIn = loadable(()=> import ("./auth/pages/signIn"),{
    fallback: <Loading/>
})

const Register = loadable(()=> import ("./auth/pages/register"),{
    fallback: <Loading/>
})

const UserLayout = loadable(()=> import ("./user-layout"),{
    fallback: <Loading/>
})

const Product = loadable(()=> import ("./product/pages"),{
    fallback: <Loading/>
})

const Contract = loadable(()=> import ("./contract/pages"),{
    fallback: <Loading/>
})


export { SignIn, Register, UserLayout, Product, Contract }