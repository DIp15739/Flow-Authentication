import { useState, useEffect } from "react";
import { useCurrentUser } from "./hooks/current-user";
import { useProfile } from "./hooks/profile";

function ProfileForm() {
  const cu = useCurrentUser();
  const profile = useProfile(cu.addr);
  const [name, setName] = useState("");
  useEffect(() => {
    setName(profile.name);
  }, [profile.name]);

  const submit = () => {
    profile.setName(name);
  };

  return (
    <div className="input-group mt-3">
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-describedby="update-name"
      />
      {profile.isIdle && (
        <button
          onClick={submit}
          className="btn btn-outline-secondary"
          type="button"
          id="update-name">
          Update Name
        </button>
      )}
      {profile.isProcessing && <span>PROCESSING</span>}
    </div>
  );
}

export function ProfileCluster({ address }) {
  const profile = useProfile(address);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => profile.refetch(), [address]);
  if (address == null) return null;
  return (
    <div style={{ color: "black", marginTop: "1rem" }}>
      <div
        className="card mb-3"
        style={{ maxWidth: 540, padding: "0.5rem", margin: "auto" }}>
        {profile.isProcessing ? (
          <span>PROCESSING...</span>
        ) : (
          <>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={profile.avatar}
                  className="img-fluid rounded-start"
                  alt={profile.name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">{profile.name}</h3>
                  <p className="card-text">{profile.info}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {profile.isCurrentUser && <span>Admin</span>}{" "}
                      <span>Profile: {address}</span>
                    </small>
                  </p>
                </div>
              </div>
            </div>
            {profile.isCurrentUser && <ProfileForm />}
          </>
        )}
      </div>
    </div>
  );
}
