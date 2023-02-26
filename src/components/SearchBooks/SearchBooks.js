import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as BooksAPI from "../../BooksAPI";
import GetBooks from "../GetBooks/GetBooks";
import { Link } from "react-router-dom";
import styles from "./SearchBooks.module.css";
import { booksActions } from '../../store/books';
import Loader from "../Loader/Loader"
const SearchBooks = ({ changeBookShelf, fetchedBooks }) => {
	const dispatch = useDispatch();
	const searchedBook = useSelector((state) => state.books.searchedBook);
	const filteredBooks = useSelector((state) => state.books.filteredBooks);
	const isLoading = useSelector((state) => state.books.loading);

	const search = useCallback(async () => {
		dispatch(booksActions.loadBooks());

		try {
			const books = await BooksAPI.search(searchedBook);
			if (!books) {
				throw new Error('Something went wrong.');
			}
			dispatch(booksActions.getFilteredBooks(books));
		} catch (error) {
			dispatch(booksActions.getFilteredBooks([]));
		 }
	}, [dispatch, searchedBook]);

	const onChangeHandler = (event) => {
		dispatch(booksActions.setSearchedBook(event.target.value));
	};
	useEffect(() => {
		search(searchedBook);
	}, [searchedBook, search]);

	return (
		<div className={styles['search-books']}>
			<div className={styles['search-books-bar']}>
				<Link to='/'>
					<button className={styles['close-search']}>Close</button>
				</Link>
				<div className={styles['search-books-input-wrapper']}>
					<input
						type='text'
						value={searchedBook || ''}
						onChange={onChangeHandler}
						placeholder='Search by title or author'
					/>
				</div>
			</div>
			<div className={styles['search-books-results']}>
				{!isLoading &&<GetBooks
					searchedBooks={filteredBooks}
					fetchedBooks={fetchedBooks}
					changeBookShelf={changeBookShelf}
				/>}
				{isLoading && <Loader />}
			</div>
		</div>
	);
};

export default SearchBooks;
