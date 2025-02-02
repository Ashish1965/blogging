import React from "react";
import nookies from "nookies";
import baseUrl from "@/helpers/baseUrl";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
const home = (props) => {
  const { Tasks } = props;
  //   console.log(Tasks);
  return (
    <section class="text-gray-600 body-font overflow-hidden mt-20 ">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-12">
          {Tasks.map((Task) => (
            <div class="p-12 md:w-1/2 flex flex-col items-start hover:bg-blue-50 hover:scale-105 active:scale-95 duration-300" key={Task._id}>
            <Link href={`/${Task._id}`}>
              <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                CATEGORY
              </span>
              <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                {Task.title}
              </h2>
              <p class="leading-relaxed mb-8">
                {Task.description}
              </p>
              <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                <a class="text-indigo-500 inline-flex items-center" href={`/${Task._id}`}>
                  Learn More
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <span class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                  <svg
                    class="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  1.2K
                </span>
                <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                  <svg
                    class="w-4 h-4 mr-1"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                  6
                </span>
              </div>
              <a class="inline-flex items-center">
                <img
                  alt="blog"
                  src="/account.jpg"
                  class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
                <span class="flex-grow flex flex-col pl-4">
                  <span class="title-font font-medium text-gray-900">
                    {Task.user.name}
                  </span>
                  
                </span>
              </a>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = nookies.get(ctx);

  if (!cookie.token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  }
  const res = await fetch(`${baseUrl}/api/task`, {
    headers: {
      Authorization: cookie.token,
    },
  });
  const res2 = await res.json();
  // console.log(res2);
  return {
    props: {
      Tasks: res2,
    },
  };
}

export default dynamic(() => Promise.resolve(home), { ssr: false });
// export default home;
