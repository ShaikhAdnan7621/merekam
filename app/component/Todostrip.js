"use client";
import React from "react";
import { useState } from "react";

function Todostrip(props) {
  const [statusis, setstatusis] = useState(props.Task.status);
  return (
    <div>
      <div className=" relative ">
        <button
          className="absolute top-0 right-0 w-8 h-8 border rounded-full border-gray-600 text-xl bg-white"
          onClick={() => props.deletetask(props.index)}
          name="deleteTodoButton"
        >
          🗑️
        </button>
        <div className="flex flex-col sm:flex-row justify-between p-0.5 sm:pr-12">
          <h1 className="font-bold px-2 pr-12  sm:pr-2">{props.Task.title}</h1>

          <div className="">
            <label htmlFor="status" className=" mr-2">
              Status
            </label>
            <select
              className={`px-2 py-1 rounded-lg focus:outline-none mt-5 sm:mt-0 border shadow-sm ${
                props.Task.status == "⌚Pending" ? " bg-yellow-300 " : ""
              } ${props.Task.status == "🏃Inprogress" ? " bg-blue-300 " : ""} ${
                props.Task.status == "✔️Completed" ? " bg-green-300 " : ""
              } ${props.Task.status == "✖️Cancelled" ? " bg-red-300 " : ""} `}
              name="status"
              id="status"
              select="true"
              value={props.Task.status}
              onChange={(e) => {
                props.updatestatus(props.index, e.target.value);
                setstatusis(e.target.value);
              }}
            >
              {props.status.length
                ? props.status.map((item, index) => (
                    <>
                      <option
                        key={props.index + " " + index}
                        className={`${
                          item == "⌚Pending" ? " bg-yellow-300 " : ""
                        } ${item == "🏃Inprogress" ? " bg-blue-300 " : ""} ${
                          item == "✔️Completed" ? " bg-green-300 " : ""
                        } ${item == "✖️Cancelled" ? " bg-red-500 " : ""}`}
                        value={item}
                      >
                        {item}
                      </option>
                    </>
                  ))
                : ""}
            </select>
          </div>
        </div>
        <hr className="shadow-sm border-gray-300 mt-3 mb-4" />
        <p className="px-2 text-gray-700 mb-2">{props.Task.description}</p>
        <hr className="shadow-sm border-gray-300 mt-3 mb-4" />

        <div className="px-2 text-gray-700 text-xs flex flex-col sm:flex-row justify-between">
          <p>
            Assign:{" "}
            <span>
              {new Date(props.Task.created_at).toLocaleDateString()}{" "}
              {new Date(props.Task.created_at).toLocaleTimeString()}
            </span>
          </p>
          <p>
            Latest Updated:{" "}
            <span>
              {new Date(props.Task.updated_at).toLocaleDateString()}{" "}
              {new Date(props.Task.updated_at).toLocaleTimeString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Todostrip;
