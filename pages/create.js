import React from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import nookies from "nookies";
import baseUrl from "@/helpers/baseUrl";
import toast from "react-hot-toast";


const create = () => {
  const cookie = nookies.get();
    const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (date) => {
    setSelectedDate(date);
    // Send selected date to backend using fetch or similar
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(cookie);
    const res = await fetch(`${baseUrl}/api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        Title: formData.title,
        Description: formData.description,
        Date: selectedDate,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      toast.error(res2.error);
    } else {
      toast.success(res2.message);
      setFormData({
        title: "",
        description: "",
      });
    }
  }


  return (
    <form className="max-w-md mx-auto my-20" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-5">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          required
          value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
        />
        <label
          for="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Blog Title
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <label
          for="message"
          className="block mb-2 text-sm text-gray-500 dark:text-gray-400"
        >
        Blog Description
        </label>
        <textarea
          id="message"
          rows="8"
          className="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your blog's description here..."
          value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
        ></textarea>
      </div>
      <div className="relative max-w-sm">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
     <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
      </svg>
  </div>
      <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      className="text-blue-800 border rounded p-2 focus:ring-0"

      calendarClassName="bg-gray-800 text-white rounded border-0"
      
    />
      </div>

      
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 hover:scale-105 duration-300 active:scale-95 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      </div>
    </form>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);

  if (!cookie.token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  // const res = await fetch(`${baseUrl}/api/orders`, {
  //   headers: {
  //     Authorization: cookie.token,
  //   },
  // });
  // const res2 = await res.json();
  // console.log(res2);
  return {
    props: {
      orders: []
    },
  };
}

export default create;
