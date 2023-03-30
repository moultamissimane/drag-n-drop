import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import bg from "../assets/bg.png"

function Register() {
  const navigate = useNavigate();

  const onFinish = async (req, res) => {
    try {
      fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": req.name,
          "email": req.email,
          "password": req.password
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          navigate('/login');
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute bg-gradient-to-b from-gray-600 to-black opacity-75 inset-0 z-0" />
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-4xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">

          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500 text-base">
                Please sign in to your account.
              </p>
            </div>
            <Form layout="vertical" onFinish={onFinish}>
              <div className="space-y-5">
                <Form.Item label="Name" name="name">
                  <div className="space-y-2">
                    <input
                      className=" w-full bg-white text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                      type="text"
                      placeholder="Enter your full name"
                    />
                  </div>
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <div className="space-y-2">
                    {/* <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label> */}

                    <input
                      className=" w-full bg-white text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                      type="email"
                      placeholder="mail@gmail.com"
                    />
                  </div>
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <div className="space-y-2">
                    {/* <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label> */}
                    <input
                      className="w-full bg-white content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>
                </Form.Item>
                <div>
                  <button
                    type="submit"
                    className="w-full text-xl flex justify-center outline-none bg-[#174C4F] border border-neutral-800 hover:border-neutral-800 hover:bg-[#023235] text-gray-100 p-3  rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign UP
                  </button>
                </div>
              </div>
            </Form>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>Already have an account?</span>
              <Link to="/Login" className="no-underline">
                <h2 className="text-xl text-gray-500 hover:text-white mt-5 rounded-full p-2 hover:shadow-xl hover:bg-black transition ease-in duration-500">
                  Log In
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
