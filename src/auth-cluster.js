import React, { useState } from "react";
import { useCurrentUser } from "./hooks/current-user";
import { ProfileCluster } from "./profile-cluster";

function WithAuth() {
  const cu = useCurrentUser();

  return !cu.loggedIn ? null : (
    <>
      <h4 className="me-4">{cu.addr ?? "No Address"}</h4>
      <button className="btn btn-outline-warning me-4" onClick={cu.logOut}>
        Log Out
      </button>
    </>
  );
}

function SansAuth() {
  const cu = useCurrentUser();

  return cu.loggedIn ? null : (
    <>
      <button className="btn btn-outline-success me-4" onClick={cu.logIn}>
        Log In
      </button>
      <button className="btn btn-outline-warning me-4" onClick={cu.signUp}>
        Sign Up
      </button>
    </>
  );
}

export function AuthCluster() {
  const searchInput = React.createRef();
  const [search, setSearch] = useState("");

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <h2>Flow NFT</h2>
          <div className="d-flex">
            <WithAuth />
            <SansAuth />
            <input
              className="me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              ref={searchInput}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={() => setSearch(searchInput.current.value)}>
              Search
            </button>
          </div>
        </div>
      </nav>
      {search === "" ? "" : <ProfileCluster address={search} />}
    </>
  );
}
