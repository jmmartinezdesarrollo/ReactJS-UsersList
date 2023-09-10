import { useState, useMemo, useReducer } from "react";
import { enumRows, enumOrderBy, ROWS_MAP } from "./const/enums";
import { API_URL } from "./const/strings";
import { usersReducer } from "./reducers/usersReducer";
import useFetch from "./hooks/useFetch";
import UsersList from "./components/UsersList";
import Loading from "./components/Loading";
import Error from "./components/Error";

function App() {
  const { isLoading, users, setUsers, INITIAL_USERS, isError } = useFetch(
    `${API_URL}?results=100`
  );
  const [usersType, dispatch] = useReducer(usersReducer, ROWS_MAP);
  const [showColorRow, setShowColorRow] = useState(false);
  const [filterByCountry, setFilterByCountry] = useState(null);

  const toggleRestoreInitialUsers = () => {
    setUsers(INITIAL_USERS.current);
    dispatch({ type: enumOrderBy.NONE, Name: enumRows.NONE });
  };
  const toggleColorRow = () => {
    setShowColorRow((prev) => !prev);
  };
  const toggleSortBy = (name) => {
    const ACTUAL_ORDER = usersType[name].Order;
    if (ACTUAL_ORDER === enumOrderBy.NONE)
      dispatch({ type: enumOrderBy.ASC, Name: name });
    if (ACTUAL_ORDER === enumOrderBy.ASC)
      dispatch({ type: enumOrderBy.DESC, Name: name });
    if (ACTUAL_ORDER === enumOrderBy.DESC)
      dispatch({ type: enumOrderBy.NONE, Name: name });
  };

  const SORT_USERS_LIST = useMemo(() => {
    let _users = [...users];

    if (filterByCountry) {
      _users = _users.filter((user) =>
        user.country.toLowerCase().includes(filterByCountry.toLowerCase())
      );
    }

    for (let item in usersType) {
      if (usersType[item].Order === enumOrderBy.ASC) {
        return _users.sort((a, b) => {
          return a[item].localeCompare(b[item]);
        });
      }
      if (usersType[item].Order === enumOrderBy.DESC) {
        return _users.sort((a, b) => {
          return b[item].localeCompare(a[item]);
        });
      }
    }

    return _users;
  }, [filterByCountry, users, usersType]);

  return (
    <>
      <h1>Users list</h1>
      <header>
        <button disabled={isLoading} onClick={toggleColorRow}>
          Color row
        </button>
        <button
          disabled={isLoading}
          onClick={() => toggleSortBy(enumRows.COUNTRY)}>
          Order by country
          {usersType[enumRows.COUNTRY].Arrow}
        </button>
        <button disabled={isLoading} onClick={toggleRestoreInitialUsers}>
          Reset state
        </button>
        <input
          disabled={isLoading}
          type="input"
          placeholder="Filter by country"
          onChange={(e) => setFilterByCountry(e.target.value)}
        />
      </header>

      <main>
        {isLoading && isError && <Error />}
        {isLoading && !isError && <Loading />}
        {!isLoading && !isError && (
          <UsersList
            showRowColor={showColorRow}
            users={SORT_USERS_LIST}
            setUsers={setUsers}
            toggleSortBy={toggleSortBy}
            usersType={usersType}
          />
        )}
      </main>
    </>
  );
}

export default App;
