import React, { useState } from 'react'
import { LoginComponent } from './components/LoginComponent'
import { RegisterComponent } from './components/RegisterComponent'
import { TActiveState } from './types/LoginPageTypes'
import './LoginCss.css'

export const LoginPage = () => {
  const [active, setActive] = useState<TActiveState>('login')
  return (
    <>
      <div className="col-9 m-auto d-flex bLogin centerLogin bg-white">
        {/* TODO: HIDDEN IMAGE IN SMALL DESIGN */}
        <div className="col-lg-5 col-md-5 d-flex justify-content-center noShowImageLogin">
          <img src="/images/login-inicio.gif" alt="" width="100%" height="100%" className='imgContain'/>
        </div>
        <div className="col-lg-7 col-md-7 col-sm-12 m-auto p-5">
          <div>
            {
                (active === 'login')
                  ? <LoginComponent setActive={setActive}/>
                  : <RegisterComponent setActive={setActive}/>
            }
          </div>
        </div>
      </div>
    </>
  )
}
