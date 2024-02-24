import React, { useEffect, useMemo, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { TypeAnimation } from 'react-type-animation'

function Admin() {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }
  const [init, setInit] = useState(false)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])
  const particlesLoaded = (container) => {
    console.log(container)
  }
  const options = useMemo(
    () => ({
      fpsLimit: 120,
      zIndex: -1,
      particles: {
        color: {
          value: '#22C55E',
        },
        links: {
          color: '#22C55E',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 90,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  )

  return (
    <React.Fragment>
      <div className="flex justify-center items-center h-[100vh]" data-theme="black">
        <div className=" w-[25vw]   h-fit pb-8 px-5  boxShadow">
          <div className="flex justify-center">
            <TypeAnimation sequence={['Login', 1000, '...', 1000, 'ログイン', 1000, '...', 1000, '登录页面', 1000, '...', 1000]} speed={50} style={{ fontSize: '30px', display: 'inline-block', color: '#fff' }} repeat={Infinity} />
          </div>
          <div className="mt-8 space-y-6">
            <input data-theme="black" type="text" name="username" id="username" placeholder="Username" className="w-full  h-fit border  border-green-500  px-2 py-3 outline-none" />
            <div className="flex items-center  border border-green-500 px-2 py-3">
              <input data-theme="black" type={show ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="w-full  h-fit   outline-none" />
              <button
                onClick={() => {
                  toggleShow()
                }}
              >
                {show ? <FaEyeSlash size={'18px'} color="#ff0000" /> : <FaEye size={'18px'} color="#ff0000" />}
              </button>
            </div>
            <button data-theme="forest" type="button" className="text-center btn btn-primary btn-outline uppercase font-bold w-full py-[0.8rem] rounded-sm ">
              Login
            </button>
          </div>
        </div>
      </div>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
    </React.Fragment>
  )
}

export default Admin
