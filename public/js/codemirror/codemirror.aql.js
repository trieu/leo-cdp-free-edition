// Define AQL keywords
const AQL_KEYWORDS = {
    'for': 'keyword',
    'in': 'keyword',
    'filter': 'keyword',
    'return': 'keyword',
    'let': 'keyword',
    'sort': 'keyword',
    'limit': 'keyword',
    'collect': 'keyword',
    'insert': 'keyword',
    'update': 'keyword',
    'replace': 'keyword',
    'remove': 'keyword',
    'upsert': 'keyword',
    'and': 'keyword',
    'or': 'keyword',
    'not': 'keyword',
    'null': 'atom',
    'true': 'atom',
    'false': 'atom',
    'asc': 'keyword',
    'desc': 'keyword',
    'with': 'keyword',
    'into': 'keyword'
};

// Define AQL functions
const AQL_FUNCTIONS = [
    'ABS', 'ACOS', 'ASIN', 'ATAN', 'ATAN2', 'CEIL', 'COS', 'DEGREES',
    'EXP', 'FLOOR', 'LOG', 'LOG2', 'LOG10', 'PI', 'POW', 'RADIANS', 
    'RAND', 'ROUND', 'SIN', 'SQRT', 'TAN', 'AVG', 'COUNT', 'LENGTH', 
    'MAX', 'MEDIAN', 'MIN', 'SUM', 'STDDEV_POPULATION', 'STDDEV_SAMPLE', 
    'VARIANCE_POPULATION', 'VARIANCE_SAMPLE', 'CONCAT', 'CONTAINS', 
    'SUBSTRING', 'UPPER', 'LOWER', 'TRIM', 'REVERSE', 'LIKE', 'TO_BOOL', 
    'TO_NUMBER', 'TO_STRING', 'IS_NULL', 'IS_BOOL', 'IS_NUMBER', 
    'IS_STRING', 'IS_ARRAY', 'IS_OBJECT', 'DATE_NOW', 'DATE_FORMAT'
];

// CodeMirror mode definition
CodeMirror.defineMode('aql', function () {
    return {
        startState: function () {
            return { inString: false };
        },
        token: function (stream, state) {
            // String handling
            if (state.inString) {
                if (stream.skipTo('"')) {
                    stream.next();
                    state.inString = false;
                } else {
                    stream.skipToEnd();
                }
                return 'string';
            }
            if (stream.match('"')) {
                state.inString = true;
                return 'string';
            }

            // Single line comment
            if (stream.match('//')) {
                stream.skipToEnd();
                return 'comment';
            }

            // Multi-line comment
            if (stream.match('/*')) {
                while ((ch = stream.next()) != null) {
                    if (ch === '*' && stream.eat('/')) {
                        break;
                    }
                }
                return 'comment';
            }

            // Keywords and atoms (e.g., true, false, null)
            const word = stream.match(/[\w$]+/, false);
            if (word) {
                const keyword = stream.match(/[\w$]+/)[0].toLowerCase();
                if (AQL_KEYWORDS.hasOwnProperty(keyword)) {
                    return AQL_KEYWORDS[keyword];
                }
                if (AQL_FUNCTIONS.includes(keyword.toUpperCase())) {
                    return 'builtin';
                }
            }

            // Number handling
            if (stream.match(/^\d+(\.\d+)?/)) {
                return 'number';
            }

            // Operator or punctuation
            if (stream.match(/[(){}[\],;=<>+\-*\/%&|!]/)) {
                return 'operator';
            }

            // Skip to next character if nothing matches
            stream.next();
            return null;
        }
    };
});
