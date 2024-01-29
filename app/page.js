"use client";
import Todostrip from "@/app/component/Todostrip";
import React, { useEffect, useState } from "react";
import Footer from "./component/Footer";

export default function Home() {
  const [Addingtodo, setAddingtodo] = useState(false);
  const [TodoTitle, SetTodoTitle] = useState("");
  const [TodoDescription, SetTodoDescription] = useState("");
  const [firstloading, setfirstloading] = useState(true);
  const [todoarr, settodoarr] = useState([]);
  const status = ["⌚Pending", "🏃Inprogress", "✔️Completed", "✖️Cancelled"];

  useEffect(() => {
    setfirstloading(true);
    const todoarr = JSON.parse(localStorage.getItem("todoarr")) || [];
    if (todoarr.length === 0) {
      setAddingtodo(true);
    }
    settodoarr(todoarr);
    setfirstloading(false);
  }, []);

  const appendtodoarr = () => {
    if (TodoTitle === "") {
      alert("Please Enter Task Title");
      return;
    }
    if (TodoDescription === "") {
      alert("Please Enter Task Description");
      return;
    }
    const todoarr = JSON.parse(localStorage.getItem("todoarr")) || [];

    todoarr.unshift({
      title: TodoTitle,
      description: TodoDescription,
      status: status[0],
      created_at: new Date(),
      updated_at: new Date(),
    });

    localStorage.setItem("todoarr", JSON.stringify(todoarr));
    settodoarr(todoarr);
    SetTodoTitle("");
    SetTodoDescription("");
    console.log(todoarr);
  };

  const updatestatus = (index, statuss) => {
    const todoarr = JSON.parse(localStorage.getItem("todoarr")) || [];
    todoarr[index].status = statuss;
    todoarr[index].updated_at = new Date();
    localStorage.setItem("todoarr", JSON.stringify(todoarr));
    settodoarr(todoarr);
  };

  //deletetask
  const deletetask = (index) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const todoarr = JSON.parse(localStorage.getItem("todoarr")) || [];
      todoarr.splice(index, 1);
      localStorage.setItem("todoarr", JSON.stringify(todoarr));
      settodoarr(todoarr);
    }
  };
  const onDrop = (e, index) => {
    const draggedIndex = Number(e.dataTransfer.getData("index"));
    const newTodos = [...todoarr];
    const draggedItem = newTodos[draggedIndex];
    newTodos.splice(draggedIndex, 1); // remove the dragged item from its original position
    newTodos.splice(index, 0, draggedItem); // insert the dragged item at the new position
    settodoarr(newTodos);
    localStorage.setItem("todoarr", JSON.stringify(newTodos));
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };
  return (
    <main className="max-w-7xl mx-auto px-5">
      <h1 className={`text-2xl font-extrabold mt-5 `}>Mere Kam Ki List</h1>
      <div className="items-center">
        <div
          className={`bg-gray-100 shadow-lg w-full duration-300 px-3 rounded-lg ${
            !Addingtodo ? " h-0 overflow-hidden m-0 py-0 " : " h-48 mt-5 p-3"
          }`}
        >
          <div className="flex h-9 items-center">
            <input
              type="text"
              className="p-1 min-w-0 flex-grow bg-transparent focus:outline-none pr-5 "
              placeholder="Todo Tittle"
              value={TodoTitle}
              onChange={(e) => {
                SetTodoTitle(e.target.value);
              }}
            />
            <button
              className="w-9 h-9 border border-gray-600 rounded-full "
              onClick={() => appendtodoarr()}
              name="addtodo"
            >
              ➕
            </button>
          </div>
          <hr className="shadow-sm border-gray-300 my-1" />
          <textarea
            className="resize-none h-28 w-full bg-transparent mt-2 p-1 focus:outline-none"
            placeholder="Todo description"
            value={TodoDescription}
            onChange={(e) => {
              SetTodoDescription(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className="mt-5 flex items-center">
        <hr className="border-gray-600 border-double flex-grow m-0" />
        <button
          className={`border-2 border-gray-600 rotate-0 group focus:outline-none text-2xl rounded-full h-9 w-9 relative px-2 hover:pt-1 focus:pt-1 duration-300 ease-in-out active:rotate-180 delay-100 ${
            Addingtodo ? " wait rotate-180 " : " rotate-0 "
          }`}
          name="Addingtododroer"
          onClick={() => {
            Addingtodo ? setAddingtodo(false) : setAddingtodo(true);
          }}
        >
          ⇓
        </button>
      </div>

      <div className="mt-5 mb-10">
        {firstloading ? (
          <h1 className=" text-center">Loading...</h1>
        ) : (
          <div className="" onDragOver={(e) => e.preventDefault()}>
            {todoarr.length > 0 ? (
              <>
                <div className="flex items-center my-10 ">
                  <hr className="border-gray-400 border-2 rounded-full flex-grow " />

                  <h1 className="text-lg font-semibold mx-2 bg-transparent ">
                    Yaad Rakho, Ye Kam Karna Hai
                  </h1>
                  <hr className="border-gray-400 border-2 rounded-full flex-grow " />
                </div>
                <div>
                  {todoarr.map((item, index) => (
                    <div
                      className="mt-4 flex w-full p-3 border  rounded-lg shadow-lg"
                      key={index}
                      draggable
                      onDragStart={(e) => onDragStart(e, index)}
                      onDrop={(e) => onDrop(e, index)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      {todoarr.length > 1 ? (
                        index === 0 || index === todoarr.length - 1 ? (
                          <div className="w-8 ">
                            <svg width="30" height="30" viewBox="0 0 24 24">
                              <g>
                                <g fillRule="evenodd" clipRule="evenodd">
                                  {index === todoarr.length - 1 ? (
                                    <>
                                      <path
                                        fill="#adb4bc"
                                        d="M22 12c0-3.738 0-5.608-.804-7A6 6 0 0 0 19 2.804C17.608 2 15.739 2 12 2c-3.738 0-5.608 0-7 .804A6 6 0 0 0 2.804 5C2 6.392 2 8.262 2 12c0 3.739 0 5.608.804 7A6 6 0 0 0 5 21.196C6.392 22 8.262 22 12 22c3.739 0 5.608 0 7-.804A6.002 6.002 0 0 0 21.196 19C22 17.608 22 15.739 22 12zM8.53 14.53a.75.75 0 0 1-1.06-1.06l2.585-2.586a2.75 2.75 0 0 1 3.89 0l2.585 2.586a.75.75 0 1 1-1.06 1.06l-2.586-2.585a1.25 1.25 0 0 0-1.768 0z"
                                        data-original="#adb4bc"
                                      ></path>
                                      <path
                                        fill="#363538"
                                        d="M8.53 14.53a.75.75 0 0 1-1.06-1.06l2.585-2.586a2.75 2.75 0 0 1 3.89 0l2.585 2.585a.75.75 0 1 1-1.06 1.061l-2.586-2.586a1.25 1.25 0 0 0-1.768 0z"
                                        data-original="#363538"
                                      ></path>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {index === 0 ? (
                                    <>
                                      <path
                                        fill="#adb4bc"
                                        d="M22 12c0-3.738 0-5.608-.804-7A6 6 0 0 0 19 2.804C17.608 2 15.739 2 12 2c-3.738 0-5.608 0-7 .804A6 6 0 0 0 2.804 5C2 6.392 2 8.262 2 12c0 3.739 0 5.608.804 7A6 6 0 0 0 5 21.196C6.392 22 8.262 22 12 22c3.739 0 5.608 0 7-.804A6.002 6.002 0 0 0 21.196 19C22 17.608 22 15.739 22 12zM8.53 10.47a.75.75 0 0 0-1.06 1.06l2.585 2.586a2.75 2.75 0 0 0 3.89 0l2.585-2.586a.75.75 0 1 0-1.06-1.06l-2.586 2.585a1.25 1.25 0 0 1-1.768 0z"
                                        opacity="1"
                                        data-original="#adb4bc"
                                      ></path>
                                      <path
                                        fill="#363538"
                                        d="M8.53 10.47a.75.75 0 0 0-1.06 1.06l2.585 2.586a2.75 2.75 0 0 0 3.89 0l2.585-2.586a.75.75 0 1 0-1.06-1.06l-2.586 2.585a1.25 1.25 0 0 1-1.768 0z"
                                        opacity="1"
                                        data-original="#363538"
                                      ></path>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </g>
                              </g>
                            </svg>
                          </div>
                        ) : (
                          <div className="w-8 ">
                            <svg width="30" height="30" viewBox="0 0 24 24">
                              <g>
                                <g fillRule="evenodd" clipRule="evenodd">
                                  <path
                                    fill="#adb4bc"
                                    d="M21.196 5C22 6.392 22 8.262 22 12s0 5.608-.804 7A6 6 0 0 1 19 21.196C17.608 22 15.738 22 12 22s-5.608 0-7-.804A6 6 0 0 1 2.804 19C2 17.608 2 15.738 2 12s0-5.608.804-7A6 6 0 0 1 5 2.804C6.392 2 8.262 2 12 2s5.608 0 7 .804A6 6 0 0 1 21.196 5zM12 5.25a.75.75 0 0 1 .53.22l4 4a.75.75 0 1 1-1.06 1.06L12 7.06l-3.47 3.47a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 .53-.22zm-3.47 8.22a.75.75 0 0 0-1.06 1.06l4 4a.75.75 0 0 0 1.06 0l4-4a.75.75 0 0 0-1.06-1.06L12 16.94z"
                                    data-original="#adb4bc"
                                  ></path>
                                  <path
                                    fill="#363538"
                                    d="M12 5.25a.75.75 0 0 1 .53.22l4 4a.75.75 0 1 1-1.06 1.06L12 7.06l-3.47 3.47a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 .53-.22zm-3.47 8.22a.75.75 0 0 0-1.06 1.06l4 4a.75.75 0 0 0 1.06 0l4-4a.75.75 0 0 0-1.06-1.06L12 16.94z"
                                    data-original="#363538"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                        )
                      ) : (
                        ""
                      )}

                      <div className="flex-grow">
                        <Todostrip
                          Task={item}
                          index={index}
                          status={status}
                          updatestatus={updatestatus}
                          deletetask={deletetask}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-5 text-center text-2xl">No Task Found</p>
            )}
          </div>
        )}
      </div>
      <hr className="border-gray-600 border-double flex-grow m-0" />

      <Footer />
    </main>
  );
}
