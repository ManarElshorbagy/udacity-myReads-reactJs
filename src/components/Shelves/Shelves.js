import React from "react";
import Bookshelf from "../Bookshelf/Bookshelf";
import styles from './Shelves.module.css';
const Shelves = ({ books, onShelfChange }) => {
	const currentlyReading = books && books.filter(
		(fetchedBook) => fetchedBook.shelf === "currentlyReading"
	);
	const wantToRead =books && books.filter(
		(fetchedBook) => fetchedBook.shelf === "wantToRead"
	);
	const read = books && books.filter((fetchedBook) => fetchedBook.shelf === "read");

	return (
		<div className={styles['list-books-content']}>
			<div>
				<Bookshelf
					fetchedBooks={currentlyReading}
					shelfTitle='Currently Reading Books'
					onShelfChange={onShelfChange}
				/>
				<Bookshelf
					fetchedBooks={wantToRead}
					shelfTitle='Want to Read Books'
					onShelfChange={onShelfChange}
				/>
				<Bookshelf
					fetchedBooks={read}
					shelfTitle='Already Read'
					onShelfChange={onShelfChange}
				/>
			</div>
		</div>
	);
};

export default Shelves;
