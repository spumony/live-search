import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { searchRequest } from '../requests/app-requests';

const List = styled.ul`
  color: black;
  font-weight: 600;
  list-style-type: none;
  padding-left: 5px;
  font-size: 23px;
`;

const Search = () => {
  const [value, setValue] = useState('');
  const [searchItems, setSearchItems] = useState([]);
  const params = useParams();

  const liveSearchRequest = useCallback(
    (searchValue) => {
      setValue(searchValue);
      searchRequest()
        .then((response) => {
          const items = response.data;
          const filteredItems = searchValue.length
            ? items.filter((item) => item.match(new RegExp(searchValue, 'ig')))
            : [];

          setSearchItems(filteredItems);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [setSearchItems, setValue]
  );

  const handleChange = useCallback(
    (event) => {
      liveSearchRequest(event.target.value);
    },
    [liveSearchRequest]
  );

  useEffect(() => {
    const { q } = params;
    if (q) {
      liveSearchRequest(q);
    }
  }, [params, liveSearchRequest]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={value}
      />

      {searchItems.map((item, index) => (
        <List key={index}>
          <li>{item}</li>
        </List>
      ))}
    </div>
  );
};

export default Search;
