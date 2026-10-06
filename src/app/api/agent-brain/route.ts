@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html,
body {
  min-height: 100%;
  margin: 0;
  background: #080b12;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background:
    radial-gradient(circle at top, rgba(236, 72, 153, 0.16), transparent 35%),
    linear-gradient(135deg, #070b12 0%, #0e1322 100%);
}

* {
  box-sizing: border-box;
}

button,
input,
select {
  font: inherit;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
}

::-webkit-scrollbar-thumb {
  background: rgba(236, 72, 153, 0.45);
  border-radius: 9999px;
}
