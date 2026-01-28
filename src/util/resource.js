export const getDownloadHtmlTemplate = (headline, content) => `<html>
  <head>
    <style>
      blockquote,
      dl,
      dd,
      hr,
      figure,
      p {
        margin: revert;
      }

      pre {
        margin: revert;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      h1 {
        font-size: 2em;
        font-weight: bold;
        margin: 0.67em 0;
      }

      h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.75em 0;
      }

      h3 {
        font-size: 1.17em;
        font-weight: bold;
        margin: 0.83em 0;
      }

      h4 {
        font-size: 1em;
        font-weight: bold;
        margin: 1.12em 0;
      }

      h5 {
        font-size: 0.83em;
        font-weight: bold;
        margin: 1.5em 0;
      }

      h6 {
        font-size: 0.75em;
        font-weight: bold;
        margin: 1.67em 0;
      }

      ol,
      ul {
        list-style: revert;
        margin: revert;
        padding: revert;
      }
    </style>
  </head>
  <body class="resource-content">
    <h1>${headline}</h1>
    ${content}
  </body>
</html>`