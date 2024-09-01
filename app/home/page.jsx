"use client"
import React, { useState } from 'react';
import data from './data.json'; 

const Page = () => {
  const [currentIndexes, setCurrentIndexes] = useState({ section: 0, content: 0 });

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

  return (
    <div>
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <div>
        <h1>{data.sections[currentIndexes.section].title}</h1>
        <div>
          <h2>{data.sections[currentIndexes.section].content[currentIndexes.content].heading}</h2>
          <p>{data.sections[currentIndexes.section].content[currentIndexes.content].text}</p>
          <p>{data.sections[currentIndexes.section].content[currentIndexes.content].verse}</p>
          <p>{data.sections[currentIndexes.section].content[currentIndexes.content].verseText}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;