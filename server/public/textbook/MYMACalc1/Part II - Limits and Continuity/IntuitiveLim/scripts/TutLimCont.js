import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.mjs";
import "https://code.jquery.com/jquery-3.3.1.min.js";

const r = String.raw;

const closedSet = (container) => {
  if (container instanceof Array) {
    return (el) => container.includes(el);
  } else if (container instanceof Set) {
    return (el) => container.has(el);
  }
};
const regex = (regex) => {
  const reg = new RegExp("^" + regex + "$");
  return (el) => reg.test(el);
};

const isInteger = regex("[0-9]+");

function minValOver(data, minx, maxx) {
  return (
    Math.min(
      data.lines.left.m * minx + data.lines.left.b,
      data.lines.right.m * minx + data.lines.right.b,
      data.lines.left.m * maxx + data.lines.left.b,
      data.lines.right.m * maxx + data.lines.right.b,
      data.lines.left.m * data.discont.x + data.lines.left.b,
      data.lines.right.m * data.discont.x + data.lines.right.b,
      data.discont.y
    ) - 1
  );
}

function maxValOver(data, minx, maxx) {
  return (
    Math.max(
      data.lines.left.m * minx + data.lines.left.b,
      data.lines.right.m * minx + data.lines.right.b,
      data.lines.left.m * maxx + data.lines.left.b,
      data.lines.right.m * maxx + data.lines.right.b,
      data.lines.left.m * data.discont.x + data.lines.left.b,
      data.lines.right.m * data.discont.x + data.lines.right.b,
      data.discont.y
    ) + 1
  );
}

