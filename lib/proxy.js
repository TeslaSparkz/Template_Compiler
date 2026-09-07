let vif = document.querySelectorAll('[v-if]');

const updateBindings = () => {
    vif.forEach(element => {
      const condition = element.getAttribute('v-if');
      const isVisible = eval(condition);
      element.style.display = isVisible ? 'block' : 'none';
      console.log(`Element with v-if="${condition}" is now ${isVisible ? 'visible' : 'hidden'}.`);
    });
  };

  function updateExpressions(scope) {
  document.querySelectorAll('text[expr]').forEach(el => {
    const expr = el.getAttribute('expr');
    el.textContent = evaluateExpression(expr, scope);
  });
}

let handler = new Proxy(exports.data, {
     set: (target, property, value) => {
       target[property] = value;
         updateBindings();
         updateExpressions(handler);
         console.log(`Updated ${property} to ${value}`);
       return true;
     }
   });
   updateBindings();
   updateExpressions(handler);