// for webpack to understand the import of .glsl, .vert, .frag files aka shader files

declare module "*.glsl" {
    const content: string;
    export default content;
}
  
declare module "*.vert" {
    const content: string;
    export default content;
}
  
declare module "*.frag" {
    const content: string;
    export default content;
}
  
declare module "*.wgsl" {
    const content: string;
    export default content;
}

/*
  React 19 removed the global JSX namespace (it lives at React.JSX now), but
  @types/mdx still resolves `JSX.IntrinsicElements` globally — without this
  shim every custom MDX component fails to typecheck.
*/
declare namespace JSX {
    type ElementClass = import("react").JSX.ElementClass;
    type Element = import("react").JSX.Element;
    type ElementType = import("react").JSX.ElementType;
    type IntrinsicElements = import("react").JSX.IntrinsicElements;
    type IntrinsicAttributes = import("react").JSX.IntrinsicAttributes;
}