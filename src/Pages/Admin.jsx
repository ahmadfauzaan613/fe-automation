import React from 'react'

function Admin() {
  return (
    <React.Fragment>
      <div className="flex justify-center items-center h-[100vh] bg-[#14213d]">
        <div className="bg-white w-[25vw] h-fit pb-8 px-5 rounded-md boxShadow">
          <p className="text-[28px] font-bold pt-8 text-[#fca311] uppercase text-center">Login Admin</p>
          <div className="mt-8 space-y-6">
            <input type="text" name="username" id="username" placeholder="Username" className="w-full h-fit border border-[#fca311] rounded-md px-2 py-3 outline-none" />
            <input type="password" name="password" id="password" placeholder="Password" className="w-full h-fit border border-[#fca311] rounded-md px-2 py-3 outline-none" />
            <button type="button" className="text-center text-white uppercase font-bold w-full py-[0.8rem] rounded-sm bg-[#fca311]">
              Login
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Admin
