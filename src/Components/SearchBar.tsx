import { useState } from "react";
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
import { ISearchBarState } from "../App";

const SearchBar = (props: {
  searchBarState: ISearchBarState;
  setSearchBarState: Function;
}) => {
  const { searchBarState, setSearchBarState } = props;
  const { criterea, keyWord } = searchBarState;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ableToSearch, setAbleToSearch] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  /**Method that recive a string that defines the new SearchCriterea
   * and consecuencetly clear the value of the keyWord SearchBar propiety
   */
  const enableSearch = (selected: string) => {
    setAbleToSearch(true);
    setSearchBarState({ ...searchBarState, criterea: selected, keyWord: "" });
  };

  /**Method that clear the searchBarCriterea and the searchKeyWord and
   * turns into false the value of the ableToSearch state to set the
   * textArea as "disable" until the user select a new searchCriterea
   */
  const clearSearch = () => {
    setAbleToSearch(false);
    setSearchBarState({ ...searchBarState, keyWord: "", criterea: null });
    setFadeIn(false);
  };

  /**Method that handle changes on search textArea updating the
   * value of keyWord state
   */
  const handleSearchBarChange = (e: any) => {
    const value = e.target.value;
    setSearchBarState({ ...searchBarState, keyWord: value });
  };

  /**When selected a searchCriterea and keyword hasn´t reach
   * 3 letters long, it shows a fade message explaining the
   * condition
   */
  if (keyWord.length < 3 && ableToSearch && !fadeIn) {
    setFadeIn(true);
  }

  /**When selected a searchCriterea and keyword reaches
   * 3 letters long, it hides the fade message explaining the
   * condition
   */
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
          disabled={!ableToSearch}
          onChange={handleSearchBarChange}
        />
        {ableToSearch ? (
          <InputGroupAddon addonType="append">
            <Link to="/">
              <Button color="secondary" onClick={() => clearSearch()}>
                X
              </Button>
            </Link>
          </InputGroupAddon>
        ) : null}
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
