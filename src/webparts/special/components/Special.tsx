import * as React from 'react';
import styles from './Special.module.scss';
import { ISpecialProps } from './ISpecialProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { sp } from "@pnp/sp";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface ISpecialState {
  items: Array<any>;
  loading: boolean;
}

export default class Special extends React.Component<ISpecialProps, ISpecialState> {

  constructor(props:ISpecialProps) {
    super(props);
    
    this.state = {
      items: new Array<any>(),
      loading: true
    };

    this.loadItems();
  }

  private loadItems(): void {
    if(typeof this.props.listId !== "undefined" && this.props.listId.length > 0) {
      sp.web.lists.getById(this.props.listId).items.select("Title").orderBy("Title").get()
        .then((results: Array<any>) => {
          this.setState({
            items: results,
            loading: false
          });
        })
        .catch((error:any) => {
          console.log("Failed to get list items!");
          console.log(error);
        });
    }
  }

  public componentDidUpdate(prevProps:ISpecialProps): void {
    if(prevProps.listId !== this.props.listId) {
      this.loadItems();
    }
  }

  public render(): React.ReactElement<ISpecialProps> {
    let configured:boolean = typeof this.props.listId !== "undefined" && this.props.listId.length > 0;
    return (
      <div className={ styles.special }>
        {!configured &&
          <Placeholder
            iconName='Heart'
            iconText='Configure your web part'
            description='You gotta select a list!'
            buttonLabel='Configure'
            onConfigure={this.props.onConfigure} />
        }
        {configured &&
          <div className={styles.specialBox}>
            {this.state.loading &&
              <Spinner
                size={SpinnerSize.large}
                label="Getting the list items..."/>
            }
            {!this.state.loading &&
              this.state.items.map((item:any) => {
                return (
                  <p className={ styles.title }>{item.Title}</p>
                );
              })
            }
          </div>
        }
      </div>
    );
  }
}
