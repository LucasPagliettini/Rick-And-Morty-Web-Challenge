import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "reactstrap";
import { CHARACTER, EPISODE, LOCATION } from "../Constants";
import { Link } from "react-router-dom";

const SearchBar = (props) => {
  const { searchBarState, setSearchBarState } = props;
  const { criterea, keyWord } = searchBarState;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ableToSearch, setAbleToSearch] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const enableSearch = (selected) => {
    setAbleToSearch(true);
    setSearchBarState({ ...searchBarState, criterea: selected, keyWord: "" });
  };

  const clearSearch = () => {
    setAbleToSearch(false);
    setSearchBarState({ ...searchBarState, keyWord: "", criterea: null });
    setFadeIn(false);
  };

  const handleSearchBarChange = (e) => {
    const value = e.target.value;
    setSearchBarState({ ...searchBarState, keyWord: value });
  };

  if (keyWord.length < 3 && ableToSearch && !fadeIn) {
    setFadeIn(true);
  }
  if (keyWord.length >= 3 && ableToSearch && fadeIn) {
    setFadeIn(false);
  }

  return (
    <div>
      <InputGroup>
        <InputGroupButtonDropdown
          addonType="append"
          isOpen={dropdownOpen}
          toggle={toggleDropDown}
        >
          <DropdownToggle caret>Search by {criterea}</DropdownToggle>
          <DropdownMenu>
            <Link to="/Characters">
              <DropdownItem onClick={() => enableSearch(CHARACTER)}>
                {CHARACTER}
              </DropdownItem>
            </Link>
            <Link to="/Locations">
              <DropdownItem onClick={() => enableSearch(LOCATION)}>
                {LOCATION}
              </DropdownItem>
            </Link>
            <Link to="/Episodes">
              <DropdownItem onClick={() => enableSearch(EPISODE)}>
                {EPISODE}
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Input
          placeholder={
            ableToSearch ? "Enter search keywords..." : "Select search criterea"
          }
          value={keyWord}
          onChange={handleSearchBarChange}
        />
        {ableToSearch ? (
        <InputGroupAddon addonType="append">
          <Link to="/">
            <Button
              color="secondary"
              
              onClick={() => clearSearch()}
            >
              X
            </Button>
          </Link>
        </InputGroupAddon>) :
        null}
      </InputGroup>
      <Collapse isOpen={fadeIn} tag="h6" className="mt-2">
        <div className="alert alert-warning" role="alert">
          Enter at least 3 leters to search...
        </div>
      </Collapse>
    </div>
  );
};

export default SearchBar;
