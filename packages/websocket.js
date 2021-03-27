const socket = io("https://realtime.streamelements.com", {
  transports: ["websocket"],
});

const onConnect = () => {
  console.log("Successfully connected to the websocket");
  socket.emit("authenticate", {
    method: "jwt",
    token: config.JWT,
  });
};

const onDisconnect = () => {
  console.log("Disconnected from websocket");
  // Reconnect
};

const onAuthenticated = (data) => {
  const { channelId } = data;

  console.log(`Successfully connected to channel ${channelId}`);
};

const parseEvent = (event) => {
  const e = new CustomEvent("onEventReceived", {
    detail: event,
  });
  window.dispatchEvent(e);
  console.log(e);
};

socket.on("connect", onConnect);

socket.on("disconnect", onDisconnect);

socket.on("authenticated", onAuthenticated);

socket.on("unauthorized", (data) => {
  console.log(data);
});

socket.on("event:test", (data) => {
  parseEvent(data);
});

socket.on("event", (data) => {
  parseEvent(data);
});

socket.on("event:update", (data) => {
  session.data.session[data.name] = data.data;
  const updateEvent = new CustomEvent(data.name, data);
  window.dispatchEvent(sessionEvent);
  session.session.data = data;
});

socket.on("session:reset", (data) => {
  const sessionEvent = new CustomEvent("onSessionUpdate", {
    detail: {
      session: data,
    },
  });
  session.session.data = data;
  window.dispatchEvent(sessionEvent);
});
