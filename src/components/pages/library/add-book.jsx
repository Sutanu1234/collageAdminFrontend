"use client";

import { AllBooks } from "./all-book";
import { PopupAddBook } from "./add-book-details";
import { PopupDeleteBook } from "./delete-book";

function AddBook() {

  return (
    <>
    <div className="m-4">
      <div className="mb-4 flex gap-4 w-full">
        <div className="w-full">
          <PopupAddBook />
        </div>
        <div className="w-full">
          <PopupDeleteBook />
        </div>
      </div>
      <div>
        <AllBooks />
      </div>
    </div>
    </>
  );
}

export default AddBook;
