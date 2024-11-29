import React, { useEffect, useRef, useState } from "react";
import baseUrl from "@/helpers/baseUrl";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

const IndividualPage = (props) => {
  const router = useRouter();
  const iProduct = router.query.task;
  const { result } = props;
//   console.log(result);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-64 overflow-hidden">
            <img
              alt="content"
              className="object-cover object-center h-full w-full"
              src="/blog.jpg"
            />
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                  {result.user.name}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base">
                  {result.title}
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
                {result.description}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export async function getServerSideProps({ params: { task } }) {
  console.log(task);
  const res = await fetch(`${baseUrl}/api/${task}`);
  const data = await res.json();
//   console.log(data);
  return {
    props: { result: data },
  };
}

export default dynamic(() => Promise.resolve(IndividualPage), { ssr: false });
