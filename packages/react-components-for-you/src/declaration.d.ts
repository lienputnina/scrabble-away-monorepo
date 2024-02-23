declare module '*.module.scss' {
  const classes: { [key: string]: string | undefined };
  export default classes;
}

declare module '*.png' {
  const value: string | undefined;
  export = value;
}
