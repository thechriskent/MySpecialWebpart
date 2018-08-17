import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpecialWebPartStrings';
import Special from './components/Special';
import { ISpecialProps } from './components/ISpecialProps';
import { sp } from "@pnp/sp";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

export interface ISpecialWebPartProps {
  listId?: string;
}

export default class SpecialWebPart extends BaseClientSideWebPart<ISpecialWebPartProps> {

  public onInit(): Promise<void> {

	  return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
    
	}

  public render(): void {
    const element: React.ReactElement<ISpecialProps > = React.createElement(
      Special,
      {
        listId: this.properties.listId,
        onConfigure: () => {
          this.context.propertyPane.open();
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldListPicker('listId', {
                  label: 'Select a list',
                  selectedList: this.properties.listId,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  key: 'listId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
