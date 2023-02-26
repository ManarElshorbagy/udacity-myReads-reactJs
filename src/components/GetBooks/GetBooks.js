import React from "react";
import BookItem from "../BookItem/BookItem";
import styles from "./GetBooks.module.css";

const GetBooks = ({ searchedBooks, fetchedBooks, changeBookShelf }) => {

	return (
		<ol className={styles['books-grid']}>
			{searchedBooks && searchedBooks.length > 0 &&
				searchedBooks && searchedBooks.map((book) => {

					return (
						<BookItem
							key={book.id}
							book={book}
							onShelfChange={changeBookShelf}
						/>
					);
				})}
			{ (searchedBooks && (searchedBooks.length === 0 || searchedBooks.error)) && (<h1 className={styles.white}>No books found</h1>)}
		</ol>
	);
};

export default GetBooks;
