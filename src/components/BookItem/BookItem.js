import React from "react";
import ChangeShelf from "../ChangeShelf/ChangeShelf";
import styles from "./BookItem.module.css";
const BookItem = ({ book, onShelfChange }) => {
	return (
		<li key={book.id}>
			<div className={styles.book}>
				<div className={styles['book-top']}>
					<div
						className={styles['book-cover']}
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${
								book.imageLinks ? book.imageLinks.thumbnail : ""
							})`,
						}}
					/>
					{book && <ChangeShelf book={book} onShelfChange={onShelfChange} />}
				</div>
				<div className={styles['book-title']}>{book.title ? book.title : ""}</div>
				<div className={styles['book-authors']}>{book.authors ? book.authors : ""}</div>
			</div>
		</li>
	);
};

export default BookItem;
