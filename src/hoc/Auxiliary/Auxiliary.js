/**
 * Wraps child components into a single component.
 * For now its purpose is to allow to rendering of adjacent
 * JSX elements without a bloaty enclosing element like <div>
 * around the child elements.
 */
const aux = (props) => props.children;

export default aux;