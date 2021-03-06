module.exports = {
	env: {
		es6: true,
    browser: true
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
  },
  extends: ["prettier", "airbnb"],
  plugins: ["import", "jsx-a11y", "react"],
	rules: {
		"max-len": ["error", { "code": 160 }],
		"implicit-arrow-linebreak": 0,
		"semi": ["error", "never"],
		"indent": ["error", "tab"],
		"camelcase": 0,

		"no-underscore-dangle": 0,
		"import/no-cycle": 1,
		"no-param-reassign": 0,
		"no-return-assign": 0,
		"no-console": 0,
		"no-void": 0,
		"no-tabs": 0,
		"curly": 0,
		"nonblock-statement-body-position": 0,
		
		"max-classes-per-file": 0,
		"lines-between-class-members": 0,

		"object-curly-spacing": ["error", "never"],
    "object-curly-newline": 0,
    
    "react/jsx-indent": ["error", "tab"],
    "react/prop-types": 0,
    "react/jsx-indent-props": 0,
    "jsx-a11y/anchor-is-valid": 0,
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	},
	overrides: [{
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			"no-unused-vars": ["off"],
			"no-undef": ["off"]
		}
	}]
}