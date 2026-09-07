const resolveExpr = (template, exports) => {

    const propertyMatches = exports.match(/["']?(\w+)["']?\s*:/g) || [];
    const validProperties = new Set(
    propertyMatches.map(p => p.replace(/["':\s]/g, ''))
  );

const vIfRegex = /v-if=(["'])(.*?)\1/g;

  // 4. Tokenizer regex to match JS words, strings, and operators safely
  // Group 1: Double-quoted strings | Group 2: Single-quoted strings | Group 3: Identifiers/Words
  const jsTokenRegex = /("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|([a-zA-Z_$][\w$]*)/g;

  // Reserved JS keywords to ignore
  const jsKeywords = new Set([
    'true', 'false', 'null', 'undefined', 'typeof', 'instanceof', 
    'in', 'is', 'exports', 'data', 'this', 'Math', 'Number', 'String'
  ]);

  // 5. Replace inside v-if values
  return template.replace(vIfRegex, (fullMatch, quote, expression) => {
    
    // Replace identifiers inside the expression
    const transformedExpression = expression.replace(
      jsTokenRegex, 
      (token, doubleQuoteStr, singleQuoteStr, identifier) => {
        // If it's a string literal, leave it unchanged
        if (doubleQuoteStr || singleQuoteStr) {
          return token;
        }

        // Check if identifier is in validProperties and not a JS keyword
        if (identifier && validProperties.has(identifier) && !jsKeywords.has(identifier)) {
          return `exports.data.${identifier}`;
        }

        return token;
      }
    );
    console.log(`v-if=${quote}${transformedExpression}${quote}`);
    return `v-if="${transformedExpression}${quote}`;
  });
}

export default resolveExpr;
