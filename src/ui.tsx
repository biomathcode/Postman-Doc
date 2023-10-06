type ArrayOfString = Array<string>;

type Palettes = {
  basic: Array<string>;
  blue: ArrayOfString;
  yellow: ArrayOfString;
  teal: ArrayOfString;
  green: ArrayOfString;
  red: ArrayOfString;
  purple: ArrayOfString;
};

export const SUPPORTED_LANGUAGES = [
  {
    name: "PHP",
    alias: ["php", "php3", "php4", "php5"],
    value: "php",
  },
  {
    name: "Java",
    alias: ["java"],
    value: "java",
  },
  {
    name: "CSharp",
    alias: ["csharp", "c#"],
    value: "cs",
  },
  {
    name: "Python",
    alias: ["python", "py"],
    value: "python",
  },
  {
    name: "JavaScript",
    alias: ["javascript", "js"],
    value: "javascript",
  },
  {
    name: "Html",
    alias: ["html"],
    value: "xml",
  },
  {
    name: "C++",
    alias: ["c++", "cpp", "clike"],
    value: "cpp",
  },
  {
    name: "Ruby",
    alias: ["ruby", "rb", "duby"],
    value: "ruby",
  },
  {
    name: "Objective-C",
    alias: ["objective-c", "objectivec", "obj-c", "objc"],
    value: "objectivec",
  },
  {
    name: "C",
    alias: ["c"],
    value: "cpp",
  },
  {
    name: "Swift",
    alias: ["swift"],
    value: "swift",
  },
  {
    name: "TeX",
    alias: ["tex", "latex"],
    value: "tex",
  },
  {
    name: "Shell",
    alias: ["shell", "bash", "sh", "ksh", "zsh"],
    value: "shell",
  },
  {
    name: "Scala",
    alias: ["scala"],
    value: "scala",
  },
  {
    name: "Go",
    alias: ["go"],
    value: "go",
  },
  {
    name: "ActionScript",
    alias: ["actionscript", "actionscript3", "as"],
    value: "actionscript",
  },
  {
    name: "ColdFusion",
    alias: ["coldfusion"],
    value: "xml",
  },
  {
    name: "JavaFX",
    alias: ["javafx", "jfx"],
    value: "java",
  },
  {
    name: "VbNet",
    alias: ["vbnet", "vb.net", "vfp", "clipper", "xbase"],
    value: "vbnet",
  },
  {
    name: "JSON",
    alias: ["json"],
    value: "json",
  },
  {
    name: "MATLAB",
    alias: ["matlab"],
    value: "matlab",
  },
  {
    name: "Groovy",
    alias: ["groovy"],
    value: "groovy",
  },
  {
    name: "SQL",
    alias: [
      "sql",
      "postgresql",
      "postgres",
      "plpgsql",
      "psql",
      "postgresql-console",
      "postgres-console",
      "tsql",
      "t-sql",
      "mysql",
      "sqlite",
    ],
    value: "sql",
  },
  {
    name: "R",
    alias: ["r"],
    value: "r",
  },
  {
    name: "Perl",
    alias: ["perl", "pl"],
    value: "perl",
  },
  {
    name: "Lua",
    alias: ["lua"],
    value: "lua",
  },
  {
    name: "Pascal",
    alias: ["pas", "pascal", "objectpascal", "delphi"],
    value: "pascal",
  },
  {
    name: "XML",
    alias: ["xml"],
    value: "xml",
  },
  {
    name: "TypeScript",
    alias: ["typescript", "ts"],
    value: "typescript",
  },
  {
    name: "CoffeeScript",
    alias: ["coffeescript", "coffee-script", "coffee"],
    value: "coffeescript",
  },
  {
    name: "Haskell",
    alias: ["haskell", "hs"],
    value: "haskell",
  },
  {
    name: "Puppet",
    alias: ["puppet"],
    value: "puppet",
  },
  {
    name: "Arduino",
    alias: ["arduino"],
    value: "arduino",
  },
  {
    name: "Fortran",
    alias: ["fortran"],
    value: "fortran",
  },
  {
    name: "Erlang",
    alias: ["erlang", "erl"],
    value: "erlang",
  },
  {
    name: "PowerShell",
    alias: ["powershell", "posh", "ps1", "psm1"],
    value: "powershell",
  },
  {
    name: "Haxe",
    alias: ["haxe", "hx", "hxsl"],
    value: "haxe",
  },
  {
    name: "Elixir",
    alias: ["elixir", "ex", "exs"],
    value: "elixir",
  },
  {
    name: "Verilog",
    alias: ["verilog", "v"],
    value: "verilog",
  },
  {
    name: "Rust",
    alias: ["rust"],
    value: "rust",
  },
  {
    name: "VHDL",
    alias: ["vhdl"],
    value: "vhdl",
  },
  {
    name: "Sass",
    alias: ["sass"],
    value: "less",
  },
  {
    name: "OCaml",
    alias: ["ocaml"],
    value: "ocaml",
  },
  {
    name: "Dart",
    alias: ["dart"],
    value: "dart",
  },
  {
    name: "CSS",
    alias: ["css"],
    value: "css",
  },
  {
    name: "reStructuredText",
    alias: ["restructuredtext", "rst", "rest"],
    value: "rest",
  },
  {
    name: "Kotlin",
    alias: ["kotlin"],
    value: "kotlin",
  },
  {
    name: "D",
    alias: ["d"],
    value: "d",
  },
  {
    name: "Octave",
    alias: ["octave"],
    value: "matlab",
  },
  {
    name: "QML",
    alias: ["qbs", "qml"],
    value: "qml",
  },
  {
    name: "Prolog",
    alias: ["prolog"],
    value: "prolog",
  },
  {
    name: "FoxPro",
    alias: ["foxpro", "purebasic"],
    value: "purebasic",
  },
  {
    name: "Scheme",
    alias: ["scheme", "scm"],
    value: "scheme",
  },
  {
    name: "CUDA",
    alias: ["cuda", "cu"],
    value: "cpp",
  },
  {
    name: "Julia",
    alias: ["julia", "jl"],
    value: "julia",
  },
  {
    name: "Racket",
    alias: ["racket", "rkt"],
    value: "lisp",
  },
  {
    name: "Ada",
    alias: ["ada", "ada95", "ada2005"],
    value: "ada",
  },
  {
    name: "Tcl",
    alias: ["tcl"],
    value: "tcl",
  },
  {
    name: "Mathematica",
    alias: ["mathematica", "mma", "nb"],
    value: "mathematica",
  },
  {
    name: "Autoit",
    alias: ["autoit"],
    value: "autoit",
  },
  {
    name: "StandardML",
    alias: ["standardmL", "sml", "standardml"],
    value: "sml",
  },
  {
    name: "Objective-J",
    alias: ["objective-j", "objectivej", "obj-j", "objj"],
    value: "objectivec",
  },
  {
    name: "Smalltalk",
    alias: ["smalltalk", "squeak", "st"],
    value: "smalltalk",
  },
  {
    name: "Vala",
    alias: ["vala", "vapi"],
    value: "vala",
  },
  {
    name: "ABAP",
    alias: ["abap"],
    value: "sql",
  },
  {
    name: "LiveScript",
    alias: ["livescript", "live-script"],
    value: "livescript",
  },
  {
    name: "XQuery",
    alias: ["xquery", "xqy", "xq", "xql", "xqm"],
    value: "xquery",
  },
  {
    name: "PlainText",
    alias: ["text", "plaintext"],
    value: "text",
  },
  {
    name: "Yaml",
    alias: ["yaml", "yml"],
    value: "yaml",
  },
  {
    name: "GraphQL",
    alias: ["graphql"],
    value: "graphql",
  },
  {
    name: "AppleScript",
    alias: ["applescript"],
    value: "applescript",
  },
  {
    name: "Clojure",
    alias: ["clojure"],
    value: "clojure",
  },
  {
    name: "Diff",
    alias: ["diff"],
    value: "diff",
  },
  {
    name: "VisualBasic",
    alias: ["visualbasic"],
    value: "visual-basic",
  },
  {
    name: "JSX",
    alias: ["jsx"],
    value: "jsx",
  },
  {
    name: "TSX",
    alias: ["tsx"],
    value: "tsx",
  },
  {
    name: "SplunkSPL",
    alias: ["splunk-spl"],
    value: "splunk-spl",
  },
] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export type LanguageAlias =
  (typeof SUPPORTED_LANGUAGES)[number]["alias"][number];
