# eCommerce

Hello, my dear reader. If you here, you must know next.
This project was created by "Awesome Crew", a group of students Rolling Scope School.

## Get started

1. Clone this repository `git clone https://github.com/SlavaPankov/eCommerce`
2. Change directory to eCommerce `cd ./eCommerce`
3. Install all dependencies `npm install`

## Usage

1. Development build `npm run build:dev`
2. Production build `npm run build:prod`
3. Start project on development server `npm run start`
4. Check ESLint errors `npm run lint`
5. Fix ESLint errors `npm run lint:fix`
6. Run tests `npm run test`
7. Run prettier form `npm run format`
8. Run husky install `npm run prepare`

## Structure folders and files

```
├── src/                        # sources files
|   ├── __test__                # tests files
|   ├── assets                  # static assets
|   |   └── fonts               # font files (format woff2)
|   ├── shared                  # client components folder
|   ├── styles                  # styles folder
|   |   └── mixins              # mixins folder
|   |   └── _fonts.scss         # mixin for fonts
|   |   └── main.global.scss    # global styles for project
|   |   └── normalize.scss      # CSS resets
|   |   └── vars.scss           # style vars for project
|   ├── types                   # types folder
|   |   └── enums               # global enums folder
|   |   └── intefaces           # global interfaces folder
|   |   └── index.d.ts          # type definition
|   ├── index.html              # base template
|   └── index.jsx               # entry point of app
└── .eslintrc                   # ESLint settings
└── .gitignore                  # gitignore file
└── .prettierrc                 # prettier settings
└── babel.config.js             # babel configuration 
└── jest.config.js              # jest configuration
└── package.json                # file with build settings and installed packages
└── README.md                   # build documentation
└── tsconfig.json               # typescript configuration file
└── webpack.config.js           # webpack configuration file





```
