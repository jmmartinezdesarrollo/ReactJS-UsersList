import {} from "react";
import PropTypes from "prop-types";
import { enumRows } from "../const/enums";
import "../styles/usersList.css";

UserList.propTypes = {
  showRowColor: PropTypes.bool,
  users: PropTypes.array,
  setUsers: PropTypes.func,
  toggleSortBy: PropTypes.func,
  usersType: PropTypes.object,
};

export default function UserList({
  showRowColor,
  users,
  setUsers,
  toggleSortBy,
  usersType,
}) {
  function deleteRow(uuid) {
    const _users = [...users].filter((user) => user.uuid != uuid);
    setUsers(_users);
  }

  return (
    <table width="100%">
      <thead>
        <tr className="table--pointer">
          <th>Picture</th>
          <th onClick={() => toggleSortBy(enumRows.NAME)}>
            Name {usersType[enumRows.NAME].Arrow}
          </th>
          <th onClick={() => toggleSortBy(enumRows.LAST_NAME)}>
            Last name {usersType[enumRows.LAST_NAME].Arrow}
          </th>
          <th onClick={() => toggleSortBy(enumRows.COUNTRY)}>
            Country {usersType[enumRows.COUNTRY].Arrow}
          </th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody className={showRowColor ? "table--showColors" : null}>
        {users.map((user, index) => {
          return (
            <tr key={index}>
              <td>
                <img src={user.picture} />
              </td>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteRow(user.uuid);
                  }}>
                  DELETE
                </button>
              </td>
            </tr>
          );
        })}
        {users.length === 0 && (
          <tr>
            <td></td>
            <td></td>
            <td className="table--noResults">
              <i>No results :(</i>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
