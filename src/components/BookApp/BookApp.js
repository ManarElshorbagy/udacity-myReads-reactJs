import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import styles from './BookApp.module.css';
import * as BooksAPI from "../../BooksAPI";
import Shelves from "../Shelves/Shelves";
import SearchBooks from "../SearchBooks/SearchBooks";
import { booksActions } from '../../store/books';
import Loader from "../Loader/Loader";

const BookApp = () => {
	const dispatch = useDispatch();
	const fetchedBooks = useSelector((state) => state.books);
	const isLoading = useSelector((state) => state.books.loading);

	const getBooks = useCallback(async () => {
		dispatch(booksActions.loadBooks());

		try {
			const response = await BooksAPI.getAll();
			if (!response) {
				throw new Error('Something went wrong.');
			}
			dispatch(booksActions.loadBooksSuccess(response));
		} catch (error) { }
	}, [dispatch]);

	useEffect(() => { getBooks() }, [getBooks]);

	const changeBookShelf = (book, shelf) => {
		BooksAPI.update(book, shelf);
		let newBook = {};
		Object.preventExtensions(newBook);
		newBook = { ...book, shelf };
		if (shelf === "none") {
			dispatch(booksActions.loadBooksSuccess(fetchedBooks.books.filter((b) => b.id !== book.id)));
		} else {
			book = newBook;
			dispatch(booksActions.loadBooksSuccess(fetchedBooks.books.filter((b) => b.id !== book.id).concat(book)));
		}
	};

	return (
		<Router>
				<Switch>
					<Route exact path='/search'>
						<SearchBooks changeBookShelf={changeBookShelf} fetchedBooks={fetchedBooks.books}
						/>
					</Route>
				</Switch>
				{!isLoading && <div className={styles['list-books']}>
					<Switch>
						<Route exact path='/'>
							<div className={styles['list-books-title']}>
								<h1>MyReads</h1>
							</div>
							<Shelves books={fetchedBooks.books} onShelfChange={changeBookShelf} />
						</Route>
					</Switch>

					<div className={styles['open-search']}>
						<Link to='/search'>
							<button></button>
						</Link>
					</div>
				</div>}
				{isLoading && <Loader />}
		</Router>
	);
};

export default BookApp;
