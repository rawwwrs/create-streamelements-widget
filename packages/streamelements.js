let field;
let data;

const hash = window.location.hash.substring(1);
const widget = config.widgets.includes(hash) ? hash : config.widgets[0];
const widgetDir = `../widgets/${widget}`;

const replaceVariables = (text) => {
  return text.replace(/\{\{([A-Za-z]\w+)\}\}/gi, (match, p1) => {
    return fields[p1].value;
  });
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
    .then((res) => (data = res));
};

const updateFields = () => {
  Object.keys(data).forEach((datum) => {
    fields[datum].value = data[datum];
  });
};

const insertHTML = () => {
  fetch(`${widgetDir}/widget.html`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then((response) => response.text())
    .then((res) => {
      const html = replaceVariables(res);
      const body = document.body || document.getElementsByTagName("body")[0];
      const currentWidget = document.createElement("div");
      body.append(currentWidget);
      currentWidget.innerHTML = html;
    });
};

insertCSS = () => {
  fetch(`${widgetDir}/widget.css`, {
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

insertJS = () => {
  const head = document.head || document.getElementsByTagName("head")[0];
  const script = document.createElement("script");
  head.appendChild(script);
  script.src = `${widgetDir}/widget.js`;
};

const init = async () => {
  await getFields();
  await getData();
  updateFields();
  insertHTML();
  insertCSS();
  insertJS();
};

init();