export type LanguageName = (typeof SUPPORTED_LANGUAGES)[number]["name"];

export type SupportedLanguages = LanguageName | LanguageAlias;

export const colorPalettes: Palettes = {
  basic: ["#fff", "#f5f4f7", "#B3BBC5"],
  blue: ["#DDEAFE", "#B3D5FF", "#4C9BFE"],
  yellow: ["#FEFBE6", "#FFF0B2", "#FEC203"],
  teal: ["#E7FBFF", "#B2F5FE", "#79E0F0"],
  green: ["#E3FDEE", "#AAF5D1", "#57D8A2"],
  red: ["#FFEAE7", "#FEBCAD", "#FE8F72"],
  purple: ["#E8E7FF", "#C1B4F2", "#988CD8"],
};

export const TextColorPalette: Palettes = {
  basic: ["#fff", "#97A1AE", "#182A4D"],
  blue: ["#B3D5FF", "#4C9BFE", "#0746A7"],
  yellow: ["#FFF0B2", "#FEC203", "#FE981F"],
  teal: ["#B2F5FE", "#00B8D9", "#008DA6"],
  green: ["#AAF5D1", "#35B27E", "#AAF5D1"],
  red: ["#FEBCAD", "#FF5431", "#BE2400"],
  purple: ["#E8E7FF", "#6454C0", "#413295"],
};

