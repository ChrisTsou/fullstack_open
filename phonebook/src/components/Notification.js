import React from "react";

const Notification = ({ notificationMessage }) => {
  if (notificationMessage=== null) {
    return null;
  }

  const style = {
    color: notificationMessage.isAlert ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div style={style} className="notification">
      {notificationMessage.message}
    </div>
  );
};

export default Notification;