const block1 = {
  refreshid: "RefreshX1",
  makeData: function () {
    let L = randInt(1, 6);
    let R = randInt(1, 6);
    let V = randInt(1, 6);
    let die = randInt(1, 15);

    if (die === 1 || die === 2 || die === 3) {
      L = V;
    }
    if (die === 4 || die === 5 || die === 6) {
      R = V;
    }
    if (die === 7 || die === 8) {
      R = L;
    }
    if (die === 8) {
      L = V;
      R = V;
    }

    const discont = {
      x: randInt(1, 6),
      y: V,
    };
    const lines = {
      left: {
        m: randIntExcept(-2, 3, [0]),
        b: undefined,
        period: randInt(4, 6),
      },
      right: {
        m: randIntExcept(-2, 3, [0]),
        b: undefined,
        period: randInt(4, 6),
      },
    };
    lines.left.b = L - lines.left.m * discont.x;
    lines.right.b = R - lines.right.m * discont.x;

    return {
      lines: lines,
      discont: discont,
    };
  },
  graph2D: function (data) {
    return {
      id: "graphX1",
      f: [
        function (x) {
          if (x <= data.discont.x) {
            return (
              data.lines.left.m * x +
              data.lines.left.b +
              Math.sin(
                ((2 * Math.PI) / data.lines.left.period) * (x - data.discont.x)
              )
            );
          }
        },
        function (x) {
          if (x >= data.discont.x) {
            return (
              data.lines.right.m * x +
              data.lines.right.b +
              Math.sin(
                ((2 * Math.PI) / data.lines.right.period) * (x - data.discont.x)
              )
            );
          }
        },
      ],
      circles: [
        {
          center: {
            x: data.discont.x,
            y: data.lines.left.m * data.discont.x + data.lines.left.b,
          },
          radius: 5,
          fill: false,
        },
        {
          center: {
            x: data.discont.x,
            y: data.lines.right.m * data.discont.x + data.lines.right.b,
          },
          radius: 5,
          fill: false,
        },
        {
          center: {
            x: data.discont.x,
            y: data.discont.y,
          },
          radius: 5,
          fill: true,
        },
      ],
      range: {
        x: {
          min: -1,
          max: 6.5,
        },
        y: {
          min: -1,
          max: 6.5,
        },
      },
    };
  },
  snippets: function (data) {
    return [
      {
        class: "discontx1",
        snippet: katex.renderToString(r`${data.discont.x}`),
      },
      {
        class: "xequaldiscont1",
        snippet: katex.renderToString(r`x=${data.discont.x}`),
      },
      {
        class: "limxapproachleft1",
        snippet: katex.renderToString(
          r`\displaystyle \lim_{x\rightarrow ${data.discont.x}^-}f(x)=\,`
        ),
      },
      {
        class: "limxapproachright1",
        snippet: katex.renderToString(
          r`\displaystyle \lim_{x\rightarrow ${data.discont.x}^+}f(x)=\,`
        ),
      },
      {
        class: "fxequals1",
        snippet: katex.renderToString(r`\displaystyle f(${data.discont.x})=\,`),
      },
      {
        class: "fatdiscontx1",
        snippet: katex.renderToString(r`f(${data.discont.x})`),
      },
      {
        class: "limatdiscontx1",
        snippet: katex.renderToString(
          r`\displaystyle \lim_{x\rightarrow ${data.discont.x}}f(x)\,`
        ),
      },
      {
        class: "limxleftval1",
        snippet: katex.renderToString(
          r`${data.lines.left.m * data.discont.x + data.lines.left.b}`
        ),
      },
      {
        class: "limxrightval1",
        snippet: katex.renderToString(
          r`${data.lines.right.m * data.discont.x + data.lines.right.b}`
        ),
      },
      {
        class: "fxval1",
        snippet: katex.renderToString(r`${data.discont.y}`),
      },
    ];
  },
  exercises: [
    {
      id: r`X1a`,
      answer: (data) =>
        r`${data.lines.left.m * data.discont.x + data.lines.left.b}`,
      validateSyntax: isInteger,
      validateAnswer: function (given, data) {
        return (
          Number(given) ===
          data.lines.left.m * data.discont.x + data.lines.left.b
        );
      },
    },
    {
      id: r`X1b`,
      answer: (data) =>
        r`${data.lines.right.m * data.discont.x + data.lines.right.b}`,
      validateSyntax: isInteger,
      validateAnswer: function (given, data) {
        return (
          Number(given) ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        );
      },
    },
    {
      id: r`X1c`,
      answer: (data) => r`${data.discont.y}`,
      validateSyntax: (el) => isInteger(el) || closedSet(["undefined"])(el),
      validateAnswer: function (given, data) {
        return { correct: Number(given) === data.discont.y, responseId: "" };
      },
      checkResponseIds: [
        "Correct",
        "CorrectDNE",
        "Incorrect",
        "Missing",
        "Invalid",
      ],
    },
    {
      id: r`X1d`,
      answer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return r`True`;
        } else {
          return r`False`;
        }
      },
      validateSyntax: (el) => closedSet(["True", "False"]),
      validateAnswer: function (given, data) {
        console.log({ given });
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          if (given === "True") {
            return { correct: true, responseId: "Yes" };
          } else {
            return { correct: false, responseId: "" };
          }
        } else {
          if (given === "False") {
            return { correct: true, responseId: "No" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "CorrectYes",
        "CorrectNo",
        "Incorrect",
        "Invalid",
        "Missing",
      ],
      showAnswer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
      // onanswer: function (given, data) {
      //     if (given === "True" && (data.lines.left.m * data.discont.x + data.lines.left.b === data.lines.right.m * data.discont.x + data.lines.right.b)) {
      //         enable("X1e");
      //     } else {
      //         disable("X1e");
      //     }
      // }
    },
    {
      id: r`X1e`,
      answer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return r`${data.lines.left.m * data.discont.x + data.lines.left.b}`;
        } else {
          return r`undefined`;
        }
      },
      validateSyntax: (el) =>
        isInteger(el) || closedSet(["infinity", "-infinity", "undefined"])(el),
      validateAnswer: function (given, data) {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return {
            correct:
              Number(given) ===
              data.lines.left.m * data.discont.x + data.lines.left.b,
            responseId: "",
          };
        } else {
          if (given === "undefined") {
            return { correct: true, responseId: "DNE" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "Correct",
        "CorrectDNE",
        "Incorrect",
        "Missing",
        "Invalid",
      ],
      showAnswer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return "";
        } else {
          return "DNE";
        }
      },
      showIds: ["", "DNE"],
    },

    {
      id: r`X1f`,
      answer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y
        ) {
          return r`True`;
        } else {
          return r`False`;
        }
      },
      validateSyntax: closedSet(["True", "False"]),
      validateAnswer: function (given, data) {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y
        ) {
          if (given === "True") {
            return { correct: true, responseId: "Yes" };
          } else {
            return { correct: false, responseId: "" };
          }
        } else {
          if (given === "False") {
            return { correct: true, responseId: "No" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "CorrectYes",
        "CorrectNo",
        "Incorrect",
        "Invalid",
        "Missing",
      ],
      showAnswer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
    },
    {
      id: r`X1g`,
      answer: (data) => {
        if (
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          return r`True`;
        } else {
          return r`False`;
        }
      },
      validateSyntax: closedSet(["True", "False"]),
      validateAnswer: function (given, data) {
        if (
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          if (given === "True") {
            return { correct: true, responseId: "Yes" };
          } else {
            return { correct: false, responseId: "" };
          }
        } else {
          if (given === "False") {
            return { correct: true, responseId: "No" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "CorrectYes",
        "CorrectNo",
        "Incorrect",
        "Invalid",
        "Missing",
      ],
      showAnswer: (data) => {
        if (
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
    },
    {
      id: r`X1h`,
      answer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y &&
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          return r`True`;
        } else {
          return r`False`;
        }
      },
      validateSyntax: closedSet(["True", "False"]),
      validateAnswer: function (given, data) {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y &&
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          if (given === "True") {
            return { correct: true, responseId: "Yes" };
          } else {
            return { correct: false, responseId: "" };
          }
        } else {
          if (given === "False") {
            return { correct: true, responseId: "No" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "CorrectYes",
        "CorrectNo",
        "Incorrect",
        "Invalid",
        "Missing",
      ],
      showAnswer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y &&
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
    },
  ],
};

function randInt(a, b) {
  return Math.floor(Math.random() * (b - a)) + a;
}

function randIntExcept(a, b, except) {
  let x = randInt(a, b);
  while (except.includes(x)) {
    x = randInt(a, b);
  }
  return x;
}

function renderLine(m, b) {
  let ret;
  switch (m) {
    case -1:
      ret = "-x";
      break;
    case 1:
      ret = "x";
      break;
    case 0:
      return String(b);
    default:
      ret = `${m}x`;
      break;
  }
  if (b == 0) {
    return ret;
  } else if (b > 0) {
    return `${ret}+${b}`;
  } else {
    return `${ret}${b}`;
  }
}

const block2 = {
  refreshid: "RefreshX2",
  makeData: function () {
    let L = randInt(1, 6);
    let R = randInt(1, 6);
    let V = randInt(1, 6);
    let die = randInt(1, 15);

    if (die === 1 || die === 2 || die === 3) {
      L = V;
    }
    if (die === 4 || die === 5 || die === 6) {
      R = V;
    }
    if (die === 7 || die === 8) {
      R = L;
    }
    if (die === 8) {
      L = V;
      R = V;
    }

    const discont = {
      x: randInt(1, 6),
      y: V,
    };
    const lines = {
      left: {
        m: randIntExcept(-2, 3, [0]),
        b: undefined,
      },
      right: {
        m: randIntExcept(-2, 3, [0]),
        b: undefined,
      },
    };
    lines.left.b = L - lines.left.m * discont.x;
    lines.right.b = R - lines.right.m * discont.x;

    return {
      lines: lines,
      discont: discont,
    };
  },
  snippets: function (data) {
    return [
      {
        class: "piecewisefuncX2",
        snippet: katex.renderToString(r`
                    f(x)=\left\{
                    \begin{matrix}
                    ${renderLine(
          data.lines.left.m,
          data.lines.left.b
        )} & \text{if} & x\lt${data.discont.x} \\
                    ${data.discont.y} & \text{if} & x=${data.discont.x} \\
                    ${renderLine(
          data.lines.right.m,
          data.lines.right.b
        )} & \text{if} & x\gt${data.discont.x}
                    \end{matrix}\right.`),
      },
      {
        class: "discontx2",
        snippet: katex.renderToString(r`${data.discont.x}`),
      },

      {
        class: "xequaldiscont2",
        snippet: katex.renderToString(r`x=${data.discont.x}`),
      },

      {
        class: "limxapproachleft2",
        snippet: katex.renderToString(
          r`\displaystyle \lim_{x\rightarrow ${data.discont.x}^-}f(x)=\,`
        ),
      },
      {
        class: "limxapproachright2",
        snippet: katex.renderToString(
          r`\displaystyle \lim_{x\rightarrow ${data.discont.x}^+}f(x)=\,`
        ),
      },
      {
        class: "fxequals2",
        snippet: katex.renderToString(r`\displaystyle f(${data.discont.x})=\,`),
      },
      {
        class: "fatdiscontx2",
        snippet: katex.renderToString(r`f(${data.discont.x})`),
      },
      {
        class: "limatdiscontx2",
        snippet: katex.renderToString(
          r`\displaystyle \lim_{x\rightarrow ${data.discont.x}}f(x)\,`
        ),
      },
      {
        class: "limxleftval2",
        snippet: katex.renderToString(
          r`${data.lines.left.m * data.discont.x + data.lines.left.b}`
        ),
      },
      {
        class: "limxrightval2",
        snippet: katex.renderToString(
          r`${data.lines.right.m * data.discont.x + data.lines.right.b}`
        ),
      },
      {
        class: "fxval2",
        snippet: katex.renderToString(r`${data.discont.y}`),
      },
      {
        class: "numsapproachleftx2",
        snippet: `${katex.renderToString(
          r`${data.discont.x - 1}.9`
        )}, ${katex.renderToString(
          r`${data.discont.x - 1}.99`
        )}, ${katex.renderToString(r`${data.discont.x - 1}.999`)}`,
      },
      {
        class: "numsapproachrightx2",
        snippet: `${katex.renderToString(
          r`${data.discont.x}.1`
        )}, ${katex.renderToString(
          r`${data.discont.x}.01`
        )}, ${katex.renderToString(r`${data.discont.x}.001`)}`,
      },
    ];
  },
  exercises: [
    {
      id: r`X2a`,
      answer: (data) =>
        r`${data.lines.left.m * data.discont.x + data.lines.left.b}`,
      validateSyntax: isInteger,
      validateAnswer: function (given, data) {
        return (
          Number(given) ===
          data.lines.left.m * data.discont.x + data.lines.left.b
        );
      },
    },
    {
      id: r`X2b`,
      answer: (data) =>
        r`${data.lines.right.m * data.discont.x + data.lines.right.b}`,
      validateSyntax: isInteger,
      validateAnswer: function (given, data) {
        return (
          Number(given) ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        );
      },
    },
    {
      id: r`X2c`,
      answer: (data) => r`${data.discont.y}`,
      validateSyntax: (el) => isInteger(el) || closedSet(["undefined"])(el),
      validateAnswer: function (given, data) {
        return {
          correct: Number(given) === data.discont.y,
          responseId: "",
        };
      },
      checkResponseIds: [
        "Correct",
        "CorrectDNE",
        "Incorrect",
        "Missing",
        "Invalid",
      ],
    },
    {
      id: r`X2d`,
      answer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return r`True`;
        } else {
          return r`False`;
        }
      },
      validateSyntax: closedSet(["True", "False"]),
      validateAnswer: function (given, data) {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          if (given === "True") {
            return { correct: true, responseId: "Yes" };
          } else {
            return { correct: false, responseId: "" };
          }
        } else {
          if (given === "False") {
            return { correct: true, responseId: "No" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "CorrectYes",
        "CorrectNo",
        "Incorrect",
        "Invalid",
        "Missing",
      ],
      showAnswer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
      // onanswer: function (given, data) {
      //     if (given === "True" && (data.lines.left.m * data.discont.x + data.lines.left.b === data.lines.right.m * data.discont.x + data.lines.right.b)) {
      //         enable("X2e");
      //     } else {
      //         disable("X2e");
      //     }
      // }
    },
    {
      id: r`X2e`,
      answer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return r`${data.lines.left.m * data.discont.x + data.lines.left.b}`;
        } else {
          return r`undefined`;
        }
      },
      validateSyntax: (el) =>
        isInteger(el) || closedSet(["infinity", "-infinity", "undefined"])(el),
      validateAnswer: function (given, data) {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return {
            correct:
              Number(given) ===
              data.lines.left.m * data.discont.x + data.lines.left.b,
            responseId: "",
          };
        } else {
          if (given === "undefined") {
            return { correct: true, responseId: "DNE" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "Correct",
        "CorrectDNE",
        "Incorrect",
        "Missing",
        "Invalid",
      ],
      showAnswer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.lines.right.m * data.discont.x + data.lines.right.b
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
    },

    {
      id: r`X2f`,
      answer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y
        ) {
          return r`True`;
        } else {
          return r`False`;
        }
      },
      validateSyntax: closedSet(["True", "False"]),
      validateAnswer: function (given, data) {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y
        ) {
          if (given === "True") {
            return { correct: true, responseId: "Yes" };
          } else {
            return { correct: false, responseId: "" };
          }
        } else {
          if (given === "False") {
            return { correct: true, responseId: "No" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "CorrectYes",
        "CorrectNo",
        "Incorrect",
        "Invalid",
        "Missing",
      ],
      showAnswer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
    },
    {
      id: r`X2g`,
      answer: (data) => {
        if (
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          return r`True`;
        } else {
          return r`False`;
        }
      },
      validateSyntax: closedSet(["True", "False"]),
      validateAnswer: function (given, data) {
        if (
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          if (given === "True") {
            return { correct: true, responseId: "Yes" };
          } else {
            return { correct: false, responseId: "" };
          }
        } else {
          if (given === "False") {
            return { correct: true, responseId: "No" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "CorrectYes",
        "CorrectNo",
        "Incorrect",
        "Invalid",
        "Missing",
      ],
      showAnswer: (data) => {
        if (
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
    },
    {
      id: r`X2h`,
      answer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y &&
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          return r`True`;
        } else {
          return r`False`;
        }
      },
      validateSyntax: closedSet(["True", "False"]),
      validateAnswer: function (given, data) {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y &&
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          if (given === "True") {
            return { correct: true, responseId: "Yes" };
          } else {
            return { correct: false, responseId: "" };
          }
        } else {
          if (given === "False") {
            return { correct: true, responseId: "No" };
          } else {
            return { correct: false, responseId: "" };
          }
        }
      },
      checkResponseIds: [
        "CorrectYes",
        "CorrectNo",
        "Incorrect",
        "Invalid",
        "Missing",
      ],
      showAnswer: (data) => {
        if (
          data.lines.left.m * data.discont.x + data.lines.left.b ===
          data.discont.y &&
          data.lines.right.m * data.discont.x + data.lines.right.b ===
          data.discont.y
        ) {
          return "Yes";
        } else {
          return "No";
        }
      },
      showIds: ["Yes", "No"],
    },
  ],
};

function disable(id) {
  const docel = document.getElementById(`Overlay${id}`);
  Array.from(docel.children).forEach((el) => {
    el.style.disabled = true;
    el.style.pointerEvents = "none";
    el.style.opacity = ".5";
  });
}

function enable(id) {
  const docel = document.getElementById(`Overlay${id}`);
  Array.from(docel.children).forEach((el) => {
    el.style.disabled = false;
    el.style.pointerEvents = "auto";
    el.style.opacity = "1";
  });
}

function renderBlock(block) {
  const data = block.makeData();

  block.snippets(data).forEach((el) => {
    $(`.${el.class}`).each(function () {
      $(this).html(el.snippet);
    });
  });

  if (block.graph2D) {
    const g = block.graph2D(data);
    const canvas = document.getElementById(g.id),
      ctx = canvas.getContext("2d"),
      width = canvas.width,
      height = canvas.height;
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const widthScale = width / (g.range.x.max - g.range.x.min),
      heightScale = height / (g.range.y.max - g.range.y.min);
    const plot = function (fn, range, ctx) {
      ctx.beginPath();
      let first = true;

      for (let x = 0; x < width; x++) {
        const xFnVal = x / widthScale + range.x.min,
          yGVal = height - (fn(xFnVal) - range.y.min) * heightScale;

        if (first) {
          ctx.moveTo(x, yGVal);
          first = false;
        } else {
          ctx.lineTo(x, yGVal);
        }
      }
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    ctx.beginPath();
    const xAxis = {
      minx: 0,
      maxx: width,
      y: height - heightScale * (0 - g.range.y.min),
    };
    ctx.moveTo(xAxis.minx, xAxis.y);
    ctx.lineTo(xAxis.maxx, xAxis.y);
    const yAxis = {
      miny: height,
      maxy: 0,
      x: widthScale * (0 - g.range.x.min),
    };
    ctx.moveTo(yAxis.x, yAxis.miny);
    ctx.lineTo(yAxis.x, yAxis.maxy);

    const xtick = {
      miny: -0.2,
      maxy: 0.2,
    };
    const yTextPos = xtick.miny - 0.5;
    ctx.fillStyle = "#aaa";
    ctx.textAlign = "center";
    ctx.font = "15px Arial";
    for (let x = 0, xval = g.range.x.min; x <= width; x += widthScale, xval++) {
      if (xval != 0 && xval != g.range.x.max && xval != g.range.x.min) {
        ctx.fillText(
          String(xval),
          x,
          height - heightScale * (yTextPos - g.range.y.min)
        );
        ctx.moveTo(x, height - heightScale * (xtick.maxy - g.range.y.min));
        ctx.lineTo(x, height - heightScale * (xtick.miny - g.range.y.min));
      }
    }
    const ytick = {
      minx: -0.2,
      maxx: 0.2,
    };
    const xTextPos = ytick.minx - 0.5;
    for (
      let y = heightScale / 2, yval = g.range.y.max - 0.5;
      y <= height;
      y += heightScale, yval--
    ) {
      if (yval != 0 && yval != g.range.y.max && yval != g.range.y.min) {
        ctx.fillText(
          String(yval),
          widthScale * (xTextPos - g.range.x.min),
          y + 6
        );
        ctx.moveTo(widthScale * (ytick.minx - g.range.x.min), y);
        ctx.lineTo(widthScale * (ytick.maxx - g.range.x.min), y);
      }
    }

    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 2;
    ctx.stroke();
    g.f.forEach((f) => {
      plot(f, g.range, ctx);
    });

    g.circles
      .filter((el) => !el.fill)
      .forEach((c) => {
        ctx.beginPath();
        const cx = (c.center.x - g.range.x.min) * widthScale;
        const cy = height - (c.center.y - g.range.y.min) * heightScale;
        ctx.arc(cx, cy, c.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
      });
    g.circles
      .filter((el) => el.fill)
      .forEach((c) => {
        ctx.beginPath();
        const cx = (c.center.x - g.range.x.min) * widthScale;
        const cy = height - (c.center.y - g.range.y.min) * heightScale;
        ctx.arc(cx, cy, c.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
      });
  }

  block.exercises.forEach((el) => {
    const output = document.getElementById("Reply" + el.id);
    output.value = "";
    output.style.backgroundColor = "white";

    const input = document.getElementById("Input" + el.id);
    input.value = "";

    const checkT = document.getElementById("True" + el.id),
      checkF = document.getElementById("False" + el.id);
    
    const clearOutput = () => {
      dropShow.slideUp();
      dropCheck.slideUp();
      output.value = "";
      output.style.backgroundColor = "white";
    };
    if (checkT) {
      checkT.checked = false;
      checkF.checked = false;
      const clicked = (ev) => {
        input.value = ev.target.value;
        clearOutput();
      };
      checkT.addEventListener("click", clicked);
      checkF.addEventListener("click", clicked);
    }

    const dropCheck = $(`[data-toggle="Check${el.id}"]`).eq(1);
    const dropShow = $(`[data-toggle="Show${el.id}"]`).eq(1);
    const dropHint = $(`[data-toggle="Hint${el.id}"]`).eq(1);

    const makeVisible = (el) => {
      el.style.display = "block";
    };
    const makeInvisible = (el) => {
      el.style.display = "none";
    };
    const displayCorrect = () => {
      output.value = "Correct";
      output.style.backgroundColor = "#00ee88"; //green
    };
    const displayIncorrect = () => {
      output.value = "Incorrect";
      output.style.backgroundColor = "#ee2222"; //red
    };
    const displayMissing = () => {
      output.value = "Missing";
      output.style.backgroundColor = "#ee5522"; //orange
    };
    const displayInvalid = () => {
      output.value = "Invalid";
      output.style.backgroundColor = "#ee5522"; //orange
    };
    const clearResponses = () => {
      if (el.checkResponseIds !== undefined) {
        el.checkResponseIds
          .map((str) => str + el.id)
          .map((el) => document.getElementById(el))
          .forEach((el) => makeInvisible(el));
      } else {
        const correct = document.getElementById("Correct" + el.id);
        const incorrect = document.getElementById("Incorrect" + el.id);
        const invalid = document.getElementById("Invalid" + el.id);
        const missing = document.getElementById("Missing" + el.id);
        const responses = [correct, incorrect, missing, invalid];
        responses.forEach(makeInvisible);
      }
    };
    clearResponses();
    const checkfn = (env) => {
      clearResponses();
      dropShow.slideUp();
      const inputval = input.value;
      console.log({ inputval });
      const invalid = document.getElementById("Invalid" + el.id);
      const missing = document.getElementById("Missing" + el.id);
      if (el.checkResponseIds !== undefined) {
        const { correct, responseId } = el.validateAnswer(inputval, data);

        if (inputval === "") {
          makeVisible(missing);
          displayMissing();
        } else if (el.validateSyntax && !el.validateSyntax(inputval)) {
          makeVisible(invalid);
          displayInvalid();
        } else if (correct) {
          const response = document.getElementById(
            ("Correct" + responseId + el.id)
          );
          makeVisible(response);
          displayCorrect();
        } else {
          const response = document.getElementById(
            ("Incorrect" + responseId + el.id)
          );
          makeVisible(response);
          displayIncorrect();
        }
      } else {
        const correct = document.getElementById("Correct" + el.id);
        const incorrect = document.getElementById("Incorrect" + el.id);
        if (inputval === "") {
          makeVisible(missing);
          displayMissing();
        } else if (el.validateSyntax && !el.validateSyntax(inputval)) {
          makeVisible(invalid);
          displayInvalid();
        } else if (el.validateAnswer(inputval, data)) {
          makeVisible(correct);
          displayCorrect();
        } else {
          makeVisible(incorrect);
          displayIncorrect();
        }
        if (el.onanswer) {
          el.onanswer(inputval, data);
        }
      }
    };

    const hint = document.getElementById("BHint" + el.id);
    hint.onclick = () => {
      //do nothing
    };

    const check = document.getElementById("BCheck" + el.id);
    check.addEventListener("click", checkfn);
    const showfn = (ev) => {
      dropCheck.slideUp();
      if (el.showAnswer) {
        const hideAnswers = () => {
          el.showIds
            .map((str) => "Show" + str + el.id)
            .map((el) => document.getElementById(el))
            .forEach(makeInvisible);
        };
        hideAnswers();
        makeVisible(
          document.getElementById("Show" + el.showAnswer(data) + el.id)
        );
      }
      output.style.backgroundColor = "#eeaa22";
      output.value = r`Shown`;
      input.value = el.answer(data);
      if (checkT) {
        if (input.value === "True") {
          checkT.checked = true;
          checkF.checked = false;
        } else {
          checkT.checked = false;
          checkF.checked = true;
        }
      }
    };
    const show = document.getElementById("BShow" + el.id);
    show.removeEventListener("click", showfn);
    show.addEventListener("click", showfn);
    if (el.startsDisabled) {
      disable(el.id);
    }
    
    input.oninput = clearOutput;
  });
}
function main() {
  const refreshfn1 = (_cntx) => {
    renderBlock(block1);
    block1.exercises.forEach(({ id }) => {
      const dropCheck = $(`[data-toggle="Check${id}"]`).eq(1);
      const dropShow = $(`[data-toggle="Show${id}"]`).eq(1);
      const dropHint = $(`[data-toggle="Hint${id}"]`).eq(1);
      const drops = [dropCheck, dropShow, dropHint];
      drops.forEach((drop) => drop.slideUp());
    });
  };
  const refreshfn2 = (_cntx) => {
    renderBlock(block2);
    block2.exercises.forEach(({ id }) => {
      const dropCheck = $(`[data-toggle="Check${id}"]`).eq(1);
      const dropShow = $(`[data-toggle="Show${id}"]`).eq(1);
      const dropHint = $(`[data-toggle="Hint${id}"]`).eq(1);
      const drops = [dropCheck, dropShow, dropHint];
      drops.forEach((drop) => drop.slideUp());
    });
  };
  renderBlock(block1);
  document
    .getElementById(block1.refreshid)
    .addEventListener("click", refreshfn1);
  renderBlock(block2);
  document
    .getElementById(block2.refreshid)
    .addEventListener("click", refreshfn2);
}

main();
