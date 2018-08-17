declare interface ISpecialWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'SpecialWebPartStrings' {
  const strings: ISpecialWebPartStrings;
  export = strings;
}
