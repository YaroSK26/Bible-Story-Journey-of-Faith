"use client"
import React, { useEffect, useState } from 'react';
import data from './data.json'; 

const Page = () => {
  const [currentIndexes, setCurrentIndexes] = useState({
    section: 0,
    content: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSectionIndex, setOpenSectionIndex] = useState(null);
   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const handlePrev = () => {
    setCurrentIndexes((oldIndexes) => {
      let newSectionIndex = oldIndexes.section;
      let newContentIndex = oldIndexes.content - 1;

      if (newContentIndex < 0) {
        newSectionIndex = newSectionIndex - 1 < 0 ? data.sections.length - 1 : newSectionIndex - 1;
        newContentIndex = data.sections[newSectionIndex].content.length - 1;
      }

      return { section: newSectionIndex, content: newContentIndex };
    });
  };

  const handleNext = () => {
    setCurrentIndexes((oldIndexes) => {
      let newSectionIndex = oldIndexes.section;
      let newContentIndex = oldIndexes.content + 1;

      if (newContentIndex >= data.sections[oldIndexes.section].content.length) {
        newSectionIndex = newSectionIndex + 1 >= data.sections.length ? 0 : newSectionIndex + 1;
        newContentIndex = 0;
      }

      return { section: newSectionIndex, content: newContentIndex };
    });
  };
  const handleSectionClick = (sectionIndex) => {
    setOpenSectionIndex(
      sectionIndex === openSectionIndex ? null : sectionIndex
    );
  };

  const handleContentClick = (sectionIndex, contentIndex) => {
    setCurrentIndexes({ section: sectionIndex, content: contentIndex });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 useEffect(() => {
   if (typeof window !== "undefined") {
     localStorage.setItem("theme", theme);
   }
 }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`flex flex-col ${
        theme === "dark" ? "text-white" : "text-black"
      } ${
        theme === "dark" ? "bg-black" : "bg-gray-100"
      } items-center  relative justify-center min-h-screen `}
    >
      <button onClick={toggleMenu} className="mb-4 absolute left-3 top-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-menu"
        >
          {isMenuOpen ? (
            <svg>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg>
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </svg>
      </button>

      <label className="switch absolute top-4 right-4">
        <input type="checkbox" onClick={toggleTheme} className="checkbox" />
        <div className="slider"></div>
      </label>

      <div
        className={`fixed top-0 left-0 h-full sm:w-64 w-full bg-gray-900 ${
          theme === "dark" ? "text-white" : "text-white"
        }  transform transition-transform duration-200 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={toggleMenu} className="absolute top-0 left-0 m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            {isMenuOpen ? (
              <svg>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg>
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </svg>
        </button>
        {isMenuOpen && (
          <nav className="mb-4 z-10 mt-12">
            {data.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <button
                  onClick={() => handleSectionClick(sectionIndex)}
                  className="sm:text-[15.5px] text-[14px] mb-2 mt-1 mx-2 text-left"
                >
                  {section.title}
                </button>
                {sectionIndex === openSectionIndex &&
                  section.content.map((content, contentIndex) => (
                    <button
                      key={contentIndex}
                      onClick={() =>
                        handleContentClick(sectionIndex, contentIndex)
                      }
                      className="block mx-2 py-1 px-3 text-left rounded sm:text-sm text-[12.5px]"
                    >
                      {content.heading}
                    </button>
                  ))}
              </div>
            ))}
          </nav>
        )}
      </div>
      <h1 className="sm:text-4xl text-3xl my-2 border-b-4 lg:mt-0 mt-12 border-b-gray-900 text-center">
        {data.sections[currentIndexes.section].title}
      </h1>
      <br />
      <div className="max-w-[1000px] px-2 text-center">
        <h2 className="sm:text-3xl text-2xl sm:mb-0 mb-4 ">
          {
            data.sections[currentIndexes.section].content[
              currentIndexes.content
            ].heading
          }
        </h2>
        <div className='flex justify-center'>
        <img className='w-[300px] h-48 my-2'
          src={
              data.sections[currentIndexes.section].content[
                  currentIndexes.content
                ].img
            }
            alt="image compoatible to choosen section"
            />
            </div>
        <p className="mb-2">
          {
            data.sections[currentIndexes.section].content[
              currentIndexes.content
            ].text
          }
        </p>
        <br />
        <p className="mb-4 ">
          {
            data.sections[currentIndexes.section].content[
              currentIndexes.content
            ].verseText
          }
        </p>
        <p className="italic mb-2 ">
          {
            data.sections[currentIndexes.section].content[
              currentIndexes.content
            ].verse
          }
        </p>
      </div>
      <div className="flex justify-center items-center space-x-4 sm:mb-10 mb-32 ">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-900 text-white rounded"
        >
          &larr;
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-900 text-white rounded"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Page;