
class AComponent {
    constructor() {
      this.data = {};
    }
  }
  function evaluateExpression(exp, scope) {
  try {
    // 'with' brings scope properties into local scope (e.g., allow showBox directly)
    return new Function('scope', `
      with (scope) {
        return ${exp};
      }
    `)(scope);
  } catch (err) {
    console.error(`Error evaluating expression: "${exp}"`, err);
    return '';
  }
}