export const p = (text: string) => {
  return `<p>${text}</p>`;
};

export const t = (text: string, color: string) => {
  return `<span style="color: ${color};">${text}</span>`;
};

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | null;

export const h = (text: string, type: HeadingType) => {
  switch (type) {
    case "h1":
      return `<h1>${text}</h1>`;
    case "h2":
      return `<h2>${text}</h2>`;
    case "h3":
      return `<h3>${text}</h3>`;
    case "h4":
      return `<h4>${text}</h4>`;
    case "h5":
      return `<h5>${text}</h5>`;
    case "h6":
      return `<h6>${text}</h6>`;
    default:
      return `<p>${text}</p>`;
  }
};

type TagColor = "Red" | "Blue" | "Yellow" | "Green" | "Purple";

export const tag = (text: string, color: TagColor) => {
  return `<ac:structured-macro ac:name="status" ac:schema-version="1"><ac:parameter ac:name="title">${text}</ac:parameter><ac:parameter ac:name="colour">${color}</ac:parameter></ac:structured-macro>`;
};

export const date = (date: Date) => {
  return `<time datetime=${new Date(date).getTime()} />`;
};

export const sectionBanner = () => {
  return `

        `;
};

// DecisionType =  unordered list > list items.
export const decisionBanner = (text: string) => {
  return `
<ac:adf-extension>
<ac:adf-node type="decision-list">
<ac:adf-node type="decision-item">
<ac:adf-attribute key="state">DECIDED</ac:adf-attribute><ac:adf-content>${text}</ac:adf-content>
</ac:adf-node>
</ac:adf-node><ac:adf-fallback>
<ul class="decision-list">
<li>${text}</li>
</ul></ac:adf-fallback></ac:adf-extension>`;
};

type TwoLayoutType = "two_equal" | "two_right_sidebar" | "two_left_sidebar";

type ThreeLayoutType = "three_with_sidebars" | "three_equal";

export const twoLayout = (
  first: string,
  second: string,
  type: TwoLayoutType
) => {
  return `
  <ac:layout-section ac:type="${type}" ac:breakout-mode="default">
  <ac:layout-cell>${first}</ac:layout-cell>
  <ac:layout-cell>${second}</ac:layout-cell>
  </ac:layout-section>

`;
};

export const threeLayout = (
  first: string,
  second: string,
  third: string,
  type: ThreeLayoutType = "three_equal"
) => {
  return `
  <p/>
  <ac:layout-section ac:type="${type}" ac:breakout-mode="default">
      <ac:layout-cell>${first}</ac:layout-cell>
    <ac:layout-cell>${second}</ac:layout-cell>
    <ac:layout-cell>${third}</ac:layout-cell>
</ac:layout-section>
<p/>
  `;
};

//ac:macro-id="a23f38c0-a2e3-4f79-9002-f1bc641dd3ec"

export const expand = (title: string, content: string) => {
  return `
  
  <ac:structured-macro ac:name="expand" ac:schema-version="1" >
  <ac:parameter ac:name="title">${title}</ac:parameter>
  <ac:rich-text-body>${content}</ac:rich-text-body></ac:structured-macro>
  
  `;
};

export const divider = () => {
  return `<hr/>`;
};

export const quoteBlock = (text) => {
  return `<blockquote><p>${text}</p> </blockquote`;
};

export const codeBlock = (code, language: SupportedLanguages) => {
  return `<ac:structured-macro ac:name="code" ac:schema-version="1">
  <ac:parameter ac:name="language">${language}</ac:parameter><ac:plain-text-body>
  <![CDATA[${code}]]></ac:plain-text-body></ac:structured-macro>`;
};

export const table = (content: string) => {
  return `<table><tbody>${content}</tbody></table>`;
};

export const tr_header = (data: Array<string>) => {
  const headers = data
    .map((el) => `<th><p><strong>${el}</strong></p></th>`)
    .join("");

  return `<tr>${headers}</tr>`;
};

export const tr_row = (data: Array<string>) => {
  const content = data.map((el) => `<td><p>${el}</p></td>`).join("");

  return `<tr>${content}</tr>`;
};
