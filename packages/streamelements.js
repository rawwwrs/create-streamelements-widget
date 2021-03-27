let fields;
let fieldData;

const hash = window.location.hash.substring(1);
const widget = config.widgets.includes(hash) ? hash : config.widgets[0];
const widgetDir = `/widgets/${widget}`;

const replaceVariables = (text) => {
  return Handlebars.compile(text)(fieldData);
};

const getFields = async () => {
  return await fetch(`${widgetDir}/fields.json`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((res) => (fields = res));
};

const getData = async () => {
  return await fetch(`${widgetDir}/data.json`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => response.json())
    .then((res) => (fieldData = res));
};

const insertHTML = async () => {
  return await fetch(`${widgetDir}/widget.html`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => response.text())
    .then((res) => {
      const html = replaceVariables(res);
      const body = document.body || document.getElementsByTagName("body")[0];
      const currentWidget = document.createElement("div");
      currentWidget.innerHTML = html;
      body.append(currentWidget);
    });
};

const insertCSS = async () => {
  return await fetch(`${widgetDir}/widget.css`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => response.text())
    .then((res) => {
      const css = replaceVariables(res);
      const head = document.head || document.getElementsByTagName("head")[0];
      const style = document.createElement("style");
      head.appendChild(style);
      style.innerHTML = css;
    });
};

const loadWidget = () => {
  const event = new CustomEvent("onWidgetLoad", {
    detail: { fieldData, recents: [] },
  });
  return dispatchEvent(event);
};

const insertJS = async () => {
  return await fetch(`${widgetDir}/widget.js`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => response.text())
    .then((res) => {
      const js = replaceVariables(res);
      const head = document.head || document.getElementsByTagName("head")[0];
      const script = document.createElement("script");
      script.innerHTML = js;
      head.appendChild(script);
      loadWidget();
    });
};

const init = async () => {
  await getFields();
  await getData();
  await insertHTML();
  await insertCSS();
  await insertJS();
};

init();
