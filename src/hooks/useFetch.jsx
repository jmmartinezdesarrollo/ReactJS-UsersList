import { useState, useEffect, useRef } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState(false);
  const INITIAL_USERS = useRef([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let usersList = [];
        data.results.map((item) => {
          usersList.push({
            uuid: item.login.uuid,
            picture: item.picture.thumbnail,
            name: item.name.first,
            lastName: item.name.last,
            country: item.location.country,
          });
        });

        setUsers(usersList),
          (INITIAL_USERS.current = usersList),
          setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, [url]);

  return { isLoading, users, setUsers, INITIAL_USERS, isError };
};

export default useFetch;
