import {React} from "react";
import BookItem from "../BookItem/BookItem";
import styles from "./Bookshelf.module.css";
const Bookshelf = ({ fetchedBooks, shelfTitle, onShelfChange }) => {
	return (
		<div className={styles.bookshelf}>
			<h2 className={styles['bookshelf-title']}>{shelfTitle}</h2>
			<div className={styles['bookshelf-books']}>
				<ol className={styles['books-grid']}>
					{fetchedBooks && fetchedBooks.map((fetchedBook) => (
						<BookItem
							key={fetchedBook.id}
							book={fetchedBook}
							onShelfChange={onShelfChange}
						/>
					))}
				</ol>
			</div>
		</div>
	);
};

export default Bookshelf;
